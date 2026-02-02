import { getAdminAnalytics } from '@/actions/analytics.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const AdminDashboard = async () => {
  const { data: analytics } = await getAdminAnalytics();
  const booking = analytics.bookingSummary;
  const totalTutors = analytics.totalTutors;
  const totalStudents = analytics.totalStudents;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

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

      <div>
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Total Tutors</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {totalTutors}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {totalStudents}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
