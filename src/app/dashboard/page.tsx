"use client";

import Link from "next/link";
import { PlusCircle, Activity, CheckCircle, Clock, Play, Server, ArrowRight, ShieldAlert, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [decisions, setDecisions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDecisions() {
      try {
        const res = await fetch("/api/decisions");
        if (res.ok) {
          const data = await res.json();
          setDecisions(data);
        }
      } catch (e) {
        console.error("Failed to fetch decisions", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDecisions();
  }, []);

  const activeTests = decisions.filter(d => d.status === "in_progress").length;
  const completed = decisions.filter(d => d.status === "completed").length;
  const drafts = decisions.filter(d => d.status === "draft").length;
  const recentInProgress = decisions.find(d => d.status === "in_progress");

  return (
    <div className="min-h-screen bg-[#070709] p-8 sm:p-12 text-zinc-100 relative">
      <div className="cyber-grid" />
      
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-6 md:flex-row md:items-center justify-between pb-8 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-500 font-mono">
                <Server className="size-3" /> NODE_04
              </span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/20 border border-emerald-900/30 text-[10px] font-bold text-emerald-400 font-mono">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> SYSTEM_ONLINE
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white font-title uppercase">Decision Control Panel</h1>
            <p className="mt-1 text-sm text-zinc-400">Initialize stress tests and audit your logic ledgers.</p>
          </div>
          <Link
            href="/decision"
            className="inline-flex items-center justify-center gap-2 rounded bg-gradient-to-r from-red-600 to-purple-600 px-6 py-3 text-xs font-bold text-white transition hover:scale-105 shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.45)] uppercase tracking-widest border border-red-500/20"
          >
            <PlusCircle className="size-4" />
            New stress test
          </Link>
        </header>

        <main className="mt-12">
          {recentInProgress && (
            <div className="mb-10 rounded-xl border border-red-900/30 bg-red-950/10 p-6 shadow-[0_0_35px_rgba(239,68,68,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden glass-panel">
              <div className="absolute inset-y-0 left-0 w-1 bg-red-500" />
              <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-red-500/30 font-bold">REACTOR_ACTIVE</div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">INTERROGATION RESUME REQUIRED</p>
                <h2 className="text-xl font-bold text-white uppercase font-title leading-tight">{recentInProgress.objective}</h2>
              </div>
              <Link
                href={`/interview?id=${recentInProgress.id}`}
                className="inline-flex items-center gap-2.5 rounded bg-white px-5 py-2.5 text-xs font-bold text-black transition hover:bg-zinc-200 shadow-md uppercase tracking-widest"
              >
                <Play className="size-4 fill-black" />
                Resume console
              </Link>
            </div>
          )}

          {/* Grid Stats */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {/* Card 1 */}
            <div className="rounded-xl border border-zinc-800 bg-[#0e0e14]/50 p-6 relative overflow-hidden glass-panel">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-red-500/40" />
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-red-950/20 border border-red-900/30 p-3 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                  <Activity className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Challenging</p>
                  <p className="text-2xl font-black text-white mt-0.5 font-title">{activeTests}</p>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="rounded-xl border border-zinc-800 bg-[#0e0e14]/50 p-6 relative overflow-hidden glass-panel">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-emerald-500/40" />
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-emerald-950/20 border border-emerald-900/30 p-3 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <CheckCircle className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Passed / Audited</p>
                  <p className="text-2xl font-black text-white mt-0.5 font-title">{completed}</p>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="rounded-xl border border-zinc-800 bg-[#0e0e14]/50 p-6 relative overflow-hidden glass-panel">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-amber-500/40" />
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-amber-950/20 border border-amber-900/30 p-3 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <Clock className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Pending Drafts</p>
                  <p className="text-2xl font-black text-white mt-0.5 font-title">{drafts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ledger Section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold tracking-widest text-zinc-400 uppercase font-mono flex items-center gap-2">
              <Cpu className="size-4 text-purple-400" /> Database Ledger Logs
            </h2>
            <span className="text-[10px] text-zinc-600 font-mono">RECORD_COUNT: {decisions.length}</span>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center p-12 border border-zinc-800 rounded-xl bg-zinc-950/20 glass-panel">
              <span className="text-xs font-semibold text-zinc-500 font-mono animate-pulse">REQUESTING LEDGER...</span>
            </div>
          ) : decisions.length === 0 ? (
            <div className="text-center p-16 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/20">
              <ShieldAlert className="size-8 text-zinc-600 mx-auto mb-3" />
              <p className="text-sm text-zinc-400 font-medium">No strategy logs recorded in ledger.</p>
              <Link href="/decision" className="text-xs text-red-400 font-bold uppercase tracking-wider mt-2 inline-block hover:underline">
                Create First Entry &gt;
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0c0c12]/40 shadow-xl glass-panel">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-950/60 text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
                      <th className="px-6 py-4">Transaction hash</th>
                      <th className="px-6 py-4">Target objective</th>
                      <th className="px-6 py-4">Audit status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/60">
                    {decisions.map((decision) => {
                      const isComp = decision.status === "completed";
                      const isProg = decision.status === "in_progress";
                      
                      return (
                        <tr key={decision.id} className="hover:bg-zinc-900/30 transition-colors duration-150">
                          <td className="px-6 py-4 font-mono text-[11px] text-zinc-500">
                            {decision.id.substring(0, 16)}...
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white max-w-sm truncate text-sm font-title uppercase tracking-wide">
                              {decision.objective}
                            </div>
                            <span className="text-[10px] text-zinc-500 font-mono mt-0.5 block">
                              LOGGED: {new Date(decision.createdAt).toISOString().split('T')[0]}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {isComp && (
                              <span className="inline-flex items-center gap-1.5 rounded bg-emerald-950/20 border border-emerald-900/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-400 font-mono shadow-[0_0_10px_rgba(16,185,129,0.06)]">
                                <span className="size-1 rounded-full bg-emerald-400" /> SECURE_COMPLETED
                              </span>
                            )}
                            {isProg && (
                              <span className="inline-flex items-center gap-1.5 rounded bg-red-950/20 border border-red-900/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-red-400 font-mono shadow-[0_0_10px_rgba(239,68,68,0.06)] animate-pulse">
                                <span className="size-1 rounded-full bg-red-400" /> STRESS_TESTING
                              </span>
                            )}
                            {decision.status === "draft" && (
                              <span className="inline-flex items-center gap-1.5 rounded bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-zinc-400 font-mono">
                                <span className="size-1 rounded-full bg-zinc-500" /> DRAFT_NODE
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={isComp ? `/report?id=${decision.id}` : `/interview?id=${decision.id}`}
                              className={`inline-flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded transition ${
                                isComp
                                  ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
                                  : "bg-red-950/40 text-red-400 border border-red-900/30 hover:bg-red-900/20"
                              }`}
                            >
                              {isComp ? "View Ledger" : "Enter Console"} <ArrowRight className="size-3" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
