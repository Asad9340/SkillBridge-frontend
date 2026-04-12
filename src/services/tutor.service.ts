/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from '../../env';
import { updateTag } from 'next/cache';
import { getCookieString } from '@/lib/cookieString';

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
export interface GetTutorsParams {
  search?: string;
  subject?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  rating?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const tutorService = {
  getAllTutors: async function (
    params?: GetTutorsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/tutors-profile`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            url.searchParams.append(key, value);
          }
        });
      }
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ['allTutors'] };
      const res = await fetch(url.toString(), config);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
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

  UpdateTutorProfile: async (
    id: string,
    payload: { bio: string; hourlyRate: number },
  ) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/tutors-profile/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('tutor-profile');
    return { success: true };
  },
  createTutorProfile: async (payload: {
    userId: string;
    bio: string;
    hourlyRate: number;
  }) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/tutors-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('tutor-profile');
    return { success: true };
  },

  /**
   * Returns the TutorProfile for the given userId, auto-creating a default
   * one (hourlyRate: 0) if it does not yet exist in the database.
   * This ensures TUTOR-role users always have a profile to work with.
   */
  ensureTutorProfile: async (userId: string) => {
    try {
      const cookie = await getCookieString();

      // Try to fetch existing profile
      const existing = await fetch(`${API_URL}/tutors-profile/${userId}`, {
        headers: { cookie },
        cache: 'no-store',
      });
      if (existing.ok) {
        const json = await existing.json();
        if (json.success && json.data) return { data: json.data, error: null };
      }

      // Profile not found — create a default one
      const createRes = await fetch(`${API_URL}/tutors-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', cookie },
        body: JSON.stringify({ userId, hourlyRate: 0 }),
        cache: 'no-store',
      });
      if (!createRes.ok) {
        return { data: null, error: 'Failed to create tutor profile' };
      }

      // Fetch the freshly created profile
      const fresh = await fetch(`${API_URL}/tutors-profile/${userId}`, {
        headers: { cookie },
        cache: 'no-store',
      });
      if (!fresh.ok) return { data: null, error: 'Failed to reload profile' };
      const freshJson = await fresh.json();
      return freshJson.success
        ? { data: freshJson.data, error: null }
        : { data: null, error: freshJson.message };
    } catch (error) {
      return { data: null, error };
    }
  },
};
