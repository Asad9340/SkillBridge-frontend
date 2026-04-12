/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBookingByTutorId } from '@/actions/booking.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { tutorService } from '@/services/tutor.service';
import { getSessionUser } from '@/lib/getSessionUser';
import ConfirmCancelButton from '@/components/modules/booking/ConfirmCompleteButton';

export const dynamic = 'force-dynamic';

const ManageSessionPage = async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser?.id) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        No session found.
      </div>
    );
  }

  const { data: tutorData } = await tutorService.ensureTutorProfile(
    sessionUser.id,
  );
  if (!tutorData?.id) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Unable to load tutor profile. Please try again.
      </div>
    );
  }
  const { data: bookings } = await getBookingByTutorId(tutorData.id);

  if (!bookings?.length) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-2">No bookings yet</h2>
        <p className="text-muted-foreground">
          Students haven’t booked any sessions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Manage Sessions</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b: any) => (
          <Card
            key={b.id}
            className="rounded-2xl shadow-sm hover:shadow-lg transition"
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {b.subjectName}
                <Badge variant="secondary">{b.status}</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Student: {b.studentName ?? 'Student'}
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(b.date).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {b.startTime} — {b.endTime}
              </div>

              <ConfirmCancelButton status={b.status} bookingId={b.id} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageSessionPage;
