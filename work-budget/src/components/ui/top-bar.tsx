import { Avatar } from "./avatar";
import { Icon } from "./icon";

export function TopBar() {
  return (
    <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-[var(--line)] bg-white px-5 md:px-10">
      <div className="flex items-center gap-3 md:hidden">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-[var(--ink)] text-xs font-black text-white">
          O
        </div>
        <span className="text-xs font-bold tracking-[0.08em]">OCTOM.</span>
      </div>
      <label className="hidden h-11 w-[290px] items-center gap-3 rounded-md bg-[var(--soft)] px-5 text-sm text-[var(--muted)] md:flex">
        <span className="sr-only">Search</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
          placeholder="Search anything..."
          type="search"
        />
        <Icon className="h-5 w-5" name="search" />
      </label>
      <div className="flex items-center gap-7">
        <button className="relative text-[var(--ink)]" title="Notifications" type="button">
          <Icon name="bell" />
          <span className="absolute -right-1 -top-2 grid h-4 w-4 place-items-center rounded-full bg-[#ff6767] text-[9px] font-bold text-white">
            2
          </span>
        </button>
        <button className="flex items-center gap-3" type="button">
          <Avatar className="h-10 w-10" initials="A" tone="bg-[#f1c8a5]" />
          <Icon className="h-4 w-4 text-[var(--muted)]" name="chevron" />
        </button>
      </div>
    </header>
  );
}
