'use server';

import { bookingSessionService } from '@/services/booking.service';
import { ReviewService } from '@/services/reviews.service';

export const getBookingByStudentId = async () =>
  bookingSessionService.getBookingByStudentId();

export const updateBookingById = async (
  bookingId: string,
  payload: { status: string },
) => bookingSessionService.updateBookingById(bookingId, payload);

export const createReview = async (payload: {
  tutorId: string;
  rating: number;
  comment: string;
}) => ReviewService.createReview(payload);
