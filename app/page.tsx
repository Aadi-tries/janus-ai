import { Card } from "@/components/card";

const navigation = ["Overview", "Agents", "Evaluations", "Deployments"];

const healthMetrics = [
  { label: "Production agents", value: "18", trend: "+3 this month" },
  { label: "Eval pass rate", value: "98.4%", trend: "+1.8% from last run" },
  { label: "Open incidents", value: "2", trend: "1 requires review" },
  { label: "Avg. latency", value: "412ms", trend: "within target" },
];

const agents = [
  { name: "Support triage", status: "Live", score: "99.1%", owner: "CX Ops" },
  { name: "Renewal assistant", status: "Review", score: "96.8%", owner: "Revenue" },
  { name: "Policy analyst", status: "Draft", score: "92.4%", owner: "Risk" },
];

const timeline = [
  "Evaluation suite completed for Support triage v4.2",
  "Retrieval source updated for policy analyst workspace",
  "Latency alert acknowledged by platform team",
];

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-zinc-200 bg-white px-5 py-6 lg:block">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-zinc-950 text-sm font-semibold text-white">
          J
        </span>
        <div>
          <p className="text-sm font-semibold text-zinc-950">Janus</p>
          <p className="text-xs text-zinc-500">AI control plane</p>
        </div>
      </div>

      <nav className="mt-10 space-y-1" aria-label="Dashboard navigation">
        {navigation.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
              item === "Overview"
                ? "bg-indigo-50 font-medium text-indigo-700"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
            }`}
          >
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-5 sm:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-600">Overview</p>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-950">Production dashboard</h1>
        </div>
        <button className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800">
          New evaluation
        </button>
      </div>
    </header>
  );
}

function MetricGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {healthMetrics.map((metric) => (
        <Card key={metric.label} className="p-6">
          <p className="text-sm text-zinc-500">{metric.label}</p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <p className="text-3xl font-semibold tracking-[-0.03em] text-zinc-950">{metric.value}</p>
            <p className="text-right text-xs font-medium text-indigo-600">{metric.trend}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ReliabilityPanel() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-zinc-200 px-6 py-5">
        <p className="text-sm font-medium text-zinc-950">Reliability score</p>
        <p className="mt-1 text-sm text-zinc-500">Live view across production workflows</p>
      </div>
      <div className="p-6">
        <div className="flex items-end justify-between">
          <p className="text-6xl font-semibold tracking-[-0.06em] text-zinc-950">94</p>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            Healthy
          </span>
        </div>
        <div className="mt-8 grid h-44 grid-cols-12 items-end gap-2">
          {[48, 64, 56, 72, 68, 84, 76, 88, 80, 92, 86, 96].map((height, index) => (
            <div
              key={height + index}
              className="rounded-t-xl bg-indigo-600/85"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

function AgentsTable() {
  return (
    <Card id="agents" className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">
        <div>
          <p className="text-sm font-medium text-zinc-950">Agent registry</p>
          <p className="mt-1 text-sm text-zinc-500">Latest release status by owned workflow</p>
        </div>
        <a href="#deployments" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View deploys
        </a>
      </div>
      <div className="divide-y divide-zinc-200">
        {agents.map((agent) => (
          <div key={agent.name} className="grid gap-4 px-6 py-5 text-sm sm:grid-cols-4 sm:items-center">
            <p className="font-medium text-zinc-950">{agent.name}</p>
            <p className="text-zinc-500">{agent.owner}</p>
            <p className="text-zinc-500">{agent.score} eval score</p>
            <span className="w-fit rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700">
              {agent.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ActivityFeed() {
  return (
    <Card className="p-6">
      <p className="text-sm font-medium text-zinc-950">Activity</p>
      <div className="mt-6 space-y-5">
        {timeline.map((item) => (
          <div key={item} className="flex gap-3">
            <span className="mt-2 size-2 rounded-full bg-indigo-600" />
            <p className="text-sm leading-6 text-zinc-600">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Topbar />
          <div id="overview" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Janus dashboard</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">
                Monitor every AI workflow from one command center.
              </h2>
              <p className="mt-4 text-lg leading-8 text-zinc-600">
                Track reliability, evaluation health, deployment readiness, and operational events without leaving the dashboard.
              </p>
            </div>

            <MetricGrid />

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
              <ReliabilityPanel />
              <ActivityFeed />
            </div>

            <div className="mt-4">
              <AgentsTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
