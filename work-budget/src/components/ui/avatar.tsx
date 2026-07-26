type AvatarProps = {
  initials: string;
  tone: string;
  className?: string;
};

export function Avatar({ className = "h-10 w-10", initials, tone }: AvatarProps) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full text-xs font-bold text-[var(--ink)] ${tone} ${className}`}
    >
      {initials}
    </span>
  );
}

export function AvatarStack() {
  return (
    <div className="flex -space-x-2">
      <Avatar className="h-8 w-8 border-2 border-white" initials="A" tone="bg-[#ffd7b5]" />
      <Avatar className="h-8 w-8 border-2 border-white" initials="C" tone="bg-[#cfe7ff]" />
      <Avatar className="h-8 w-8 border-2 border-white" initials="J" tone="bg-[#d8f2df]" />
      <Avatar className="h-8 w-8 border-2 border-white" initials="R" tone="bg-[#eadcff]" />
    </div>
  );
}
