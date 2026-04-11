import { getStudentAnalytics } from '@/actions/analytics.action';
import { DashboardStatistics } from '@/components/modules/dashboard/DashboardStatistics';

export const dynamic = 'force-dynamic';

const StudentStatisticsPage = async () => {
  const { data: booking } = await getStudentAnalytics();

  return (
    <DashboardStatistics
      title="Student Statistics"
      subtitle="Personal booking and learning activity overview."
      barStats={[
        { label: 'Total Bookings', value: booking?.totalBookings ?? 0 },
        { label: 'Pending', value: booking?.pending ?? 0 },
        { label: 'Confirmed', value: booking?.confirmed ?? 0 },
        { label: 'Completed', value: booking?.completed ?? 0 },
      ]}
      pieStats={[
        { label: 'Pending', value: booking?.pending ?? 0 },
        { label: 'Confirmed', value: booking?.confirmed ?? 0 },
        { label: 'Completed', value: booking?.completed ?? 0 },
        { label: 'Cancelled', value: booking?.cancelled ?? 0 },
      ]}
    />
  );
};

export default StudentStatisticsPage;
