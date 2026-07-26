export function PanelHeader({ action, title }: { action?: string; title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>
      {action ? (
        <button className="rounded-md bg-[var(--soft)] px-3 py-2 text-xs font-semibold text-[var(--muted)]" type="button">
          {action}
        </button>
      ) : null}
    </div>
  );
}
