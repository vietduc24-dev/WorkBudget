export const metadata = {
  title: "Dashboard",
  description: "This is the dashboard page of the application.",
};

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-3 text-lg">Welcome to the dashboard!</p>
    </div>
  );
}
