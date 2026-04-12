import { eventsService } from '@/services/events.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const OrganizerDashboard = async () => {
  const { data: eventsData } = await eventsService.getAllEvents();
  const events = eventsData?.data ?? [];
  const total = eventsData?.meta?.total ?? 0;
  const upcoming = events.filter(e => e.status === 'UPCOMING').length;
  const ongoing = events.filter(e => e.status === 'ONGOING').length;
  const completed = events.filter(e => e.status === 'COMPLETED').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Organizer Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome! Manage your events and track insights from here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl border bg-card p-6 shadow-sm">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-3xl font-bold">{total}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl border bg-card p-6 shadow-sm">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-3xl font-bold">{upcoming}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl border bg-card p-6 shadow-sm">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ongoing
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-3xl font-bold">{ongoing}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl border bg-card p-6 shadow-sm">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-3xl font-bold">{completed}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
