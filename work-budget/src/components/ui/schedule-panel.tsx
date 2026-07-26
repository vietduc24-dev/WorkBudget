import { AvatarStack } from "./avatar";
import { Chip } from "./chip";
import { Icon } from "./icon";
import { MessageRow, type MessageRowProps } from "./message-row";
import { PanelHeader } from "./panel-header";

const messages: MessageRowProps[] = [
  { name: "Cris Morich", body: "Hi Angelina! How are You?", tone: "bg-[#ffd7b5]" },
  { name: "Charmie", body: "Do you need that design?", tone: "bg-[#cfe7ff]" },
  { name: "Jason Mandala", body: "What is the price of hourly...", tone: "bg-[#d8f2df]" },
  { name: "Charlie Chu", body: "Awesome design!!", tone: "bg-[#eadcff]" },
];

export function SchedulePanel() {
  return (
    <aside className="dashboard-panel">
      <PanelHeader action="▦ ◴" title="Today’s Scheudle" />
      <div className="mt-7">
        <div className="flex justify-between text-[13px] text-[var(--blue)]">
          <p>30 minute call with Client</p>
          <p>+ Invite</p>
        </div>
        <h3 className="mt-3 text-[19px] font-semibold">Project Discovery Call</h3>
        <div className="mt-7 flex h-[68px] items-center justify-between rounded-[8px] bg-[var(--primary)] px-5 text-white shadow-[0_18px_28px_rgb(81_76_255_/_24%)]">
          <AvatarStack />
          <span className="text-sm font-semibold">28:35</span>
          <Icon className="h-5 w-5" name="messages" />
        </div>
      </div>
      <hr className="my-7 border-[var(--line)]" />
      <PanelHeader title="Messages" />
      <div className="mt-5 grid gap-4">
        {messages.map((message) => (
          <MessageRow key={message.name} message={message} />
        ))}
      </div>
      <hr className="my-7 border-[var(--line)]" />
      <PanelHeader title="New Task" />
      <form className="mt-5 grid gap-5">
        <label className="grid gap-3 text-xs font-semibold text-[var(--muted)]">
          Task Title
          <input
            className="h-10 rounded-md border border-transparent bg-[#e8edf4] px-3 text-sm font-medium text-[var(--ink)] outline-none"
            defaultValue="Create new"
          />
        </label>
        <div className="flex justify-between text-[20px]">
          <span>‹</span>
          <span>🎉 😍 😁 🔥 😘 😉 😎 🙄</span>
          <span>›</span>
        </div>
        <hr className="border-[var(--line)]" />
        <div className="grid gap-3">
          <span className="text-xs font-semibold text-[var(--muted)]">Add Collaborators</span>
          <div className="flex flex-wrap gap-3">
            <Chip name="Angela" />
            <Chip name="Chris" />
            <button className="grid h-9 w-9 place-items-center rounded-full bg-[var(--soft)] text-[var(--ink)]" type="button">
              <Icon className="h-4 w-4" name="plus" />
            </button>
            <button className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-[var(--primary)] text-white" type="button">
              ›
            </button>
          </div>
        </div>
      </form>
    </aside>
  );
}
