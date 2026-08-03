export type AgentId = "investor" | "customer" | "competitor" | "risk_analyst" | "psychologist";

export interface AgentConfig {
  id: AgentId;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind accent color
}

export const AGENTS: AgentConfig[] = [
  {
    id: "investor",
    name: "Investor",
    description: "Attacks financial logic, demands hard numbers, highlights bankruptcy risks",
    icon: "TrendingUp",
    color: "emerald",
  },
  {
    id: "customer",
    name: "Customer",
    description: "Attacks product-market fit, calls the idea useless, demands proof of demand",
    icon: "Users",
    color: "blue",
  },
  {
    id: "competitor",
    name: "Competitor",
    description: "Attacks moats, threatens to crush you, mocks lack of differentiation",
    icon: "Swords",
    color: "orange",
  },
  {
    id: "risk_analyst",
    name: "Risk Analyst",
    description: "Attacks operational naïveté, highlights catastrophic single points of failure",
    icon: "ShieldAlert",
    color: "yellow",
  },
  {
    id: "psychologist",
    name: "Psychologist",
    description: "Attacks ego, cognitive biases, and emotional delusions driving your decision",
    icon: "Brain",
    color: "purple",
  },
];

export const AGENT_MAP = Object.fromEntries(AGENTS.map((a) => [a.id, a])) as Record<AgentId, AgentConfig>;
