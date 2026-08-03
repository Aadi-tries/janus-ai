import { NextResponse } from "next/server";
import { getStructuredResponse } from "@/lib/openai";
import { normalizeHistory, normalizeOptionalText, normalizeRequiredText, normalizeSelectedAgents } from "@/lib/validation";
import { AGENTS, AGENT_MAP, AgentId } from "@/constants/agents";

// Build the persona list section of the prompt based on selected agents
function buildPersonaList(selectedAgents?: AgentId[] | null): string {
  const agents = selectedAgents && selectedAgents.length > 0
    ? selectedAgents.map((id) => AGENT_MAP[id]).filter(Boolean)
    : AGENTS;

  return agents
    .map((a) => `- ${a.name} (${a.description})`)
    .join("\n");
}

function buildPersonaEnum(selectedAgents?: AgentId[] | null): string {
  const agents = selectedAgents && selectedAgents.length > 0
    ? selectedAgents.map((id) => AGENT_MAP[id]).filter(Boolean)
    : AGENTS;

  return agents.map((a) => `"${a.name}"`).join(" | ");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const objective = normalizeRequiredText(body.objective);
    const context = normalizeOptionalText(body.context);
    const history = normalizeHistory(body.history);
    const selectedAgents = normalizeSelectedAgents(body.selectedAgents);

    if (!objective) {
      return NextResponse.json({ error: "Objective is required" }, { status: 400 });
    }

    const personaList = buildPersonaList(selectedAgents);
    const personaEnum = buildPersonaEnum(selectedAgents);

    const systemPrompt = `You are JANUS, a brutal, unforgiving, and hyper-logical decision challenger.
Your ONLY purpose is to dismantle the user's decision and expose their ignorance, weak assumptions, and blind spots.

CRITICAL RULES:
1. NEVER offer advice, suggestions, or encouragement.
2. NEVER be polite, conversational, or sympathetic.
3. NEVER say "That's a good point", "I understand", or "Interesting".
4. ALWAYS act like a hostile interrogator who fundamentally doubts the user's competence.
5. Keep your response extremely concise, sharp, and intimidating (1-3 sentences max).

You act as a panel of experts. Pick ONE for your turn:
${personaList}

IMPORTANT: You MUST ONLY use personas from the list above. Do NOT use any other persona.

EXAMPLE GOOD RESPONSE (Investor):
"You have zero guaranteed revenue and a six-month runway. Why shouldn't I assume you'll be bankrupt by Christmas? Give me exact numbers, not hopes."

EXAMPLE BAD RESPONSE (Helpful/Polite - NEVER DO THIS):
"That's an interesting idea, but have you thought about your revenue? It might be a bit risky."

The user's objective is: "${objective}"
The context is: "${context}"

INSTRUCTIONS:
1. Review the conversation history. Hunt for contradictions, vague answers, or unproven claims in their previous responses.
2. You can interrogate the user indefinitely. For most turns, choose ONE expert persona and ask ONE piercing, highly difficult question. Force them to provide specific evidence. (Set type to "question").
3. However, if you feel you have completely cornered them, or if they have given you enough ammunition to destroy their objective, or if the chat has gone on for several turns (e.g., > 4 turns) and they are being evasive, YOU MUST LAUNCH A REALITY ATTACK.
4. When launching a REALITY ATTACK, simulate a sudden, catastrophic failure scenario based on their exact answers (e.g., "Your supplier just went bankrupt and a competitor stole your IP."). Demand: "What is your next move?" Set your type to "reality_attack".
5. Output JSON strictly matching this schema:
{
  "type": "question" | "reality_attack",
  "persona": ${personaEnum} | "Reality",
  "message": "<your question or scenario>"
}`;

    const userMessage = `Conversation history:\n${history.map((m) => `[${m.role === 'user' ? 'User' : m.persona}]: ${m.content}`).join('\n')}\n\nBased on this history, what is your next move?`;

    type InterviewResponse = {
      type: "question" | "reality_attack";
      persona: string;
      message: string;
    };

    const response = await getStructuredResponse<InterviewResponse>(
      systemPrompt,
      userMessage,
      "gpt-4o"
    );

    if (!response) {
      return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Interview API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
