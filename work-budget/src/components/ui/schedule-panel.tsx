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
      <PanelHeader action="Today" title="Today's Schedule" />
      <div className="mt-7">
        <p className="text-xs font-semibold text-[var(--muted)]">30 minute call with Client</p>
        <h3 className="mt-2 text-lg font-semibold">Project Discovery Call</h3>
        <div className="mt-6 flex items-center justify-between rounded-md bg-[var(--soft)] p-4">
          <AvatarStack />
          <span className="text-sm font-semibold">28:35</span>
          <Icon className="h-5 w-5 text-[var(--muted)]" name="messages" />
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
            className="h-10 rounded-md border border-[var(--line)] px-3 text-sm font-medium text-[var(--ink)] outline-none"
            defaultValue="Create new"
          />
        </label>
        <div className="grid gap-3">
          <span className="text-xs font-semibold text-[var(--muted)]">Add Collaborators</span>
          <div className="flex flex-wrap gap-3">
            <Chip name="Angela" />
            <Chip name="Chris" />
            <button className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-white" type="button">
              <Icon className="h-4 w-4" name="plus" />
            </button>
          </div>
        </div>
      </form>
    </aside>
  );
}
