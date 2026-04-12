import { eventsService } from '@/services/events.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const EventInsightsPage = async () => {
  const { data: eventsData, error } = await eventsService.getAllEvents({
    limit: '100',
  });

  if (error || !eventsData) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Event Insights</h1>
        <p className="text-muted-foreground">Failed to load insights.</p>
      </div>
    );
  }

  const events = eventsData.data ?? [];
  const total = eventsData.meta.total;

  const upcoming = events.filter(e => e.status === 'UPCOMING').length;
  const ongoing = events.filter(e => e.status === 'ONGOING').length;
  const completed = events.filter(e => e.status === 'COMPLETED').length;
  const cancelled = events.filter(e => e.status === 'CANCELLED').length;

  // Category breakdown
  const categoryMap = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + 1;
    return acc;
  }, {});
  const categoryEntries = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1],
  );

  // Revenue stats
  const totalRevenue = events.reduce((sum, e) => sum + e.price, 0);
  const avgPrice = events.length > 0 ? totalRevenue / events.length : 0;

  // Average rating
  const avgRating =
    events.length > 0
      ? events.reduce((sum, e) => sum + e.rating, 0) / events.length
      : 0;

  const overviewCards = [
    { label: 'Total Events', value: total },
    { label: 'Upcoming', value: upcoming },
    { label: 'Ongoing', value: ongoing },
    { label: 'Completed', value: completed },
    { label: 'Cancelled', value: cancelled },
    { label: 'Avg. Price', value: `$${avgPrice.toFixed(2)}` },
    { label: 'Avg. Rating', value: avgRating.toFixed(1) },
    { label: 'Categories', value: categoryEntries.length },
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Event Insights</h1>
        <p className="text-sm text-muted-foreground">
          Analytics and statistics for all platform events.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {overviewCards.map(card => (
          <Card key={card.label} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {card.value}
            </CardContent>
          </Card>
        ))}
      </div>

      {categoryEntries.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Events by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryEntries.map(([category, count]) => {
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{category}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventInsightsPage;
