import { AvatarStack } from "./avatar";
import { Icon } from "./icon";

type TaskCardProps = {
  progress: string;
  title: string;
  tone: string;
};

export function TaskCard({ progress, title, tone }: TaskCardProps) {
  return (
    <article className="ui-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs font-semibold text-[var(--muted)]">{progress}</span>
      </div>
      <div className="mt-5 h-2 rounded-full bg-[var(--soft)]">
        <div className={`h-full rounded-full ${tone}`} style={{ width: progress }} />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <AvatarStack />
        <button className="grid h-8 w-8 place-items-center rounded-md bg-[var(--soft)] text-[var(--ink)]" type="button">
          <Icon className="h-4 w-4" name="plus" />
        </button>
      </div>
    </article>
  );
}
