import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  GitBranch,
  Layers3,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
];

const features = [
  {
    icon: BrainCircuit,
    title: "Assumption mapping",
    description:
      "Turn scattered reasoning into a clear model of beliefs, constraints, risks, and open questions before a decision is made.",
  },
  {
    icon: Radar,
    title: "Plan stress tests",
    description:
      "Simulate counterarguments, edge cases, and second-order effects so weak points surface while there is still time to adapt.",
  },
  {
    icon: ShieldCheck,
    title: "Decision safeguards",
    description:
      "Create repeatable review paths for launches, investments, hiring plans, and strategy choices that deserve more than a gut check.",
  },
];

const workflow = [
  {
    icon: Layers3,
    title: "Frame the decision",
    description: "Capture the goal, context, tradeoffs, and options in a structured workspace built for deep thinking.",
  },
  {
    icon: GitBranch,
    title: "Challenge every path",
    description: "Janus questions assumptions, compares alternatives, and identifies where confidence is unsupported.",
  },
  {
    icon: CheckCircle2,
    title: "Move with clarity",
    description: "Leave with a sharper plan, explicit risks, and the next actions your team can defend.",
  },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-xl">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-950">
            <span className="flex size-8 items-center justify-center rounded-xl bg-zinc-950 text-xs text-white shadow-sm">
              J
            </span>
            Janus
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-600 transition hover:text-zinc-950"
              >
                {item.label}
              </a>
            ))}
          </div>

          <Button href="#cta" className="h-9 px-4">
            Request access
          </Button>
        </nav>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[32rem] max-w-6xl rounded-full bg-indigo-100/80 blur-3xl" />
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-600 shadow-sm">
            <Sparkles className="size-4 text-indigo-600" aria-hidden="true" />
            AI decision intelligence for high-stakes teams
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] text-zinc-950 sm:text-7xl lg:text-8xl">
            Challenge Your Decisions Before Reality Does
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-zinc-600 sm:text-xl">
            Janus is an AI decision challenger that questions your assumptions, stress-tests your plans, and helps you make better decisions.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#cta">
              Start challenging decisions
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Button>
            <Button href="#how-it-works" variant="secondary">
              See how it works
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-5xl rounded-[2rem] border border-zinc-200 bg-white p-2 shadow-2xl shadow-zinc-200/80">
          <div className="rounded-[1.5rem] border border-zinc-200 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.12),transparent_36%),linear-gradient(180deg,#ffffff,#fafafa)] p-6 sm:p-8">
            <div className="flex flex-col gap-6 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Decision review</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">Q3 market expansion plan</h2>
              </div>
              <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-indigo-100">
                7 assumptions challenged
              </span>
            </div>
            <div className="grid gap-4 pt-6 md:grid-cols-3">
              {[
                "What evidence would change this recommendation?",
                "Which dependency creates the highest downside risk?",
                "What is the strongest argument against this plan?",
              ].map((question) => (
                <div key={question} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <p className="text-sm leading-6 text-zinc-600">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="border-y border-zinc-200 bg-zinc-50/70 py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-indigo-600">Features</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-5xl">
            Built for clearer thinking under pressure.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Janus helps teams replace unchecked conviction with structured challenges, better evidence, and sharper strategic judgment.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/70"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-zinc-950">{feature.title}</h3>
                <p className="mt-4 leading-7 text-zinc-600">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-indigo-600">How it works</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-5xl">
            A decision room that never rubber-stamps.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Move from an idea to a defensible decision through a simple, repeatable challenge loop.
          </p>
        </div>

        <div className="relative mx-auto mt-16 grid max-w-5xl gap-4 lg:grid-cols-3">
          <div className="absolute left-1/2 top-10 -z-10 hidden h-px w-2/3 -translate-x-1/2 bg-zinc-200 lg:block" />
          {workflow.map((step, index) => {
            const Icon = step.icon;

            return (
              <article key={step.title} className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-200">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <p className="mt-6 font-mono text-sm text-indigo-600">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-950">{step.title}</h3>
                <p className="mt-4 leading-7 text-zinc-600">{step.description}</p>
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
    <section id="cta" className="py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-16 text-center text-white shadow-2xl shadow-zinc-200 sm:px-16">
          <div className="absolute inset-x-0 top-0 h-48 bg-indigo-500/25 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-indigo-200">Private beta</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Make your next decision harder to regret.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Bring Janus into strategic planning, product bets, operating reviews, and any decision where the cost of being wrong is high.
            </p>
            <div className="mt-9 flex justify-center">
              <Button href="mailto:hello@janus.ai" className="bg-white text-zinc-950 hover:bg-zinc-100">
                Request beta access
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
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
    <footer id="security" className="border-t border-zinc-200 py-10">
      <Container>
        <div className="flex flex-col gap-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Janus AI, Inc. Decisions deserve a challenger.</p>
          <div className="flex gap-6">
            <a href="#features" className="transition hover:text-zinc-950">Features</a>
            <a href="#how-it-works" className="transition hover:text-zinc-950">How it works</a>
            <a href="mailto:hello@janus.ai" className="transition hover:text-zinc-950">Contact</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
