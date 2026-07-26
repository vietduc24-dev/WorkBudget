export function PanelHeader({ action, title }: { action?: string; title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[22px] font-bold text-[var(--ink)]">{title}</h2>
      {action ? (
        <button className="rounded-full bg-[var(--soft)] px-4 py-2 text-xs font-semibold text-[var(--muted)]" type="button">
          {action}
        </button>
      ) : null}
    </div>
  );
}
