'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createBookingSession } from '@/actions/booking.action';

interface Props {
  availabilityId: string;
  tutorId: string;
  subjectId: string;
  isBooked: boolean;
  userRole: string;
}

const BookSessionButton = ({
  availabilityId,
  tutorId,
  subjectId,
  isBooked,
  userRole,
}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleBook = async () => {
    if (isBooked) return;

    setLoading(true);
    const toastId = toast.loading('Booking session...');

    try {
      const payload = {
        tutorId,
        subjectId,
        availabilityId,
      };
      const res = await createBookingSession(payload);
      if (!res?.success) {
        toast.error('Booking failed', { id: toastId });
        setLoading(false);
        return;
      }
      toast.success('Session booked successfully!', { id: toastId });

      router.refresh();
    } catch {
      toast.error('Something went wrong', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full"
      disabled={isBooked || loading || userRole === 'TUTOR'}
      onClick={handleBook}
    >
      {userRole === 'TUTOR'
        ? 'Tutors cannot book sessions'
        : isBooked
          ? 'Already Booked'
          : loading
            ? 'Booking...'
            : 'Book Session'}
    </Button>
  );
};

export default BookSessionButton;
