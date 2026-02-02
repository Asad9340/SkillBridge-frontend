/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBookingByStudentId } from '@/actions/booking.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BookOpen, User } from 'lucide-react';
import ReviewSubmitForm from '@/components/modules/Review/ReviewSubmitForm';

export const dynamic = 'force-dynamic';

const ReviewsPage = async () => {
  const { data: bookings } = await getBookingByStudentId();
  const completedBookings =
    bookings?.filter((b: any) => b.status === 'COMPLETED') || [];

  if (!completedBookings.length) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-2">No completed sessions</h2>
        <p className="text-muted-foreground">
          Complete a session to leave a review.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Leave Reviews</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {completedBookings.map((b: any) => (
          <Card key={b.id} className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-lg">
                {b.subjectName}
                <Badge>COMPLETED</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {b.tutorName}
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(b.date).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {b.startTime} — {b.endTime}
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {b.subjectName}
              </div>

              <ReviewSubmitForm tutorId={b.tutorId} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
