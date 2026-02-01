import { getStudentAnalytics } from '@/actions/analytics.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentDashboard = async () => {
  const { data: booking } = await getStudentAnalytics();

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      <div>
        <h2 className="text-lg font-semibold mb-4">Bookings</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Total</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {booking.totalBookings}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {booking.pending}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confirmed</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {booking.confirmed}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {booking.completed}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cancelled</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {booking.cancelled}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
