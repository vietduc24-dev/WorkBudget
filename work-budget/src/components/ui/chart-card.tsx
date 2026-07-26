const labels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

export function ChartCard() {
  const gridRows = ["400", "300", "200", "100", "0"];

  return (
    <article className="ui-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[26px] font-bold text-[var(--ink)]">Task Done</h2>
        <div className="flex items-center gap-10 text-[18px] font-semibold text-[var(--ink)]">
          <button type="button">Daily</button>
          <button type="button">Weekly</button>
          <button className="border-b-2 border-[var(--blue)] pb-3 text-[var(--blue)]" type="button">
            Monthly
          </button>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-[45px_1fr]">
        <div className="flex h-[230px] flex-col justify-between text-[14px] text-[var(--muted)]">
          {gridRows.map((row) => (
            <span key={row}>{row}</span>
          ))}
        </div>
        <div className="relative h-[252px] overflow-hidden">
          {[0, 55, 110, 165, 220].map((top) => (
            <div className="absolute inset-x-0 h-px bg-[#e8ecf3]" key={top} style={{ top }} />
          ))}
          <svg aria-hidden="true" className="absolute inset-x-0 top-2 h-[240px] w-full" viewBox="0 0 774 240">
            <defs>
              <linearGradient id="purpleFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#514cff" stopOpacity=".22" />
                <stop offset="100%" stopColor="#514cff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="blueFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#19a2ff" stopOpacity=".24" />
                <stop offset="100%" stopColor="#19a2ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 190 C40 185 55 130 88 150 C130 175 150 210 172 142 C195 72 213 6 255 14 C293 21 296 76 334 82 C374 90 376 138 424 122 C460 109 482 93 520 124 C560 157 588 185 626 120 C662 58 680 28 725 35 C760 40 745 146 774 190 L774 240 L0 240 Z"
              fill="url(#purpleFill)"
            />
            <path
              d="M0 190 C40 185 55 130 88 150 C130 175 150 210 172 142 C195 72 213 6 255 14 C293 21 296 76 334 82 C374 90 376 138 424 122 C460 109 482 93 520 124 C560 157 588 185 626 120 C662 58 680 28 725 35 C760 40 745 146 774 190"
              fill="none"
              stroke="#514cff"
              strokeWidth="3"
            />
            <path
              d="M0 210 C42 210 38 170 80 163 C126 156 125 78 164 93 C200 106 210 88 242 66 C278 40 304 45 328 90 C356 142 382 110 420 98 C464 84 470 220 512 208 C558 198 570 185 615 200 C666 218 683 160 732 150 C756 146 753 175 774 178 L774 240 L0 240 Z"
              fill="url(#blueFill)"
            />
            <path
              d="M0 210 C42 210 38 170 80 163 C126 156 125 78 164 93 C200 106 210 88 242 66 C278 40 304 45 328 90 C356 142 382 110 420 98 C464 84 470 220 512 208 C558 198 570 185 615 200 C666 218 683 160 732 150 C756 146 753 175 774 178"
              fill="none"
              stroke="#19a2ff"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
      <div className="ml-[45px] mt-1 grid grid-cols-6 gap-2 text-[12px] text-[var(--muted)] md:grid-cols-12">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </article>
  );
}
