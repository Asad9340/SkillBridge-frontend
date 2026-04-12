import { env } from '../../env';
import { getCookieString } from '@/lib/cookieString';

const API_URL = env.API_URL;

export const AnalyticsService = {
  getTutorAnalytics: async (tutorId: string) => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/analytics/tutor/${tutorId}`, {
        headers: { cookie },
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
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/analytics/student`, {
        headers: { cookie },
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
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/analytics/admin`, {
        headers: { cookie },
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
  getAdminAIInsights: async () => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/analytics/admin/ai-insights`, {
        headers: { cookie },
        cache: 'no-store',
        next: { tags: ['analytics-admin-ai'] },
      });

      if (!res.ok) {
        return { data: null, error: 'Failed to fetch AI admin insights' };
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
