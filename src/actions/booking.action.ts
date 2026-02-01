'use server';

import { bookingSessionService } from '@/services/booking.service';

export const getBookingByStudentId = async () =>
  bookingSessionService.getBookingByStudentId();
export const getBookingByTutorId = async (tutorId:string) =>
  bookingSessionService.getBookingByTutorId(tutorId);

export const updateBookingById = async (
  bookingId: string,
  payload: { status: string },
) => bookingSessionService.updateBookingById(bookingId, payload);

export const createBookingSession = async (data: {
  availabilityId: string;
  subjectId: string;
  tutorId: string;
}) => bookingSessionService.createBookingSession(data);
