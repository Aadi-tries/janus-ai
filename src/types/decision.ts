export type AgentRole = "orchestrator" | "investor" | "customer" | "competitor" | "judge";

export interface AgentResponse {
  role: AgentRole;
  summary: string;
  keyPoints: string[];
  confidenceScore?: number; // 0-100
  recommendation?: "Proceed" | "Re-evaluate" | "Pivot" | "Halt";
  rawOutput?: string;
}

export interface Decision {
  id: string;
  createdAt: string;
  status: "draft" | "orchestrating" | "analyzing" | "completed" | "failed";
  objective: string;
  backgroundContext: string;
  options?: string[]; // Potential choices to consider
}

export interface Report {
  decisionId: string;
  generatedAt: string;
  orchestratorSummary: string;
  overallRecommendation: "Proceed" | "Re-evaluate" | "Pivot" | "Halt";
  agentResponses: AgentResponse[];
}
