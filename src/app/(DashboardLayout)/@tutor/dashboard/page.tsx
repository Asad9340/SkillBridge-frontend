import { getTutorAnalytics } from '@/actions/analytics.action';
import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TutorDashboard = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData.user;

  const { data: tutorData } = await tutorService.getTutorProfile(userInfo.id);
  const { data: analytics } = await getTutorAnalytics(tutorData.id);

  const booking = analytics.bookingSummary;
  const reviews = analytics.reviewSummary;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-bold">Tutor Dashboard</h1>

      
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
        <h2 className="text-lg font-semibold mb-4">Reviews</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Total Reviews</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {reviews.totalReviews}
            </CardContent>
          </Card>

          <Card>
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
