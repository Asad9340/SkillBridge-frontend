import { getAdminAnalytics } from '@/actions/analytics.action';
import { getAllUsersByAdmin } from '@/actions/manage-users.action';
import { DashboardStatistics } from '@/components/modules/dashboard/DashboardStatistics';

export const dynamic = 'force-dynamic';

const SuperAdminStatisticsPage = async () => {
  const [{ data: analytics }, { data: usersData }] = await Promise.all([
    getAdminAnalytics(),
    getAllUsersByAdmin(),
  ]);

  const booking = analytics?.bookingSummary;
  const users = Array.isArray(usersData)
    ? (usersData as Array<{ role?: string | null }>)
    : [];

  const roleCounts = users.reduce<Record<string, number>>((acc, user) => {
    const role = user.role ?? 'UNKNOWN';
    acc[role] = (acc[role] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <DashboardStatistics
      title="Super Admin Statistics"
      subtitle="Platform-wide role and booking distribution insights."
      barStats={[
        { label: 'Total Users', value: users.length },
        { label: 'Total Tutors', value: analytics?.totalTutors ?? 0 },
        { label: 'Total Students', value: analytics?.totalStudents ?? 0 },
        { label: 'Total Bookings', value: booking?.totalBookings ?? 0 },
      ]}
      pieStats={Object.entries(roleCounts)
        .slice(0, 5)
        .map(([label, value]) => ({ label, value }))}
    />
  );
};

export default SuperAdminStatisticsPage;
