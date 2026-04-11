import { getAdminAnalytics } from '@/actions/analytics.action';
import { getAllUsersByAdmin } from '@/actions/manage-users.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const SystemMetricsPage = async () => {
  const [{ data: analytics }, { data: usersData }] = await Promise.all([
    getAdminAnalytics(),
    getAllUsersByAdmin(),
  ]);

  const booking = analytics?.bookingSummary;
  const users = Array.isArray(usersData)
    ? (usersData as Array<{ status?: string | null; role?: string | null }>)
    : [];

  const activeUsers = users.filter(user => user.status === 'ACTIVE').length;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-bold">System Metrics</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {users.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {activeUsers}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Tutors</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {analytics?.totalTutors ?? 0}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {booking?.totalBookings ?? 0}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemMetricsPage;
