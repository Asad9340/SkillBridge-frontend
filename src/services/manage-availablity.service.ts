import { cookies } from 'next/headers';
import { env } from '../../env';
import { updateTag } from 'next/cache';

const API_URL = env.API_URL;

export const manageAvailabilityService = {
  getAllAvailability: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/tutors-availability/${id}`, {
        headers: { cookie: cookieStore.toString() },
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
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/tutors-availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('tutor-availability');
    return { success: true };
  },
  updateSubject: async (
    id: string,
    payload: { name: string; categoryId: string },
  ) => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/subjects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('admin-subjects');
    return { success: true };
  },
  deleteSubject: async (id: string) => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/subjects/${id}`, {
      method: 'DELETE',
      headers: { cookie: cookieStore.toString() },
    });
    if (!res.ok) return { success: false };
    updateTag('admin-subjects');
    return { success: true };
  },
};
