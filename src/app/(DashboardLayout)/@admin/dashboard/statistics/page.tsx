import { getAdminAnalytics } from '@/actions/analytics.action';
import { getAllUsersByAdmin } from '@/actions/manage-users.action';
import { DashboardStatistics } from '@/components/modules/dashboard/DashboardStatistics';

export const dynamic = 'force-dynamic';

const AdminStatisticsPage = async () => {
  const [{ data: analytics }, { data: usersData }] = await Promise.all([
    getAdminAnalytics(),
    getAllUsersByAdmin(),
  ]);

  const booking = analytics?.bookingSummary;
  const users = Array.isArray(usersData)
    ? (usersData as Array<{ role?: string | null }>)
    : [];

  const tutors = users.filter(user => user.role === 'TUTOR').length;
  const students = users.filter(user => user.role === 'STUDENT').length;

  return (
    <DashboardStatistics
      title="Admin Statistics"
      subtitle="Operational insights for user and tutor management."
      barStats={[
        { label: 'Total Bookings', value: booking?.totalBookings ?? 0 },
        { label: 'Pending', value: booking?.pending ?? 0 },
        { label: 'Confirmed', value: booking?.confirmed ?? 0 },
        { label: 'Completed', value: booking?.completed ?? 0 },
      ]}
      pieStats={[
        { label: 'Tutors', value: tutors },
        { label: 'Students', value: students },
      ]}
    />
  );
};

export default AdminStatisticsPage;
