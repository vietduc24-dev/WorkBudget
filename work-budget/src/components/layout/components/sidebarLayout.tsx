import { Icon, type IconName } from "@/components/ui";

type NavItem = {
  icon: IconName;
  label: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", active: true },
  { icon: "tasks", label: "Tasks" },
  { icon: "calendar", label: "Calendar" },
  { icon: "messages", label: "Messages" },
  { icon: "files", label: "Files" },
  { icon: "settings", label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-[94px] shrink-0 flex-col items-center bg-white py-5 md:flex">
      <div className="mb-32 flex flex-col items-center">
        <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-[var(--primary)] text-xs font-black text-white">
          S
        </div>
        <span className="mt-1 text-[16px] font-bold">OCTOM.</span>
      </div>
      <nav className="flex flex-1 flex-col items-center gap-5">
        {navItems.map((item) => (
          <button
            className={[
              "grid h-11 w-11 place-items-center rounded-md transition",
              item.active
                ? "bg-[var(--primary)] text-white shadow-[0_12px_24px_rgb(81_76_255_/_26%)]"
                : "text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--ink)]",
            ].join(" ")}
            key={item.label}
            title={item.label}
            type="button"
          >
            <Icon name={item.icon} />
          </button>
        ))}
      </nav>
    </aside>
  );
}
