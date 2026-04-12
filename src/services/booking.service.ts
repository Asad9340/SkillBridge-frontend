import { env } from '../../env';
import { updateTag } from 'next/cache';
import { getCookieString } from '@/lib/cookieString';

const API_URL = env.API_URL;

export const bookingSessionService = {
  getBookingByStudentId: async () => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/booking-session`, {
        headers: { cookie },
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
  getBookingByTutorId: async (tutorId: string) => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/booking-session/${tutorId}`, {
        headers: { cookie },
        cache: 'no-store',
        next: { tags: ['all-tutor-booking'] },
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
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/tutors-profile/${userId}`, {
        headers: { cookie },
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
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/booking-session/${bookingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie,
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
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/booking-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    return { success: true };
  },
};
