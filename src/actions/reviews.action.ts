'use server';

import { bookingSessionService } from '@/services/booking.service';
import { ReviewService } from '@/services/reviews.service';

export const getAllReviewByTutorId = async (tutorId: string) =>
  ReviewService.getAllReviewByTutorId(tutorId);
export const GetAllRatingPublic = async () =>
  ReviewService.GetAllRatingPublic();

export const updateBookingById = async (
  bookingId: string,
  payload: { status: string },
) => bookingSessionService.updateBookingById(bookingId, payload);

export const createReview = async (payload: {
  tutorId: string;
  rating: number;
  comment: string;
}) => ReviewService.createReview(payload);
