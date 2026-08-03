import { AGENT_MAP } from "../constants/agents.ts";
import type { AgentId } from "../constants/agents.ts";

export type DecisionStatus = "draft" | "in_progress" | "completed";

export type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
  persona?: string;
  type?: "question" | "reality_attack";
};

const DECISION_STATUSES = new Set<DecisionStatus>(["draft", "in_progress", "completed"]);

export function normalizeRequiredText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normalizeOptionalText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeSelectedAgents(value: unknown): AgentId[] | null {
  if (!Array.isArray(value)) return null;

  const agents = value.filter((agent): agent is AgentId => (
    typeof agent === "string" && agent in AGENT_MAP
  ));

  return agents.length > 0 ? Array.from(new Set(agents)) : null;
}

export function isDecisionStatus(value: unknown): value is DecisionStatus {
  return typeof value === "string" && DECISION_STATUSES.has(value as DecisionStatus);
}

export function normalizeHistory(value: unknown): ConversationMessage[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((message): ConversationMessage[] => {
    if (!message || typeof message !== "object") return [];

    const candidate = message as Record<string, unknown>;
    if (candidate.role !== "user" && candidate.role !== "assistant") return [];
    if (typeof candidate.content !== "string" || candidate.content.trim().length === 0) return [];

    const normalized: ConversationMessage = {
      role: candidate.role,
      content: candidate.content,
    };

    if (typeof candidate.persona === "string" && candidate.persona.trim()) {
      normalized.persona = candidate.persona.trim();
    }

    if (candidate.type === "question" || candidate.type === "reality_attack") {
      normalized.type = candidate.type;
    }

    return [normalized];
  });
}

export function normalizeMessageInput(value: unknown): ConversationMessage | null {
  const [message] = normalizeHistory([value]);
  return message ?? null;
}
