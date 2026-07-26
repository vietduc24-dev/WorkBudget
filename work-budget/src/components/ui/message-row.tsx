import { Avatar } from "./avatar";

export type MessageRowProps = {
  body: string;
  name: string;
  tone: string;
};

export function MessageRow({ message }: { message: MessageRowProps }) {
  return (
    <article className="grid grid-cols-[56px_1fr] gap-4">
      <Avatar className="h-14 w-14" initials={message.name[0]} tone={message.tone} />
      <div className="min-w-0">
        <h3 className="truncate text-[17px] font-bold text-[var(--ink)]">{message.name}</h3>
        <p className="mt-1 truncate text-[16px] text-[var(--muted)]">{message.body}</p>
      </div>
    </article>
  );
}
