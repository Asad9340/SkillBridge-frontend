import { cookies } from 'next/headers';
import { env } from '../../env';
import { updateTag } from 'next/cache';

const API_URL = env.API_URL;

export const bookingSessionService = {
  getBookingByStudentId: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/booking-session`, {
        headers: { cookie: cookieStore.toString() },
        cache: 'no-store',
        next: { tags: ['all-booking'] },
      });
      if (!res.ok) {
        return { data: null, error: 'Failed to fetch booking details' };
      }
      const json = await res.json();
      return json.success === true
        ? { data: json.data, error: null }
        : { data: null, error: json.message };
    } catch (error) {
      return { data: null, error };
    }
  },
  getTutorProfile: async (userId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/tutors-profile/${userId}`, {
        headers: { cookie: cookieStore.toString() },
        cache: 'no-store',
        next: { tags: ['tutor-profile'] },
      });

      if (!res.ok) {
        return { data: null, error: 'Failed to fetch tutor profile' };
      }
      const json = await res.json();
      return json.success === true
        ? { data: json.data, error: null }
        : { data: null, error: json.message };
    } catch (error) {
      return { data: null, error };
    }
  },

  updateBookingById: async (bookingId: string, payload: { status: string }) => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/booking-session/${bookingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('all-booking');
    return { success: true };
  },

  createBookingSession: async (payload: {
    availabilityId: string;
    subjectId: string;
    tutorId: string;
  }) => {
    console.log(payload);
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/booking-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    console.log(res);
    if (!res.ok) return { success: false };
    return { success: true };
  },
};
