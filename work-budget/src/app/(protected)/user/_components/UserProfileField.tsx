type UserProfileFieldProps = {
  icon?: React.ReactNode;
  label: string;
  value: string;
};

export function UserProfileField({ icon, label, value }: UserProfileFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--ink)]">
      {label}
      <span className="flex h-[45px] items-center gap-3 rounded-[10px] border border-[#e2e7f0] bg-white px-4 text-sm font-normal text-[var(--ink)]">
        {icon ? <span className="shrink-0 text-[var(--muted)]">{icon}</span> : null}
        <input
          className="min-w-0 flex-1 bg-transparent outline-none"
          readOnly
          value={value || "-"}
        />
      </span>
    </label>
  );
}
