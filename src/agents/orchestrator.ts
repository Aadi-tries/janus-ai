import { getStructuredResponse } from "@/lib/openai";
import { ORCHESTRATOR_SYSTEM_PROMPT } from "@/prompts/orchestrator";
import { Decision, AgentRole } from "@/types/decision";

export interface OrchestratorOutput {
  orchestratorSummary: string;
  recommendedAgents: AgentRole[];
  overallRecommendation: "Proceed" | "Re-evaluate" | "Pivot" | "Halt";
}

/**
 * Runs the Orchestrator agent to analyze a decision and determine the next steps.
 */
export async function runOrchestrator(decision: Decision): Promise<OrchestratorOutput | null> {
  const userMessage = `
Decision ID: ${decision.id}
Objective: ${decision.objective}
Background Context: ${decision.backgroundContext}
${decision.options ? `Options: ${decision.options.join(", ")}` : ""}
`;

  return getStructuredResponse<OrchestratorOutput>(
    ORCHESTRATOR_SYSTEM_PROMPT,
    userMessage
  );
}
