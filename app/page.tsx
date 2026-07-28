import { Button } from "@/components/button";
import { Container } from "@/components/container";

const navItems = ["Platform", "Workflows", "Security", "Pricing"];

const features = [
  {
    title: "Design with context",
    description:
      "Map agents, tools, data sources, and evaluation criteria in one clean system of record before anything reaches production.",
  },
  {
    title: "Evaluate continuously",
    description:
      "Run structured checks across prompts, models, and edge cases so every release is measured against the outcomes that matter.",
  },
  {
    title: "Ship with control",
    description:
      "Promote validated AI workflows with approvals, observability, and rollback paths built for fast-moving product teams.",
  },
];

const stats = [
  { value: "99.9%", label: "workflow uptime target" },
  { value: "24/7", label: "evaluation monitoring" },
  { value: "SOC 2", label: "ready controls" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-xl">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-lg bg-zinc-950 text-xs text-white">
              J
            </span>
            Janus
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-zinc-600 transition hover:text-zinc-950"
              >
                {item}
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
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-96 max-w-5xl rounded-full bg-indigo-100/70 blur-3xl" />
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-600 shadow-sm">
            <span className="size-2 rounded-full bg-indigo-600" />
            AI operations for teams that ship carefully
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-7xl lg:text-8xl">
            Build dependable AI products with less drift.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-zinc-600 sm:text-xl">
            Janus gives product, engineering, and operations teams a focused workspace to design AI systems, evaluate behavior, and release changes with confidence.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#cta">Start building</Button>
            <Button href="#platform" variant="secondary">
              Explore platform
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-5xl rounded-[2rem] border border-zinc-200 bg-zinc-950 p-2 shadow-2xl shadow-zinc-200">
          <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.38),transparent_32%),#09090b] p-6 text-white sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-zinc-400">Release readiness</p>
                <h2 className="mt-1 text-xl font-medium">Customer-support agent v4</h2>
              </div>
              <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-sm text-indigo-200 ring-1 ring-indigo-300/20">
                Approved
              </span>
            </div>
            <div className="grid gap-4 pt-6 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
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
    <section id="platform" className="border-y border-zinc-200 bg-zinc-50/70 py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-indigo-600">Platform</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-5xl">
            A calmer way to operate AI.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Janus replaces scattered prompts, spreadsheets, and manual reviews with a single operating layer for reliable AI systems.
          </p>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <article key={feature.title} className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/70">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-indigo-50 font-mono text-sm text-indigo-600">
                0{index + 1}
              </span>
              <h3 className="mt-8 text-xl font-semibold tracking-tight text-zinc-950">{feature.title}</h3>
              <p className="mt-4 leading-7 text-zinc-600">{feature.description}</p>
            </article>
          ))}
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
          <div className="absolute inset-x-0 top-0 h-40 bg-indigo-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-indigo-200">Private beta</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Bring your AI roadmap into focus.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Join teams using Janus to move from prototype enthusiasm to production discipline without slowing momentum.
            </p>
            <div className="mt-9 flex justify-center">
              <Button href="mailto:hello@janus.ai" className="bg-white text-zinc-950 hover:bg-zinc-100">
                Request beta access
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
    <footer className="border-t border-zinc-200 py-10">
      <Container>
        <div className="flex flex-col gap-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Janus AI, Inc. Built for deliberate AI teams.</p>
          <div className="flex gap-6">
            <a href="#security" className="transition hover:text-zinc-950">Security</a>
            <a href="#pricing" className="transition hover:text-zinc-950">Pricing</a>
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
      <CTA />
      <Footer />
    </main>
  );
}
