export type IconName =
  | "dashboard"
  | "tasks"
  | "calendar"
  | "messages"
  | "files"
  | "settings"
  | "search"
  | "bell"
  | "chevron"
  | "plus";

const paths: Record<IconName, string[]> = {
  dashboard: ["M4 5.5h7V11H4z", "M13 5.5h7V11h-7z", "M4 13h7v5.5H4z", "M13 13h7v5.5h-7z"],
  tasks: ["M8 6h12", "M8 12h12", "M8 18h12", "M4 6h.01", "M4 12h.01", "M4 18h.01"],
  calendar: ["M7 3v3", "M17 3v3", "M4 8h16", "M5 5h14v16H5z"],
  messages: ["M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-5 4V6.5Z"],
  files: ["M14 3H7a2 2 0 0 0-2 2v16h14V8l-5-5Z", "M14 3v5h5"],
  settings: ["M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z", "M19 12h2M3 12h2M12 3v2M12 19v2M17 5l1.4-1.4M5.6 18.4 7 17M5.6 5.6 7 7M17 17l1.4 1.4"],
  search: ["m21 21-4.35-4.35", "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z", "M10 21h4"],
  chevron: ["m9 18 6-6-6-6"],
  plus: ["M12 5v14", "M5 12h14"],
};

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name].map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  );
}
