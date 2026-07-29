"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui";

type NavItem = {
  icon: IconName;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
  { icon: "tasks", label: "Tasks", href: "/time-line" },
  { icon: "calendar", label: "Calendar", href: "/calander" },
  { icon: "messages", label: "Messages", href: "/chat" },
  { icon: "files", label: "Files", href: "/time-line" },
  { icon: "settings", label: "Settings", href: "/user" },
];

export function Sidebar() {
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard" || pathname.startsWith("/dashboard/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="hidden w-[94px] shrink-0 flex-col items-center bg-white py-5 md:flex">
      <Link href="/dashboard" className="mb-32 flex flex-col items-center group">
        <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-[var(--primary)] text-xs font-black text-white group-hover:opacity-90 transition-opacity">
          S
        </div>
        <span className="mt-1 text-[16px] font-bold">OCTOM.</span>
      </Link>
      <nav className="flex flex-1 flex-col items-center gap-5">
        {navItems.map((item) => {
          const active = isItemActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className={[
                "grid h-11 w-11 place-items-center rounded-md transition",
                active
                  ? "bg-[var(--primary)] text-white shadow-[0_12px_24px_rgb(81_76_255_/_26%)]"
                  : "text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--ink)]",
              ].join(" ")}
            >
              <Icon name={item.icon} />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

