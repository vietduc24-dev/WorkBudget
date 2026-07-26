import { Icon } from "./icon";

export type MetricCardProps = {
  color: string;
  label: string;
  path: string;
  trend: string;
  value: string;
};

export function MetricCard({ metric }: { metric: MetricCardProps }) {
  return (
    <article className="ui-card h-[210px] p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#eef2f8] text-[#8492ad]">
            <Icon className="h-4 w-4" name="tasks" />
          </span>
          <h2 className="text-[17px] font-medium text-[#8492ad]">{metric.label}</h2>
        </div>
        <strong className="text-[26px] font-semibold text-[#202020]">{metric.value}</strong>
      </div>
      <div className="mt-6 border-t border-[var(--line)] pt-7">
        <div className="flex items-end justify-between">
          <svg aria-hidden="true" className="h-[82px] w-[135px] overflow-visible" viewBox="0 0 174 82">
            <path d={metric.path} fill="none" stroke={metric.color} strokeLinecap="round" strokeWidth="4" />
            <path d={metric.path} fill="none" opacity=".1" stroke={metric.color} strokeLinecap="round" strokeWidth="8" />
          </svg>
          <p className="pb-2 text-right text-[16px] leading-7 text-[var(--muted)]">
            <span className="font-semibold text-[#0daa07]">{metric.trend.split(" ")[0]}</span>{" "}
            {metric.trend.replace(metric.trend.split(" ")[0], "")}
          </p>
        </div>
      </div>
    </article>
  );
}
