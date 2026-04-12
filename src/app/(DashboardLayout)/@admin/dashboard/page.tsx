import {
  getAdminAIInsights,
  getAdminAnalytics,
} from '@/actions/analytics.action';
import { getAllUsersByAdmin } from '@/actions/manage-users.action';
import { AdvancedDashboardHome } from '@/components/modules/dashboard/AdvancedDashboardHome';

export const dynamic = 'force-dynamic';

const AdminDashboard = async () => {
  const [{ data: analytics }, { data: usersData }, { data: aiInsightsData }] =
    await Promise.all([
      getAdminAnalytics(),
      getAllUsersByAdmin(),
      getAdminAIInsights(),
    ]);

  const users = Array.isArray(usersData)
    ? (usersData as Array<{
        id: string;
        name?: string | null;
        email?: string | null;
        role?: string | null;
        status?: string | null;
        updatedAt?: string | Date | null;
      }>)
    : [];

  return (
    <AdvancedDashboardHome
      title="Admin Dashboard"
      analytics={analytics}
      users={users}
      aiInsights={aiInsightsData}
    />
  );
};

export default AdminDashboard;
