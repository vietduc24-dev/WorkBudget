import { Header, Sidebar } from "@/components/layout";

export const metadata = {
  title: "Messages",
  description: "Chat & messages view",
};

export default function ChatPage() {
  return (
    <main className="app-root">
      <div className="app-shell">
        <Sidebar />
        <section className="dashboard-content">
          <Header />
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[var(--ink)]">Messages</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Chat view is under development.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
