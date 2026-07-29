import { Header, Sidebar } from "@/components/layout";
import { TimeLineView } from "./time-line-view";

export const metadata = {
  title: "Timeline",
  description: "Project timeline mockup.",
};

export default function TimeLinePage() {
  return (
    <main className="app-root">
      <div className="app-shell">
        <Sidebar />
        <section className="dashboard-content">
          <Header />
          <TimeLineView />
        </section>
      </div>
    </main>
  );
}
