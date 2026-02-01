import { cookies } from 'next/headers';
import { env } from '../../env';

const API_URL = env.API_URL;

export const AnalyticsService = {
  getTutorAnalytics: async (tutorId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/analytics/tutor/${tutorId}`, {
        headers: { cookie: cookieStore.toString() },
        cache: 'no-store',
        next: { tags: ['analytics-tutor'] },
      });
      if (!res.ok) {
        return { data: null, error: 'Failed to fetch analytics' };
      }
      const json = await res.json();
      return json.success === true
        ? { data: json.data, error: null }
        : { data: null, error: json.message };
    } catch (error) {
      return { data: null, error };
    }
  },
  getStudentAnalytics: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/analytics/student`, {
        headers: { cookie: cookieStore.toString() },
        cache: 'no-store',
        next: { tags: ['analytics-student'] },
      });
      if (!res.ok) {
        return { data: null, error: 'Failed to fetch analytics' };
      }
      const json = await res.json();
      return json.success === true
        ? { data: json.data, error: null }
        : { data: null, error: json.message };
    } catch (error) {
      return { data: null, error };
    }
  },
  getAdminAnalytics: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/analytics/admin`, {
        headers: { cookie: cookieStore.toString() },
        cache: 'no-store',
        next: { tags: ['analytics-admin'] },
      });
      if (!res.ok) {
        return { data: null, error: 'Failed to fetch analytics' };
      }
      const json = await res.json();
      return json.success === true
        ? { data: json.data, error: null }
        : { data: null, error: json.message };
    } catch (error) {
      return { data: null, error };
    }
  },
};
