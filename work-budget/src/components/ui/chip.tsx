import { Avatar } from "./avatar";

export function Chip({ name }: { name: string }) {
  return (
    <span className="inline-flex h-9 items-center gap-2 rounded-md border border-[var(--line)] px-2 text-sm font-medium">
      <Avatar className="h-6 w-6" initials={name[0]} tone="bg-[#d8f2df]" />
      {name}
    </span>
  );
}
