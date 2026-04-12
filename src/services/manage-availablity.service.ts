import { env } from '../../env';
import { updateTag } from 'next/cache';
import { getCookieString } from '@/lib/cookieString';

const API_URL = env.API_URL;

export const manageAvailabilityService = {
  getAllAvailability: async (id: string) => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/tutors-availability/${id}`, {
        headers: { cookie },
        cache: 'no-store',
        next: { tags: ['tutor-availability'] },
      });
      const json = await res.json();
      return json.success === true
        ? { data: json.data, error: null }
        : { data: null, error: json.message };
    } catch (error) {
      return { data: null, error };
    }
  },
  createAvailability: async (payload: {
    subjectId: string;
    date: string;
    startTime: string;
    endTime: string;
    tutorId: string;
  }) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/tutors-availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('tutor-availability');
    return { success: true };
  },
  updateAvailability: async (
    id: string,
    payload: {
      subjectId: string;
      date: string;
      startTime: string;
      endTime: string;
      tutorId: string;
    },
  ) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/tutors-availability/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('tutor-availability');
    return { success: true };
  },
  deleteAvailability: async (id: string) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/tutors-availability/${id}`, {
      method: 'DELETE',
      headers: { cookie },
    });
    if (!res.ok) return { success: false };
    updateTag('tutor-availability');
    return { success: true };
  },
};
