import { env } from '../../env';
import { getCookieString } from '@/lib/cookieString';

const API_URL = env.API_URL;

export const ReviewService = {
  getAllReviewByTutorId: async (tutorId: string) => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/reviews/${tutorId}`, {
        headers: { cookie },
        cache: 'no-store',
        next: { tags: ['all-review'] },
      });
      if (!res.ok) {
        return { data: null, error: 'Failed to fetch review data' };
      }
      const json = await res.json();
      return json.success === true
        ? { data: json.data, error: null }
        : { data: null, error: json.message };
    } catch (error) {
      return { data: null, error };
    }
  },
  GetAllRatingPublic: async () => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/reviews/`, {
        headers: { cookie },
        cache: 'no-store',
        next: { tags: ['all-review-public'] },
      });
      if (!res.ok) {
        return { data: null, error: 'Failed to fetch review data' };
      }
      const json = await res.json();
      return json.success === true
        ? { data: json.data, error: null }
        : { data: null, error: json.message };
    } catch (error) {
      return { data: null, error };
    }
  },

  createReview: async (payload: {
    tutorId: string;
    rating: number;
    comment: string;
  }) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/reviews`, {
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
