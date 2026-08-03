"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Target, UploadCloud, TrendingUp, Users, Swords, ShieldAlert, Brain, Check } from "lucide-react";
import Link from "next/link";
import { AGENTS, AgentId } from "@/constants/agents";

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Users,
  Swords,
  ShieldAlert,
  Brain,
};

const COLOR_MAP: Record<string, { border: string; bg: string; text: string; glow: string; ring: string }> = {
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    bg: "bg-emerald-500/5",
    text: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    ring: "ring-emerald-500/20",
  },
  blue: {
    border: "border-blue-500/30 hover:border-blue-500/50",
    bg: "bg-blue-500/5",
    text: "text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    ring: "ring-blue-500/20",
  },
  orange: {
    border: "border-orange-500/30 hover:border-orange-500/50",
    bg: "bg-orange-500/5",
    text: "text-orange-400",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
    ring: "ring-orange-500/20",
  },
  yellow: {
    border: "border-yellow-500/30 hover:border-yellow-500/50",
    bg: "bg-yellow-500/5",
    text: "text-yellow-400",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
    ring: "ring-yellow-500/20",
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-500/50",
    bg: "bg-purple-500/5",
    text: "text-purple-400",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    ring: "ring-purple-500/20",
  },
};

export default function NewDecisionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [objective, setObjective] = useState("");
  const [context, setContext] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<AgentId[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        setContext((prev) => prev + (prev ? "\n\n" : "") + `[Document Content: ${file.name}]\n${text}`);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  function toggleAgent(agentId: AgentId) {
    setSelectedAgents((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/decisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objective,
          context,
          selectedAgents: selectedAgents.length > 0 ? selectedAgents : null,
        }),
      });
      
      if (res.ok) {
        const decision = await res.json();
        router.push(`/interview?id=${decision.id}`);
      } else {
        console.error("Failed to create decision");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070709] p-8 sm:p-12 text-zinc-100 relative">
      <div className="cyber-grid" />

      <div className="mx-auto max-w-3xl">
        <header className="mb-10">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 transition hover:text-white mb-8 font-mono">
            <ArrowLeft className="size-4" />
            &lt; Back to Control Panel
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-white font-title uppercase">Stress Test Initialization</h1>
          <p className="mt-3 text-sm text-zinc-400">
            Define your strategic parameters. Choose active challengers from the expert matrix below.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-zinc-800 bg-[#0e0e14]/50 p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative glass-panel">
          <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-zinc-600 font-bold uppercase">PROTOCOL_SYS_08</div>
          
          <div className="space-y-3">
            <label htmlFor="objective" className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 font-mono">
              [01] Primary Objective / Thesis
            </label>
            <input
              id="objective"
              required
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="e.g., Bootstrap a SaaS product while retaining full equity"
              className="block w-full rounded-lg border border-zinc-800 bg-black/60 px-4 py-4 text-white placeholder-zinc-700 focus:border-red-500/60 focus:outline-none focus:ring-1 focus:ring-red-500/40 text-sm transition-colors font-sans"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="context" className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 font-mono">
                [02] Background Context & Constraints
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors"
              >
                <UploadCloud className="size-4" />
                Upload payload
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".txt,.md,.csv,.json,.js,.ts,.tsx,.py,.log,.xml,.html"
                className="hidden"
              />
            </div>
            <textarea
              id="context"
              required
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={6}
              placeholder="Why now? What are the key assets, runways, marketing targets, customer segmentations, and technical dependencies?"
              className="block w-full rounded-lg border border-zinc-800 bg-black/60 px-4 py-4 text-white placeholder-zinc-700 focus:border-red-500/60 focus:outline-none focus:ring-1 focus:ring-red-500/40 text-sm transition-colors font-sans resize-y"
            />
          </div>

          {/* Agent Matrix Selection */}
          <div className="space-y-4 pt-4 border-t border-zinc-900/60">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 font-mono">
                [03] Adversarial Matrix Selection
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">
                {selectedAgents.length === 0
                  ? "FULL PANEL (DEFAULT)"
                  : `${selectedAgents.length} CARD(S) MOUNTED`}
              </span>
            </div>
            <p className="text-xs text-zinc-500 -mt-2 leading-relaxed">
              Mount specific expert nodes. Leave empty to allow the system orchestrator to dynamic-route turns.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AGENTS.map((agent) => {
                const isSelected = selectedAgents.includes(agent.id);
                const colors = COLOR_MAP[agent.color];
                const IconComponent = ICON_MAP[agent.icon];

                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => toggleAgent(agent.id)}
                    className={`group relative flex items-start gap-4.5 rounded-xl border p-4.5 text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? `${colors.border} ${colors.bg} ${colors.glow} ring-1 ${colors.ring} scale-[1.02] bg-zinc-900/50`
                        : "border-zinc-800/80 bg-zinc-950/20 hover:border-zinc-700 hover:bg-zinc-950/60"
                    }`}
                  >
                    {/* Select indicator pill */}
                    <div
                      className={`absolute top-3 right-3 flex items-center justify-center rounded-full size-4.5 transition-all duration-300 ${
                        isSelected
                          ? `${colors.bg} ${colors.text} scale-100 border border-current`
                          : "bg-zinc-900 text-zinc-700 scale-90 border border-zinc-800"
                      }`}
                    >
                      {isSelected && <Check className="size-2.5" strokeWidth={4} />}
                    </div>

                    {/* Icon frame */}
                    <div
                      className={`flex-shrink-0 mt-0.5 rounded-lg p-2.5 transition-colors duration-300 border ${
                        isSelected
                          ? `${colors.bg} ${colors.text} border-current/20`
                          : "bg-zinc-900 border-zinc-800 text-zinc-500"
                      }`}
                    >
                      {IconComponent && <IconComponent className="size-4" />}
                    </div>

                    {/* Meta Details */}
                    <div className="min-w-0 pr-4">
                      <div
                        className={`text-sm font-bold tracking-wide uppercase transition-colors duration-300 font-title ${
                          isSelected ? colors.text : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {agent.name}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1.5 leading-relaxed line-clamp-2">
                        {agent.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 flex items-center justify-end border-t border-zinc-900/60">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center gap-2 rounded bg-gradient-to-r from-red-600 to-purple-600 px-8 text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed duration-300 border border-red-500/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  MOUNTING OBJECTIVE...
                </>
              ) : (
                <>
                  <Target className="size-4" />
                  INITIATE INTERROGATION
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
