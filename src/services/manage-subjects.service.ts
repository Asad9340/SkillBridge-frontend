import { cookies } from 'next/headers';
import { env } from '../../env';
import { updateTag } from 'next/cache';

const API_URL = env.API_URL;

export const manageSubjectService = {
  getAllSubjects: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/subjects`, {
        headers: { cookie: cookieStore.toString() },
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
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/subjects`, {
      method: 'POST',
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
