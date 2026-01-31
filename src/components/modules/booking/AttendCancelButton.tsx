'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateBookingById } from '@/actions/booking.action';

interface Props {
  status: string;
  bookingId: string;
}

const AttendCancelButton = ({ status, bookingId }: Props) => {
  const router = useRouter();
  const [loadingAttend, setLoadingAttend] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

  const handleAttend = async () => {
    setLoadingAttend(true);
    const toastId = toast.loading('Marking session as attended...');
    try {
      const payload = { status: 'COMPLETED' };
      const res = await updateBookingById(bookingId, payload);
      if (!res?.success) {
        toast.error('Attending session failed', { id: toastId });
        setLoadingAttend(false);
        return;
      }
      toast.success('Session marked as attended!', { id: toastId });
      router.refresh();
    } catch {
      toast.error('Failed to mark session as attended', { id: toastId });
    } finally {
      setLoadingAttend(false);
    }
  };

  const handleCancel = async () => {
    setLoadingCancel(true);
    const toastId = toast.loading('Cancelling booking...');
    try {
      const payload = { status: 'CANCELED' };
      const res = await updateBookingById(bookingId, payload);
      if (!res?.success) {
        toast.error('Booking failed', { id: toastId });
        setLoadingCancel(false);
        return;
      }

      toast.success('Booking cancelled!', { id: toastId });
      router.refresh();
    } catch {
      toast.error('Failed to cancel booking', { id: toastId });
    } finally {
      setLoadingCancel(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        className="flex-1"
        onClick={handleAttend}
        disabled={loadingAttend || status !== 'CONFIRMED'}
      >
        {loadingAttend
          ? 'Attending...'
          : status !== 'CONFIRMED'
            ? 'Attend (Not Confirmed)'
            : 'Attend'}
      </Button>

      <Button
        className="flex-1"
        variant="destructive"
        onClick={handleCancel}
        disabled={loadingCancel}
      >
        {loadingCancel ? 'Cancelling...' : 'Cancel'}
      </Button>
    </div>
  );
};

export default AttendCancelButton;
