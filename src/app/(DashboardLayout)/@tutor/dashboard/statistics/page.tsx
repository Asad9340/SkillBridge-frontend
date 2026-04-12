import { getTutorAnalytics } from '@/actions/analytics.action';
import { DashboardStatistics } from '@/components/modules/dashboard/DashboardStatistics';
import { tutorService } from '@/services/tutor.service';
import { getSessionUser } from '@/lib/getSessionUser';

export const dynamic = 'force-dynamic';

const TutorStatisticsPage = async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser?.id) {
    return <div className="py-10 text-center">No session found.</div>;
  }

  const { data: tutorData } = await tutorService.ensureTutorProfile(
    sessionUser.id,
  );

  if (!tutorData?.id) {
    return (
      <div className="py-10 text-center">
        Unable to load tutor profile. Please try again.
      </div>
    );
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
