import { Icon } from "./icon";

export type MetricCardProps = {
  accent: string;
  label: string;
  points: string;
  trend: string;
  value: string;
};

export function MetricCard({ metric }: { metric: MetricCardProps }) {
  return (
    <article className="ui-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className={`grid h-9 w-9 place-items-center rounded-md text-white ${metric.accent}`}>
            <Icon className="h-4 w-4" name="tasks" />
          </span>
          <h2 className="text-sm font-semibold text-[var(--ink)]">{metric.label}</h2>
        </div>
        <strong className="text-2xl font-semibold">{metric.value}</strong>
      </div>
      <div className="mt-7 border-t border-[var(--line)] pt-7">
        <svg aria-hidden="true" className="h-[52px] w-[118px]" viewBox="0 0 118 52">
          <polyline fill="none" points={metric.points} stroke="currentColor" strokeWidth="3" />
        </svg>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{metric.trend}</p>
      </div>
    </article>
  );
}
