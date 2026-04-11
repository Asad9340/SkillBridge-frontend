import { getAdminAnalytics } from '@/actions/analytics.action';
import { getAllUsersByAdmin } from '@/actions/manage-users.action';
import { DashboardStatistics } from '@/components/modules/dashboard/DashboardStatistics';

export const dynamic = 'force-dynamic';

const ManagerStatisticsPage = async () => {
  const [{ data: analytics }, { data: usersData }] = await Promise.all([
    getAdminAnalytics(),
    getAllUsersByAdmin(),
  ]);

  const booking = analytics?.bookingSummary;
  const users = Array.isArray(usersData)
    ? (usersData as Array<{ status?: string | null; role?: string | null }>)
    : [];

  const activeUsers = users.filter(user => user.status === 'ACTIVE').length;
  const inactiveUsers = users.filter(user => user.status === 'INACTIVE').length;
  const suspendedUsers = users.filter(
    user => user.status === 'SUSPENDED',
  ).length;

  return (
    <DashboardStatistics
      title="Manager Statistics"
      subtitle="Team and booking trend snapshot for day-to-day operations."
      barStats={[
        { label: 'Total Bookings', value: booking?.totalBookings ?? 0 },
        { label: 'Pending', value: booking?.pending ?? 0 },
        { label: 'Confirmed', value: booking?.confirmed ?? 0 },
        { label: 'Cancelled', value: booking?.cancelled ?? 0 },
      ]}
      pieStats={[
        { label: 'Active', value: activeUsers },
        { label: 'Inactive', value: inactiveUsers },
        { label: 'Suspended', value: suspendedUsers },
      ]}
    />
  );
};

export default ManagerStatisticsPage;
