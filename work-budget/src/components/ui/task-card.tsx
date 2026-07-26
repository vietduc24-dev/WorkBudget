type TaskCardProps = {
  comments: string;
  progress: string;
  time: string;
  title: string;
  url: string;
};

export function TaskCard({ comments, progress, time, title, url }: TaskCardProps) {
  return (
    <article className="grid min-h-[85px] overflow-hidden rounded-[8px] bg-white md:grid-cols-[178px_1fr_170px_146px]">
      <div className="flex items-center gap-4 bg-[#fbfbff] px-6">
        <button type="button" className="grid size-[35px] place-items-center rounded-full bg-[var(--primary)] text-white shadow-[0_10px_20px_rgb(81_76_255_/_24%)]">
          ▶
        </button>
        <div>
          <p className="text-[14px] font-semibold text-[#121212]">Start from</p>
          <p className="mt-2 text-[14px] text-[var(--muted)]">◷ {time}</p>
        </div>
      </div>
      <div className="px-8 py-5">
        <h3 className="text-[17px] font-semibold text-[var(--ink)]">{title}</h3>
        <div className="mt-3 flex gap-8 text-[13px]">
          <span className="text-[#514cff]">🔗 {url}</span>
          <span className="text-[var(--muted)]">☵ {comments}</span>
        </div>
      </div>
      <div className="px-5 py-5">
        <p className="text-[17px] font-semibold text-[var(--ink)]">{progress} complete</p>
        <div className="mt-4 h-[5px] rounded-full bg-[#dfe5ee]">
          <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: progress }} />
        </div>
      </div>
      <div className="flex items-center px-6">
        <button type="button" className="h-[39px] w-[120px] rounded-[8px] bg-[#eeeaff] text-[14px] font-medium text-[var(--primary)]">
          ⏱ Reminder
        </button>
      </div>
    </article>
  );
}
