import { ChartCard } from "./chart-card";
import { MetricCard, type MetricCardProps } from "./metric-card";
import { TaskCard } from "./task-card";

const metrics: MetricCardProps[] = [
  {
    color: "#514cff",
    label: "Task Completed",
    path: "M0 42 C28 8 38 80 66 28 C88 -12 98 58 126 8 C146 -24 158 6 174 18",
    trend: "10+ more from last week",
    value: "08",
  },
  {
    color: "#19a2ff",
    label: "New Task",
    path: "M0 42 C26 10 40 74 66 26 C88 -11 100 54 126 8 C146 -20 158 8 174 20",
    trend: "10+ more from last week",
    value: "10",
  },
  {
    color: "#ff5147",
    label: "Project Done",
    path: "M0 42 C30 10 42 74 68 26 C90 -12 104 56 128 8 C148 -18 160 8 174 18",
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
      <section className="mt-[30px]">
        <ChartCard />
      </section>
      <section className="mt-[25px]">
        <h2 className="mb-5 text-[26px] font-bold text-[var(--ink)]">Task</h2>
        <div className="grid gap-5">
          <TaskCard comments="8 comments" progress="24%" time="9.00 am" title="Search Inspiration for project" url="www.uistore.com" />
          <TaskCard comments="5 comments" progress="60%" time="3.00 am" title="Search Inspiration for project" url="www.uistore.org" />
        </div>
      </section>
    </div>
  );
}
