import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Activity, ShieldAlert, Zap, Terminal, Check } from "lucide-react";

const features = [
  {
    title: "Live Cross-Examination",
    description: "Submit a thesis, objective, or strategic plan. Face a panel of brutal expert personas configured to find errors in your logic.",
    icon: Activity,
    badge: "Expert Panels",
    color: "from-emerald-500/20 to-teal-500/5",
    borderColor: "group-hover:border-emerald-500/30",
    iconColor: "text-emerald-400"
  },
  {
    title: "Reality Attack Engine",
    description: "Simulate sudden operational disasters, supply chain ruptures, and competitive threats customized to your situation.",
    icon: Zap,
    badge: "Failure Sim",
    color: "from-red-500/20 to-orange-500/5",
    borderColor: "group-hover:border-red-500/30",
    iconColor: "text-red-400"
  },
  {
    title: "Critical Readiness Ledger",
    description: "Export a hard-hitting tactical assessment showing structural contradictions, logical loopholes, and financial risk profiles.",
    icon: ShieldAlert,
    badge: "Audit Log",
    color: "from-purple-500/20 to-indigo-500/5",
    borderColor: "group-hover:border-purple-500/30",
    iconColor: "text-purple-400"
  },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/60 backdrop-blur-xl">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
          <a href="#top" className="flex items-center gap-2.5 text-sm font-bold tracking-[0.2em] text-white font-title">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-purple-600 text-xs font-black text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              J
            </span>
            JANUS <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono tracking-normal font-medium">v1.2</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#manifesto" className="text-xs font-semibold uppercase tracking-wider text-zinc-400 transition hover:text-white">Manifesto</a>
            <a href="#features" className="text-xs font-semibold uppercase tracking-wider text-zinc-400 transition hover:text-white">Crucible Nodes</a>
            <a href="#terminal" className="text-xs font-semibold uppercase tracking-wider text-zinc-400 transition hover:text-white">System Logs</a>
          </div>
          <Button href="/dashboard" variant="primary" className="h-9 rounded bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Open Terminal
          </Button>
        </nav>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 border-b border-zinc-900/60">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0,transparent_65%)]" />
      <div className="absolute top-[10%] left-[10%] -z-10 size-96 bg-purple-500/5 blur-[120px] rounded-full" />
      
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-950/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-400 shadow-sm backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            CRUCIBLE PROTOCOL INITIATED
          </div>
          
          <h1 className="text-balance text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl font-title leading-[1.1] uppercase">
            Stress Test Your Decisions <br />
            <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
              Before Reality Crushes Them.
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Janus is a cold, hyper-logical advisory engine. It simulates hostile markets, exposes critical logical failures, and subjects your strategy to a brutal panel of adversarial AI specialists.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/decision" className="h-12 px-8 bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] hover:scale-105 duration-300 border border-red-500/20 rounded">
              Launch Stress Test
            </Button>
            <Button href="#manifesto" variant="secondary" className="h-12 px-8 bg-zinc-950 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 rounded">
              Read System Spec
            </Button>
          </div>
        </div>

        {/* Cyber terminal preview */}
        <div className="mt-20 relative rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-1.5 shadow-2xl backdrop-blur-md max-w-5xl mx-auto">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-red-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          <div className="rounded-xl border border-zinc-900 bg-black/80 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-900">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-500/50" />
                <span className="size-2.5 rounded-full bg-yellow-500/50" />
                <span className="size-2.5 rounded-full bg-green-500/50" />
                <span className="text-[10px] text-zinc-500 font-mono ml-2">Console v1.2 // session_established</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
                <span>SECURE MODE</span>
                <span className="size-2 rounded-full bg-emerald-500/30 animate-pulse" />
              </div>
            </div>
            {/* Screen content */}
            <div className="p-6 font-mono text-xs text-zinc-400 space-y-4 min-h-[220px]">
              <div className="text-zinc-500">{"// CHALLENGER PROFILE LOADED: SYSTEM CHALLENGER #4 (INVESTOR)"}</div>
              <div className="text-red-400 font-semibold">&gt; &quot;You state you have a 12-month runway but haven&apos;t factored in the new licensing tariffs. Why should I assume you won&apos;t be insolvent by Q3? Defend your numbers.&quot;</div>
              <div className="pl-4 border-l-2 border-zinc-800 text-zinc-500">{"// USER DEFENSE: \"We modeled a 15% increase in supply chain buffer to absorb tariff spikes.\""}</div>
              <div className="text-purple-400 font-semibold">&gt; SYSTEM REALITY ATTACK GENERATED: &quot;Catastrophic event: Your primary supplier shifts to exclusive contract. Lead time multiplies by 4x. What is your move?&quot;</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="bg-[#09090e] py-20 border-b border-zinc-900/60 relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-950/5 blur-[100px] rounded-full pointer-events-none" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500">The Axiom</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl font-title uppercase">
              Flattery kills strategies. <br />
              Janus does not flatter.
            </h2>
            <p className="mt-6 text-zinc-400 leading-relaxed">
              Standard LLMs are trained to be helpful, polite, and agreeable. They congratulate you on your ideas and validate your plans. This feels good, but it is dangerous.
            </p>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Janus is built on the opposite principle: cognitive friction. It searches for hidden vulnerabilities, structural inconsistencies, and assumptions that lack physical evidence.
            </p>
            
            <div className="mt-8 space-y-3.5">
              {[
                "Hostile expert panels configured to target specific blind spots",
                "Unpredictable Reality Attacks simulated dynamically based on chat history",
                "Strict adherence to facts, demanding real metrics over speculative vision"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="flex size-5 flex-shrink-0 items-center justify-center rounded bg-red-500/10 border border-red-500/30 text-red-400">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm font-medium text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl overflow-hidden glass-panel">
            <div className="absolute -top-12 -right-12 size-40 bg-purple-500/10 blur-3xl rounded-full" />
            <div className="flex items-center gap-3.5 border-b border-zinc-950 pb-6 mb-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-red-400">
                <Terminal className="size-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-title">SYSTEM OBJECTIVES</h4>
                <p className="text-xs text-zinc-500">Logic validation protocol</p>
              </div>
            </div>
            <div className="space-y-5 text-xs font-mono text-zinc-400">
              <div className="flex justify-between border-b border-zinc-900/50 pb-2">
                <span className="text-zinc-500">ENGINE_TYPE</span>
                <span className="text-white">ADVERSARIAL_CRITICAL</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900/50 pb-2">
                <span className="text-zinc-500">VERBATIM_COMPLIANCE</span>
                <span className="text-red-400">FALSE (HOSTILE Interrogation)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900/50 pb-2">
                <span className="text-zinc-500">EMPATHY_EMULATION</span>
                <span className="text-zinc-600">NULL // LOCKED</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-zinc-500">FAILSAFE_THRESHOLD</span>
                <span className="text-yellow-500">REALITY_ATTACK_MAX</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 bg-black">
      <Container>
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500">OPERATIONAL NODES</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl font-title uppercase">
            Built to stress test the limits.
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            Choose to face individual hostile agents or allow the orchestrator to deploy a multi-dimensional attack strategy.
          </p>
        </div>
        
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="group relative rounded-xl border border-zinc-800 bg-[#0c0c12]/40 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700 shadow-lg overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none`} />
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className={`flex size-11 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 ${feature.iconColor} transition-transform duration-300 group-hover:scale-105`}>
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-600 uppercase border border-zinc-900 px-2 py-0.5 rounded">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-100 transition-colors font-title uppercase tracking-wide">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">{feature.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 bg-[#09090e] border-t border-zinc-900/60 relative">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-950/5 blur-[120px] rounded-full pointer-events-none" />
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40 px-6 py-16 text-center text-white shadow-2xl sm:px-16 glass-panel">
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl font-black tracking-tight sm:text-4xl font-title uppercase">
              Submit Your Decision Strategy
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
              Provide your core plan, runway calculations, or startup target. Run the Crucible and get challenged immediately.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/decision" className="h-11 px-8 font-bold uppercase tracking-widest text-xs bg-white text-black hover:bg-zinc-200 transition-all hover:scale-105 duration-300 rounded shadow-md">
                Launch Crucible
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-950 bg-black py-8">
      <Container>
        <div className="flex flex-col gap-4 text-xs font-semibold tracking-wider text-zinc-600 sm:flex-row sm:items-center sm:justify-between uppercase font-mono">
          <p>© 2026 JANUS LABS // CHALLENGE EVERYTHING</p>
          <p>CRITICISM ENGINE PROTOCOL v1.2</p>
        </div>
      </Container>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="bg-[#070709] min-h-screen relative">
      <div className="cyber-grid" />
      <Navbar />
      <Hero />
      <Manifesto />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
