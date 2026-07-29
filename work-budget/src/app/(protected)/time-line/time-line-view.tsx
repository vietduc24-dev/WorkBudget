"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import type { CSSProperties } from "react";
import type { EventInput } from "@fullcalendar/react";
import { AvatarStack, Icon } from "@/components/ui";

type TimelineTask = {
  id: string;
  title: string;
  row: number;
  startColumn: number;
  span: number;
  progress: string;
  color: string;
};

type TimelineLane = {
  id: string;
  title: string;
  children?: string[];
  height: string;
};

const lanes: TimelineLane[] = [
  { id: "research", title: "UX Research", height: "84px" },
  { id: "architecture", title: "Information Arc...", height: "84px" },
  { id: "design", title: "Design Phase", children: ["Build Wireframe", "User Interface D.."], height: "205px" },
  { id: "prototype", title: "Phototyping", height: "84px" },
  { id: "development", title: "Development", children: ["Back-End Dev..", "Front-End Dev.."], height: "195px" },
];

const timelineTasks: TimelineTask[] = [
  { id: "profile", title: "Profile", row: 0, startColumn: 1, span: 4, progress: "48%", color: "#514cff" },
  { id: "menu-a", title: "Menu", row: 0, startColumn: 6, span: 3, progress: "54%", color: "#19a2ff" },
  { id: "settings", title: "Settings", row: 0, startColumn: 12, span: 4, progress: "39%", color: "#514cff" },
  { id: "login", title: "Login", row: 1, startColumn: 0, span: 3, progress: "48%", color: "#19a2ff" },
  { id: "services-a", title: "Services", row: 1, startColumn: 8, span: 4, progress: "54%", color: "#514cff" },
  { id: "testimonials", title: "Testimonials", row: 2, startColumn: 5, span: 5, progress: "69%", color: "#514cff" },
  { id: "menu-b", title: "Menu", row: 3, startColumn: 4, span: 4, progress: "61%", color: "#19a2ff" },
  { id: "homepage", title: "Homepage", row: 3, startColumn: 12, span: 4, progress: "48%", color: "#514cff" },
  { id: "portfolio", title: "Our Portfolio", row: 4, startColumn: 3, span: 7, progress: "63%", color: "#514cff" },
  { id: "profile-b", title: "Profile", row: 5, startColumn: 0, span: 4, progress: "48%", color: "#19a2ff" },
  { id: "services-b", title: "Services", row: 5, startColumn: 8, span: 4, progress: "54%", color: "#514cff" },
];

const calendarEvents: EventInput[] = timelineTasks.map((task) => ({
  id: task.id,
  title: task.title,
  start: "2022-06-20",
  display: "background",
}));

const dayLabels = [
  "S 04",
  "S 05",
  "S 06",
  "S 07",
  "S 04",
  "S 05",
  "S 06",
  "S 07",
  "S 08",
  "S 09",
  "S 10",
  "S 11",
  "S 12",
  "S 13",
  "S 14",
  "S 15",
  "S 16",
  "S 18",
  "S 19",
  "S 20",
  "S 21",
];

export function TimeLineView() {
  return (
    <div className="timeline-page">
      <section className="timeline-toolbar">
        <div className="flex min-w-0 items-center gap-28">
          <h1 className="text-[28px] font-semibold tracking-normal text-[var(--ink)]">Timeline</h1>
          <div className="hidden items-center gap-2 md:flex">
            <button className="h-[33px] rounded-[10px] bg-white px-5 text-sm font-medium text-[var(--ink)]" type="button">
              Today
            </button>
            <button
              className="flex h-[33px] items-center gap-4 rounded-[10px] bg-white px-4 text-sm font-medium text-[var(--ink)]"
              type="button"
            >
              June, 20,2022
              <Icon className="h-4 w-4 text-[var(--muted)]" name="chevron" />
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <button className="rounded-[10px] bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white" type="button">
            + Invite
          </button>
          <AvatarStack />
        </div>
      </section>

      <section className="timeline-board">
        <aside className="timeline-lanes">
          {lanes.map((lane) => (
            <TimelineLane key={lane.id} lane={lane} />
          ))}
        </aside>

        <div className="timeline-calendar-shell">
          <div className="timeline-day-header">
            {dayLabels.map((label, index) => (
              <span key={`${label}-${index}`}>{label}</span>
            ))}
          </div>

          <div className="timeline-calendar-layer" aria-hidden="true">
            <FullCalendar
              dayMaxEvents={false}
              events={calendarEvents}
              fixedWeekCount={false}
              headerToolbar={false}
              height="100%"
              initialDate="2022-06-20"
              initialView="dayGridMonth"
              plugins={[dayGridPlugin, interactionPlugin]}
              weekends
            />
          </div>

          <div className="timeline-grid-lines" aria-hidden="true">
            {dayLabels.map((label, index) => (
              <span key={`line-${label}-${index}`} />
            ))}
          </div>

          <div className="timeline-task-layer">
            {timelineTasks.map((task) => (
              <TimelineBar key={task.id} task={task} />
            ))}
          </div>

          <div className="timeline-chart-card">
            <p className="text-[22px] font-semibold text-[var(--ink)]">Activity</p>
            <div className="mt-8 flex h-[116px] items-end gap-3">
              {[67, 73, 53, 47, 39, 27, 27].map((value, index) => (
                <div className="flex flex-1 flex-col items-center gap-3" key={`${value}-${index}`}>
                  <div className="w-full rounded-t-[10px] bg-[var(--primary)] opacity-90" style={{ height: `${value}%` }} />
                  <span className="text-xs font-medium text-[var(--muted)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelineLane({ lane }: { lane: TimelineLane }) {
  return (
    <article className="timeline-lane-card" style={{ minHeight: lane.height }}>
      <div className="flex items-center gap-3">
        <span className="grid size-5 place-items-center rounded-full bg-[var(--primary)] text-[10px] text-white">✓</span>
        <span className="text-sm font-medium text-[var(--ink)]">{lane.title}</span>
      </div>
      {lane.children ? (
        <div className="mt-9 grid gap-7 pl-[30px]">
          {lane.children.map((child) => (
            <span className="text-[16px] font-medium text-[var(--ink)]" key={child}>
              {child}
            </span>
          ))}
        </div>
      ) : null}
      <AvatarStack />
    </article>
  );
}

function TimelineBar({ task }: { task: TimelineTask }) {
  return (
    <article
      className="timeline-bar"
      style={{
        "--bar-color": task.color,
        "--row": task.row,
        "--span": task.span,
        "--start": task.startColumn,
      } as CSSProperties}
    >
      <div className="timeline-bar-fill">
        <span className="size-[15px] rounded-full bg-white/85" />
        <span className="truncate text-xs font-medium text-white">{task.title}</span>
      </div>
      <span className="timeline-bar-progress">{task.progress}</span>
      <Icon className="h-4 w-4 text-[var(--primary)]" name="chevron" />
    </article>
  );
}
