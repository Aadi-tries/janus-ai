"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Send, AlertTriangle, FileText, UploadCloud, ArrowLeft, Users, TrendingUp, Swords, ShieldAlert, Brain, Check, ChevronUp, Terminal, Activity, RefreshCw } from "lucide-react";
import { AGENTS, AGENT_MAP, AgentId } from "@/constants/agents";

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Users,
  Swords,
  ShieldAlert,
  Brain,
};

const COLOR_STYLES: Record<string, { dot: string; active: string; hover: string; text: string; bg: string; border: string }> = {
  emerald: {
    dot: "bg-emerald-400",
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    hover: "hover:bg-emerald-500/5",
    text: "text-emerald-400",
    bg: "bg-emerald-950/20",
    border: "border-emerald-500/30"
  },
  blue: {
    dot: "bg-blue-400",
    active: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    hover: "hover:bg-blue-500/5",
    text: "text-blue-400",
    bg: "bg-blue-950/20",
    border: "border-blue-500/30"
  },
  orange: {
    dot: "bg-orange-400",
    active: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    hover: "hover:bg-orange-500/5",
    text: "text-orange-400",
    bg: "bg-orange-950/20",
    border: "border-orange-500/30"
  },
  yellow: {
    dot: "bg-yellow-400",
    active: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    hover: "hover:bg-yellow-500/5",
    text: "text-yellow-400",
    bg: "bg-yellow-950/20",
    border: "border-yellow-500/30"
  },
  purple: {
    dot: "bg-purple-400",
    active: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    hover: "hover:bg-purple-500/5",
    text: "text-purple-400",
    bg: "bg-purple-950/20",
    border: "border-purple-500/30"
  },
};

type Message = {
  role: "user" | "assistant";
  content: string;
  persona?: string;
  type?: "question" | "reality_attack";
};

function InterviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const decisionId = searchParams.get("id");
  const [objective, setObjective] = useState("");
  const [context, setContext] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[] | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRealityAttack, setIsRealityAttack] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const chatFileInputRef = useRef<HTMLInputElement>(null);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function toggleAgent(agentId: AgentId) {
    setSelectedAgents((prev) => {
      if (!prev || prev.length === 0) {
        return [agentId];
      }
      if (prev.includes(agentId)) {
        const filtered = prev.filter((id) => id !== agentId);
        return filtered.length === 0 ? null : filtered;
      }
      return [...prev, agentId];
    });
  }

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowAgentDropdown(false);
      }
    }
    if (showAgentDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAgentDropdown]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        setInput((prev) => prev + (prev ? "\n\n" : "") + `[Attached Document: ${file.name}]\n${text}`);
      }
    };
    reader.readAsText(file);
    if (chatFileInputRef.current) chatFileInputRef.current.value = "";
  };

  // Initial load
  useEffect(() => {
    if (!decisionId) {
      router.push("/dashboard");
      return;
    }
    
    async function fetchDecision() {
      try {
        const res = await fetch(`/api/decisions/${decisionId}`);
        if (res.ok) {
          const data = await res.json();
          setObjective(data.objective);
          setContext(data.context || "");
          const agents = data.selectedAgents
            ? data.selectedAgents.split(",")
            : null;
          setSelectedAgents(agents);
          setMessages(data.messages);
          
          // Set reality attack state if last assistant message was a reality attack
          const lastMsg = data.messages[data.messages.length - 1];
          if (lastMsg && lastMsg.role === "assistant" && lastMsg.type === "reality_attack") {
            setIsRealityAttack(true);
          }
        }
      } catch (e) {
        console.error("Failed to fetch decision", e);
      }
    }
    fetchDecision();
  }, [decisionId, router]);

  // Scroll to bottom
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function fetchNextQuestion(currentHistory: Message[]) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objective,
          context,
          history: currentHistory,
          selectedAgents,
        }),
      });

      if (res.ok) {
        const question = await res.json();
        
        // Save question to database
        const saveRes = await fetch(`/api/decisions/${decisionId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: "assistant",
            content: question.message,
            persona: question.persona,
            type: question.type,
          }),
        });

        if (saveRes.ok) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: question.message,
              persona: question.persona,
              type: question.type,
            },
          ]);

          if (question.type === "reality_attack") {
            setIsRealityAttack(true);
          }
        }
      }
    } catch (e) {
      console.error("Failed to fetch question", e);
    } finally {
      setIsLoading(false);
    }
  }

  // If chat is empty, fetch first question
  useEffect(() => {
    if (objective && messages.length === 0 && !isLoading) {
      fetchNextQuestion([]);
    }
  }, [objective, messages.length]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    // 1. Add user message locally and to DB
    const userMsg: Message = { role: "user", content: userText };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const saveRes = await fetch(`/api/decisions/${decisionId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userMsg),
      });

      if (saveRes.ok) {
        // 2. Fetch assistant reply
        const updatedHistory = [...messages, userMsg];
        await fetchNextQuestion(updatedHistory);
      }
    } catch (e) {
      console.error("Failed to save user message", e);
    }
  }

  async function handleGenerateReport() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/decisions/${decisionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
      if (res.ok) {
        router.push(`/report?id=${decisionId}`);
      }
    } catch (e) {
      console.error("Failed to complete decision", e);
      setIsLoading(false);
    }
  }

  // Active agents mapping for dropdown UI
  const activeAgentCount = selectedAgents ? selectedAgents.length : 0;
  const agentPillLabel = activeAgentCount === 0
    ? "Matrix Panel (Auto)"
    : activeAgentCount === 1
    ? AGENT_MAP[selectedAgents?.[0] as AgentId]?.name ?? "1 Challenger"
    : `${activeAgentCount} Challengers`;

  return (
    <div className={`min-h-screen flex flex-col bg-[#070709] text-zinc-100 relative ${isRealityAttack ? "bg-scanlines" : ""}`}>
      <div className="cyber-grid" />
      {isRealityAttack && <div className="pointer-events-none fixed inset-0 z-50 bg-red-500/5 mix-blend-color-burn animate-pulse" />}

      {/* Header bar */}
      <header className={`p-4 border-b ${isRealityAttack ? "border-red-950/80 bg-red-950/20 shadow-[0_0_30px_rgba(239,68,68,0.25)]" : "border-zinc-900 bg-black/40"} backdrop-blur-md sticky top-0 z-20 transition-all`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 rounded bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-white hover:border-zinc-800 transition-colors" title="Go Back">
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">CONTROL PROTOCOL</span>
              <span className="font-semibold text-white truncate max-w-xs md:max-w-md block text-xs font-title tracking-wide uppercase mt-0.5">{objective || "Loading System..."}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isRealityAttack && (
              <span className="inline-flex items-center gap-1.5 rounded border border-red-500 bg-red-950/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-red-500 animate-glitch font-mono">
                <AlertTriangle className="size-3.5" /> CRITICAL_ALERT
              </span>
            )}
            <button 
              onClick={handleGenerateReport}
              disabled={isLoading || messages.length === 0}
              className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-red-600 to-purple-600 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition hover:scale-105 shadow-[0_0_15px_rgba(239,68,68,0.25)] disabled:opacity-40 border border-red-500/20"
            >
              <FileText className="size-3.5" />
              Generate report
            </button>
          </div>
        </div>
      </header>

      {/* Split Pane Interface */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full relative overflow-hidden">
        {/* Left Info Pane */}
        <aside className="lg:w-80 border-b lg:border-b-0 lg:border-r border-zinc-900/60 p-6 space-y-6 flex-shrink-0 bg-black/15 backdrop-blur-sm lg:block hidden">
          <div className="space-y-1.5">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Challenger Directives</h3>
            <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 text-xs text-zinc-400 leading-relaxed font-sans glass-panel">
              {context || "Retrieving system payload data..."}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Active Challenge Nodes</h3>
            <div className="space-y-2">
              {AGENTS.map((agent) => {
                const isNodeActive = !selectedAgents || selectedAgents.length === 0 || selectedAgents.includes(agent.id);
                const colors = COLOR_STYLES[agent.color] || { text: "text-zinc-500", bg: "bg-zinc-900/50", border: "border-zinc-800" };
                const Icon = ICON_MAP[agent.icon];

                return (
                  <div
                    key={agent.id}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs transition-all duration-300 ${
                      isNodeActive
                        ? `${colors.text} ${colors.bg} ${colors.border}`
                        : "text-zinc-700 bg-zinc-950/10 border-zinc-900/40 opacity-40"
                    }`}
                  >
                    <div className="p-1 rounded bg-black/40 border border-current/10">
                      {Icon && <Icon className="size-3.5" />}
                    </div>
                    <div className="font-semibold uppercase tracking-wider">{agent.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Chat Terminal Pane */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-black/5">
          {/* Scrollable logs */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {messages.length === 0 && isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-zinc-500">
                <Loader2 className="size-5 animate-spin" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Warming adversary engines...</span>
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl mx-auto pb-32">
                {messages.map((msg, i) => {
                  const isUser = msg.role === "user";
                  const agentColor = !isUser && msg.persona
                    ? AGENTS.find((a) => a.name === msg.persona)?.color ?? "red"
                    : "zinc";
                  const colors = COLOR_STYLES[agentColor] || { text: "text-zinc-400", bg: "bg-zinc-950/40", border: "border-zinc-900" };

                  return (
                    <div
                      key={i}
                      className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}
                    >
                      {/* Meta header */}
                      <div className="flex items-center gap-2 px-1 text-[9px] font-bold tracking-widest uppercase font-mono text-zinc-500">
                        {isUser ? (
                          <>
                            <span>STRATEGIST</span>
                            <span className="size-1 rounded-full bg-zinc-700" />
                          </>
                        ) : (
                          <>
                            <span className={colors.text}>{msg.persona || "SYSTEM"}</span>
                            {msg.type === "reality_attack" && (
                              <span className="text-red-500 animate-pulse font-bold">[CRISIS EVENT]</span>
                            )}
                            <span className="size-1 rounded-full bg-zinc-700" />
                          </>
                        )}
                      </div>

                      {/* Msg bubble */}
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-[13.5px] leading-relaxed border transition-all duration-300 ${
                          isUser
                            ? "bg-zinc-900/60 border-zinc-800 text-white font-sans rounded-br-none"
                            : msg.type === "reality_attack"
                            ? "bg-red-950/20 border-red-900/40 text-red-100 font-sans rounded-bl-none shadow-[0_0_20px_rgba(239,68,68,0.05)]"
                            : `${colors.bg} ${colors.border} text-zinc-200 font-sans rounded-bl-none`
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-center gap-2.5 text-zinc-500 pl-1">
                    <Loader2 className="size-3.5 animate-spin" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">TRANSMITTING ADVERSARIAL QUERY...</span>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>
            )}
          </div>

          {/* Fixed bottom input bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-[#070709]/95 to-transparent pt-10 z-10">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className={`relative rounded-xl border ${isRealityAttack ? "border-red-500/50 focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400" : "border-zinc-800 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600"} bg-zinc-950/80 backdrop-blur-xl transition-all shadow-2xl`}>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isRealityAttack ? "RESPOND SYSTEM THREAT IMMINENT..." : "Defend strategy logic..."}
                    className={`w-full bg-transparent p-4 pb-12 ${isRealityAttack ? "text-red-50 placeholder-red-900/40" : "text-white placeholder-zinc-700"} focus:outline-none resize-none h-24 text-[14px] font-sans`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />

                  {/* Toolbar */}
                  <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3 py-2 border-t border-zinc-900/40">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowAgentDropdown(!showAgentDropdown)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest font-mono transition-all ${
                          showAgentDropdown
                            ? "bg-zinc-900 text-white border border-zinc-800"
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 border border-transparent"
                        }`}
                      >
                        <Users className="size-3.5 text-zinc-500" />
                        <span>{agentPillLabel}</span>
                        <ChevronUp className={`size-3 transition-transform ${showAgentDropdown ? "" : "rotate-180"}`} />
                      </button>

                      {/* Dropdown */}
                      {showAgentDropdown && (
                        <div className="absolute bottom-full left-0 mb-2 w-64 rounded-xl border border-zinc-800 bg-[#0e0e14] shadow-2xl overflow-hidden z-30">
                          <div className="px-3 py-2 bg-zinc-950/60 border-b border-zinc-900">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-mono">Expert Node Grid</p>
                          </div>
                          <div className="py-1">
                            {AGENTS.map((agent) => {
                              const isActive =
                                !selectedAgents ||
                                selectedAgents.length === 0 ||
                                selectedAgents.includes(agent.id);
                              const isFiltered = selectedAgents && selectedAgents.length > 0;
                              const colors = COLOR_STYLES[agent.color] || { active: "text-white", hover: "hover:bg-zinc-800", dot: "bg-zinc-500" };
                              const IconComponent = ICON_MAP[agent.icon];

                              return (
                                <button
                                  key={agent.id}
                                  type="button"
                                  onClick={() => toggleAgent(agent.id)}
                                  className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors duration-150 ${
                                    isActive && isFiltered
                                      ? colors.active
                                      : `text-zinc-400 ${colors.hover}`
                                  }`}
                                >
                                  <div className={`flex items-center justify-center size-5 rounded border ${
                                    isActive && isFiltered ? `${colors.active} border-current/20` : "bg-zinc-900 border-zinc-800"
                                  }`}>
                                    {IconComponent && <IconComponent className="size-3" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs font-semibold font-title tracking-wide uppercase">{agent.name}</span>
                                  </div>
                                  {isActive && isFiltered && (
                                    <Check className="size-3 flex-shrink-0" strokeWidth={3} />
                                  )}
                                  {!isFiltered && (
                                    <span className={`size-1 rounded-full ${colors.dot} opacity-50 flex-shrink-0`} />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {selectedAgents && selectedAgents.length > 0 && (
                            <div className="px-3 py-2 bg-zinc-950/40 border-t border-zinc-900">
                              <button
                                  type="button"
                                  onClick={() => setSelectedAgents(null)}
                                  className="text-[10px] font-bold text-red-400 hover:text-red-300 font-mono uppercase tracking-wider"
                              >
                                &gt; Reset active nodes
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => chatFileInputRef.current?.click()}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 transition-colors"
                        title="Upload Payload"
                      >
                        <UploadCloud className="size-4" />
                      </button>
                      <input
                        type="file"
                        ref={chatFileInputRef}
                        onChange={handleFileUpload}
                        accept=".txt,.md,.csv,.json,.js,.ts,.tsx,.py,.log,.xml,.html"
                        className="hidden"
                      />
                      <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className={`p-1.5 rounded-md ${isRealityAttack ? "bg-red-600 hover:bg-red-500 text-white" : "bg-white text-black hover:bg-zinc-200"} disabled:opacity-20 transition-all`}
                      >
                        <Send className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <p className="text-center mt-2 text-[10px] text-zinc-600 font-mono uppercase">Enter to transmit &middot; Shift+Enter for new lines</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function InterviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070709] text-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-zinc-500" />
          <p className="text-xs font-mono uppercase text-zinc-500">Warming adversary engines...</p>
        </div>
      </div>
    }>
      <InterviewContent />
    </Suspense>
  );
}
