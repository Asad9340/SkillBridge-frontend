import { eventsService } from '@/services/events.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

const EventPipelinePage = async () => {
  const { data: eventsData, error } = await eventsService.getAllEvents({
    limit: '50',
  });

  if (error || !eventsData) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Event Pipeline</h1>
        <p className="text-muted-foreground">Failed to load event pipeline.</p>
      </div>
    );
  }

  const events = eventsData.data ?? [];

  const upcoming = events.filter(e => e.status === 'UPCOMING');
  const ongoing = events.filter(e => e.status === 'ONGOING');
  const completed = events.filter(e => e.status === 'COMPLETED');
  const cancelled = events.filter(e => e.status === 'CANCELLED');

  const columns = [
    {
      title: 'Upcoming',
      events: upcoming,
      color:
        'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    },
    {
      title: 'Ongoing',
      events: ongoing,
      color:
        'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    },
    {
      title: 'Completed',
      events: completed,
      color:
        'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    },
    {
      title: 'Cancelled',
      events: cancelled,
      color: 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    },
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Event Pipeline</h1>
        <p className="text-sm text-muted-foreground">
          Kanban view of all events by status.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map(col => (
          <div key={col.title} className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{col.title}</h2>
              <Badge variant="secondary">{col.events.length}</Badge>
            </div>
            <div className="space-y-2">
              {col.events.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center border rounded-lg">
                  No events
                </p>
              ) : (
                col.events.map(event => (
                  <Card
                    key={event.id}
                    className={`border ${col.color} shadow-none`}
                  >
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="text-sm">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 text-xs text-muted-foreground space-y-1">
                      <p>{event.category}</p>
                      <p>{new Date(event.startsAt).toLocaleDateString()}</p>
                      <p className="font-medium text-foreground">
                        ${event.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPipelinePage;
