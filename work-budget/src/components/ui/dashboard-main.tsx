import { ChartCard } from "./chart-card";
import { MetricCard, type MetricCardProps } from "./metric-card";
import { TaskCard } from "./task-card";

const metrics: MetricCardProps[] = [
  {
    accent: "bg-[#4f8cff]",
    label: "Task Completed",
    points: "0,40 28,24 56,31 86,8 115,19",
    trend: "10+ more from last week",
    value: "08",
  },
  {
    accent: "bg-[#ffb43f]",
    label: "New Task",
    points: "0,36 28,13 58,20 86,30 115,10",
    trend: "10+ more from last week",
    value: "10",
  },
  {
    accent: "bg-[#41c7a4]",
    label: "Project Done",
    points: "0,28 25,36 58,14 86,25 115,6",
    trend: "08+ more from last week",
    value: "10",
  },
];

export function DashboardMain() {
  return (
    <div className="dashboard-main">
      <section className="grid gap-6 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>
      <section className="mt-7 grid gap-7 2xl:grid-cols-[minmax(0,1fr)_324px]">
        <ChartCard />
        <aside className="grid gap-5">
          <TaskCard progress="72%" title="Create mobile screens" tone="bg-[#4f8cff]" />
          <TaskCard progress="45%" title="Wireframe review" tone="bg-[#ffb43f]" />
          <TaskCard progress="88%" title="Dashboard polish" tone="bg-[#41c7a4]" />
        </aside>
      </section>
    </div>
  );
}
