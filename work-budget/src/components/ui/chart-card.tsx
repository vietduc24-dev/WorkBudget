const labels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

export function ChartCard() {
  return (
    <article className="ui-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Project Analytics</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Completed and active task movement</p>
        </div>
        <div className="flex items-center gap-5 text-xs font-medium text-[var(--muted)]">
          <span className="flex items-center gap-2">
            <i className="h-2.5 w-2.5 rounded-full bg-[#4f8cff]" />
            Completed
          </span>
          <span className="flex items-center gap-2">
            <i className="h-2.5 w-2.5 rounded-full bg-[#41c7a4]" />
            Active
          </span>
        </div>
      </div>
      <div className="mt-8 overflow-hidden">
        <svg aria-hidden="true" className="h-[250px] w-full min-w-[680px]" viewBox="0 0 820 250">
          {[25, 75, 125, 175, 225].map((y) => (
            <line key={y} stroke="#edf0f4" strokeWidth="1" x1="48" x2="808" y1={y} y2={y} />
          ))}
          <path
            d="M48 196 C128 118, 170 206, 240 105 S370 56, 420 122 S520 212, 592 154 S710 36, 808 142"
            fill="none"
            stroke="#4f8cff"
            strokeWidth="4"
          />
          <path
            d="M48 172 C122 160, 160 120, 234 154 S360 42, 428 78 S520 94, 590 126 S708 112, 808 178"
            fill="none"
            stroke="#41c7a4"
            strokeWidth="4"
          />
        </svg>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-3 text-xs text-[var(--muted)] sm:grid-cols-10">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </article>
  );
}
