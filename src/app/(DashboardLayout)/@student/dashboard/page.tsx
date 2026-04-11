import { getStudentAnalytics } from '@/actions/analytics.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const StudentDashboard = async () => {
  const { data: booking } = await getStudentAnalytics();
  const summary = booking ?? {
    totalBookings: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Monitor your session booking lifecycle in one place.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Bookings Overview</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Total</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {summary.totalBookings}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Pending</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {summary.pending}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Confirmed</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {summary.confirmed}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Completed</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {summary.completed}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Cancelled</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {summary.cancelled}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
