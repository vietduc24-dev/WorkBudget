import { Header, Sidebar } from "@/components/layout";

export const metadata = {
  title: "Calendar",
  description: "Calendar view",
};

export default function CalendarPage() {
  return (
    <main className="app-root">
      <div className="app-shell">
        <Sidebar />
        <section className="dashboard-content">
          <Header />
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[var(--ink)]">Calendar</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Calendar view is under development.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
