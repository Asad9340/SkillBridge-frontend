/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBookingByStudentId } from '@/actions/booking.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import AttendCancelButton from '@/components/modules/booking/AttendCancelButton';

const MyBookingPage = async () => {
  const { data: bookings } = await getBookingByStudentId();

  if (!bookings?.length) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-2">No bookings yet</h2>
        <p className="text-muted-foreground">
          Book a tutor session to see it here.
        </p>
      </div>
    );
  }

  const now = new Date();
  const upcomingBookings = bookings.filter(
    (b: any) =>
      new Date(b.date) >= now &&
      (b.status === 'PENDING' || b.status === 'CONFIRMED'),
  );
  const pastBookings = bookings.filter((b: any) => new Date(b.date) < now);

  const renderBookingCard = (b: any) => (
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
          Tutor: {b.tutorName}
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {new Date(b.date).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {b.startTime} — {b.endTime}
        </div>
        <AttendCancelButton status={b.status} bookingId={b.id} />
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-10 space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">Upcoming Bookings</h2>
        {upcomingBookings.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingBookings.map(renderBookingCard)}
          </div>
        ) : (
          <p className="text-muted-foreground">No upcoming bookings</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Past Bookings</h2>
        {pastBookings.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastBookings.map(renderBookingCard)}
          </div>
        ) : (
          <p className="text-muted-foreground">No past bookings</p>
        )}
      </div>
    </div>
  );
};

export default MyBookingPage;
