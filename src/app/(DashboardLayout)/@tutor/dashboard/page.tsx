import { getTutorAnalytics } from '@/actions/analytics.action';
import { tutorService } from '@/services/tutor.service';
import { getSessionUser } from '@/lib/getSessionUser';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const TutorDashboard = async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser?.id) {
    return <div className="py-10 text-center">No session found.</div>;
  }

  const userId = sessionUser.id;

  const { data: tutorData } = await tutorService.ensureTutorProfile(userId);
  if (!tutorData?.id) {
    return (
      <div className="py-10 text-center">
        Unable to load tutor profile. Please try again.
      </div>
    );
  }

  const { data: analytics } = await getTutorAnalytics(tutorData.id);
  const booking = analytics?.bookingSummary ?? {
    totalBookings: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };
  const reviews = analytics?.reviewSummary ?? {
    totalReviews: 0,
    averageRating: 0,
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Track your session demand and feedback performance.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Bookings Overview</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Total</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {booking.totalBookings}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Pending</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {booking.pending}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Confirmed</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {booking.confirmed}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Completed</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {booking.completed}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
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
        <h2 className="text-lg font-semibold mb-4">Review Performance</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Total Reviews</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {reviews.totalReviews}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Average Rating</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {reviews.averageRating}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
