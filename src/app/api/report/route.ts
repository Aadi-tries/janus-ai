import { NextResponse } from "next/server";
import { getStructuredResponse } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { objective, context, history } = body;

    const systemPrompt = `You are JANUS, an AI decision challenger. You have just completed a rigorous cross-examination and reality attack on the user's decision.
Your task now is to generate a brutal, objective, and highly professional Decision Readiness Report.

The user's objective is: "${objective}"
The context is: "${context}"

INSTRUCTIONS:
1. Review the conversation history.
2. Evaluate how well the user defended their reasoning and responded to the failure scenario (Reality Attack).
3. Generate a structured report highlighting their strengths, weaknesses, blind spots, risks, and next step recommendations.
4. Provide a Decision Readiness Score (0-100) and a Confidence Score (0-100) based on the evidence provided.
5. Output JSON strictly matching this schema:
{
  "readinessScore": number,
  "confidenceScore": number,
  "strengths": string[],
  "weaknesses": string[],
  "blindSpots": string[],
  "risks": string[],
  "recommendations": string[]
}`;

    const userMessage = `Conversation history:\n${history.map((m: any) => `[${m.role === 'user' ? 'User' : m.persona || 'Janus'}]: ${m.content}`).join('\n')}\n\nGenerate the final decision report based on this transcript.`;

    type ReportResponse = {
      readinessScore: number;
      confidenceScore: number;
      strengths: string[];
      weaknesses: string[];
      blindSpots: string[];
      risks: string[];
      recommendations: string[];
    };

    const response = await getStructuredResponse<ReportResponse>(
      systemPrompt,
      userMessage,
      "gpt-4o"
    );

    if (!response) {
      return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Report API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
