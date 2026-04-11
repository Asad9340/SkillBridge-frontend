import { getAdminAnalytics } from '@/actions/analytics.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const OperationsPage = async () => {
  const { data: analytics } = await getAdminAnalytics();
  const booking = analytics?.bookingSummary;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-bold">Operations</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {booking?.totalBookings ?? 0}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {booking?.pending ?? 0}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Confirmed</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {booking?.confirmed ?? 0}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {booking?.completed ?? 0}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cancelled</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {booking?.cancelled ?? 0}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OperationsPage;
