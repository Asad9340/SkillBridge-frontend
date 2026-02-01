import { cookies } from 'next/headers';
import { env } from '../../env';

const API_URL = env.API_URL;

export const ReviewService = {
  getAllReviewByTutorId: async (tutorId:string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/reviews/${tutorId}`, {
        headers: { cookie: cookieStore.toString() },
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

  createReview: async (payload: {
    tutorId: string;
    rating: number;
    comment: string;
  }) => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    return { success: true };
  },
};
