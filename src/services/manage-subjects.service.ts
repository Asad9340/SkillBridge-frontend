import { env } from '../../env';
import { updateTag } from 'next/cache';
import { getCookieString } from '@/lib/cookieString';

const API_URL = env.API_URL;

export const manageSubjectService = {
  getAllSubjects: async () => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/subjects`, {
        headers: { cookie },
        cache: 'no-store',
        next: { tags: ['admin-subjects'] },
      });
      const json = await res.json();
      return json.status === 'success'
        ? { data: json.data, error: null }
        : { data: null, error: json.message };
    } catch (error) {
      return { data: null, error };
    }
  },
  createSubject: async (payload: { name: string; categoryId: string }) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/subjects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('admin-subjects');
    return { success: true };
  },
  updateSubject: async (
    id: string,
    payload: { name: string; categoryId: string },
  ) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/subjects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('admin-subjects');
    return { success: true };
  },
  deleteSubject: async (id: string) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/subjects/${id}`, {
      method: 'DELETE',
      headers: { cookie },
    });
    if (!res.ok) return { success: false };
    updateTag('admin-subjects');
    return { success: true };
  },
};
