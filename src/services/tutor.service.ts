/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers';
import { env } from '../../env';
import { updateTag } from 'next/cache';

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
export interface GetTutorsParams {
  search?: string;
  category?: string;
  subject?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  page?: string;
  limit?: string;
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

  UpdateTutorProfile: async (
    id: string,
    payload: { bio: string; hourlyRate: number },
  ) => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/tutors-profile/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieStore.toString(),
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
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/tutors-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('tutor-profile');
    return { success: true };
  },
};
