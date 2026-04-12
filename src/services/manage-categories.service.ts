import { env } from '../../env';
import { updateTag } from 'next/cache';
import { getCookieString } from '@/lib/cookieString';

const API_URL = env.API_URL;

export const manageCategoryService = {
  getAllCategories: async () => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/categories`, {
        headers: { cookie },
        cache: 'no-store',
        next: { tags: ['admin-categories'] },
      });
      const json = await res.json();
      if (json.success) {
        return { data: json.data, error: null };
      }
      return { data: null, error: json.message };
    } catch (error) {
      return { data: null, error };
    }
  },
  createCategory: async (payload: { name: string; description?: string }) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('admin-categories');
    return { success: true };
  },
  updateCategory: async (
    id: string,
    payload: { name: string; description?: string },
  ) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false };
    updateTag('admin-categories');
    return { success: true };
  },
  deleteCategory: async (id: string) => {
    const cookie = await getCookieString();
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: { cookie },
    });
    if (!res.ok) return { success: false };
    updateTag('admin-categories');
    return { success: true };
  },
};
