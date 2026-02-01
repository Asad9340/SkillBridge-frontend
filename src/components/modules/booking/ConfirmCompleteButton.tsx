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

const ConfirmCompleteCancelButton = ({ status, bookingId }: Props) => {
  const router = useRouter();

  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleConfirm = async () => {
    setLoadingConfirm(true);
    const toastId = toast.loading('Confirming booking...');
    try {
      const res = await updateBookingById(bookingId, { status: 'CONFIRMED' });

      if (!res?.success) {
        toast.error('Booking confirmation failed', { id: toastId });
        return;
      }

      toast.success('Booking confirmed!', { id: toastId });
      router.refresh();
    } catch {
      toast.error('Failed to confirm booking', { id: toastId });
    } finally {
      setLoadingConfirm(false);
    }
  };

  const handleComplete = async () => {
    setLoadingComplete(true);
    const toastId = toast.loading('Completing session...');
    try {
      const res = await updateBookingById(bookingId, { status: 'COMPLETED' });

      if (!res?.success) {
        toast.error('Session completion failed', { id: toastId });
        return;
      }

      toast.success('Session marked as completed!', { id: toastId });
      router.refresh();
    } catch {
      toast.error('Failed to complete session', { id: toastId });
    } finally {
      setLoadingComplete(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        className="flex-1"
        onClick={handleConfirm}
        disabled={loadingConfirm || status !== 'PENDING'}
      >
        {loadingConfirm ? 'Confirming...' : 'Confirm'}
      </Button>

      <Button
        className="flex-1"
        onClick={handleComplete}
        disabled={loadingComplete || status !== 'CONFIRMED'}
      >
        {loadingComplete ? 'Completing...' : 'Complete'}
      </Button>

    </div>
  );
};

export default ConfirmCompleteCancelButton;
