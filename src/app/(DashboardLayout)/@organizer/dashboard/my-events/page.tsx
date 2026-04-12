import { eventsService } from '@/services/events.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

const statusVariant: Record<
  string,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  UPCOMING: 'default',
  ONGOING: 'secondary',
  COMPLETED: 'outline',
  CANCELLED: 'destructive',
};

const MyEventsPage = async () => {
  const { data: eventsData, error } = await eventsService.getAllEvents({
    limit: '20',
  });

  if (error || !eventsData) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">My Events</h1>
        <p className="text-muted-foreground">Failed to load events.</p>
      </div>
    );
  }

  const events = eventsData.data ?? [];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Events</h1>
        <p className="text-sm text-muted-foreground">
          Overview of all platform events.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No events found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map(event => (
            <Card key={event.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-tight">
                    {event.title}
                  </CardTitle>
                  <Badge
                    variant={statusVariant[event.status] ?? 'default'}
                    className="shrink-0"
                  >
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 shrink-0" />
                  <span>{event.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>
                    {new Date(event.startsAt).toLocaleDateString()} —{' '}
                    {new Date(event.endsAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="font-medium text-foreground">
                  ${event.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-right">
        Showing {events.length} of {eventsData.meta.total} events
      </p>
    </div>
  );
};

export default MyEventsPage;
