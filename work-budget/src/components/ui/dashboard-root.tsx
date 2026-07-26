import { DashboardMain } from "./dashboard-main";
import { Sidebar } from "@/components/layout";
import { SchedulePanel } from "./schedule-panel";
import { TopBar } from "./top-bar";

export function DashboardRoot() {
  return (
    <main className="app-root">
      <div className="app-shell">
        <Sidebar />
        <section className="dashboard-content">
          <TopBar />
          <div className="dashboard-grid">
            <DashboardMain />
            <SchedulePanel />
          </div>
        </section>
      </div>
    </main>
  );
}
