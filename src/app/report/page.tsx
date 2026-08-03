"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Download, ShieldAlert, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import Link from "next/link";

type ReportData = {
  readinessScore: number;
  confidenceScore: number;
  strengths: string[];
  weaknesses: string[];
  blindSpots: string[];
  risks: string[];
  recommendations: string[];
};

export default function ReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [report, setReport] = useState<ReportData | null>(null);
  const decisionId = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(true);
  const [objective, setObjective] = useState("");

  useEffect(() => {
    async function generateReport() {
      if (!decisionId) {
        setObjective("Example Decision");
        setIsLoading(false);
        return;
      }

      try {
        const decisionRes = await fetch(`/api/decisions/${decisionId}`);
        if (!decisionRes.ok) throw new Error("Failed to fetch decision");
        
        const decision = await decisionRes.json();
        setObjective(decision.objective);

        const res = await fetch("/api/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            objective: decision.objective, 
            context: decision.context, 
            history: decision.messages 
          }),
        });
        const data = await res.json();
        setReport(data);

        // Update status to completed
        await fetch(`/api/decisions/${decisionId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "completed" }),
        });

      } catch (error) {
        console.error("Failed to generate report:", error);
      } finally {
        setIsLoading(false);
      }
    }

    generateReport();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <Loader2 className="size-10 animate-spin text-red-500 mb-6" />
        <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-300">Synthesizing Crucible Results</h2>
        <p className="mt-2 text-zinc-500 font-mono text-sm">Compiling expert analysis and failure scenarios...</p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 sm:p-12 border-t border-zinc-900">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8 no-print">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 transition hover:text-white mb-6">
              <ArrowLeft className="size-4" />
              Return to Dashboard
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Decision Readiness Report</h1>
            <p className="text-lg text-zinc-400 font-medium">Objective: <span className="text-white">{objective}</span></p>
          </div>
          <button 
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-zinc-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] duration-300 no-print"
          >
            <Download className="size-4" />
            Download PDF
          </button>
        </header>

        {report ? (
          <main className="space-y-10">
            {/* Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center">
                <span className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">Readiness Score</span>
                <span className={`text-6xl font-bold ${getScoreColor(report.readinessScore)}`}>{report.readinessScore}<span className="text-2xl text-zinc-600">/100</span></span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center">
                <span className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">Janus Confidence</span>
                <span className={`text-6xl font-bold ${getScoreColor(report.confidenceScore)}`}>{report.confidenceScore}<span className="text-2xl text-zinc-600">/100</span></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="size-6 text-emerald-500" />
                  <h2 className="text-xl font-bold uppercase tracking-wider text-white">Strengths</h2>
                </div>
                <ul className="space-y-3">
                  {report.strengths.map((s, i) => (
                    <li key={i} className="flex gap-3 text-zinc-300">
                      <span className="text-emerald-500 mt-1">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="size-6 text-amber-500" />
                  <h2 className="text-xl font-bold uppercase tracking-wider text-white">Weaknesses</h2>
                </div>
                <ul className="space-y-3">
                  {report.weaknesses.map((w, i) => (
                    <li key={i} className="flex gap-3 text-zinc-300">
                      <span className="text-amber-500 mt-1">•</span> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Blind Spots & Risks */}
            <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-3 mb-6 relative">
                <ShieldAlert className="size-6 text-red-500 animate-pulse" />
                <h2 className="text-xl font-bold uppercase tracking-wider text-red-500">Critical Blind Spots & Risks</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Blind Spots</h3>
                  <ul className="space-y-3">
                    {report.blindSpots.map((b, i) => (
                      <li key={i} className="flex gap-3 text-zinc-300">
                        <span className="text-red-500 mt-1">→</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Risks</h3>
                  <ul className="space-y-3">
                    {report.risks.map((r, i) => (
                      <li key={i} className="flex gap-3 text-zinc-300">
                        <span className="text-red-500 mt-1">→</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="size-6 text-white" />
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">Recommendations</h2>
              </div>
              <ul className="space-y-4">
                {report.recommendations.map((r, i) => (
                  <li key={i} className="flex gap-4 p-4 bg-zinc-900 rounded-lg text-zinc-200">
                    <span className="font-bold font-mono text-zinc-500">{i + 1}.</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          </main>
        ) : (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-12 text-center">
            <h2 className="text-xl font-bold text-white mb-2">No Report Found</h2>
            <p className="text-zinc-500">Could not find recent interview data to generate a report.</p>
          </div>
        )}
      </div>
    </div>
  );
}
