import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, MapPin, Star } from 'lucide-react';
import { EventItem } from '@/types/event.type';

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  UPCOMING: 'default',
  ONGOING: 'secondary',
  COMPLETED: 'secondary',
  CANCELLED: 'destructive',
};

const EventCard = ({ event }: { event: EventItem }) => {
  const image = event.mediaUrls?.[0] || '/globe.svg';

  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={image}
          alt={event.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <CardContent className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-semibold">{event.title}</h3>
          <Badge variant={statusVariant[event.status] || 'default'}>
            {event.status}
          </Badge>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {new Date(event.startsAt).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {event.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            {event.rating.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary">{event.category}</Badge>
          <p className="font-semibold">৳ {event.price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
