export const dynamic = 'force-dynamic';

const OrganizerDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Organizer Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome! Manage your events and track insights from here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            My Events
          </h3>
          <p className="mt-2 text-3xl font-bold">—</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Event Pipeline
          </h3>
          <p className="mt-2 text-3xl font-bold">—</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Event Insights
          </h3>
          <p className="mt-2 text-3xl font-bold">—</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
