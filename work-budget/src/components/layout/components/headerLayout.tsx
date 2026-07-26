import { Avatar } from "@/components/ui";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between bg-white px-6 lg:ml-[94px] lg:px-10">
      <div className="mx-auto hidden h-11 w-[290px] items-center justify-between rounded-[8px] bg-[#f3f6fb] px-5 text-[14px] text-[#1b2065] lg:flex">
        <span>Search anything...</span>
        <span className="text-[24px] text-[#8aa0bf]">⌕</span>
      </div>

      <div className="ml-auto flex items-center gap-7 text-[#514cff]">
        <button type="button" className="relative text-[24px]">
          ♧
          <span className="absolute -right-1 -top-1 grid size-3 place-items-center rounded-full bg-[#514cff] text-[8px] text-white">
            2
          </span>
        </button>
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10" initials="A" tone="bg-[#f1c8a5]" />
          <span className="text-[20px]">⌄</span>
        </div>
      </div>
    </header>
  );
}
