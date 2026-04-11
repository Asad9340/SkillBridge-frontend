import { getTutorAnalytics } from '@/actions/analytics.action';
import { DashboardStatistics } from '@/components/modules/dashboard/DashboardStatistics';
import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service';

export const dynamic = 'force-dynamic';

const TutorStatisticsPage = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData?.user;

  if (!userInfo?.id) {
    return <div className="py-10 text-center">No session found.</div>;
  }

  const { data: tutorData } = await tutorService.getTutorProfile(userInfo.id);

  if (!tutorData?.id) {
    return <div className="py-10 text-center">Tutor profile not found.</div>;
  }

  const { data: analytics } = await getTutorAnalytics(tutorData.id);
  const booking = analytics?.bookingSummary;
  const reviews = analytics?.reviewSummary;

  return (
    <DashboardStatistics
      title="Tutor Statistics"
      subtitle="Track session demand and review quality."
      barStats={[
        { label: 'Total Sessions', value: booking?.totalBookings ?? 0 },
        { label: 'Pending', value: booking?.pending ?? 0 },
        { label: 'Confirmed', value: booking?.confirmed ?? 0 },
        { label: 'Completed', value: booking?.completed ?? 0 },
      ]}
      pieStats={[
        { label: 'Reviews', value: reviews?.totalReviews ?? 0 },
        {
          label: 'Avg Rating x10',
          value: Math.round((reviews?.averageRating ?? 0) * 10),
        },
      ]}
    />
  );
};

export default TutorStatisticsPage;
