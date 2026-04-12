import { env } from '../../env';
import { getCookieString } from '@/lib/cookieString';

const API_URL = env.API_URL;
export const manageUserService = {
  getAllUsersByAdmin: async () => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${API_URL}/manage-users`, {
        headers: { cookie },
        cache: 'no-store',
        next: { tags: ['manage-users'] },
      });
      const userData = await res.json();
      if (userData.success) {
        return { data: userData.data, error: null };
      } else {
        return { data: null, error: 'Something went wrong' };
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return { data: null, error };
    }
  },

  updateUserStatusByAdmin: async (userId: string, status: string) => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${env.API_URL}/manage-users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', cookie },
        body: JSON.stringify({ status }),
        cache: 'no-store',
      });
      if (!res.ok) {
        const err = await res.json();
        return { success: false, message: err?.message };
      }
      return { success: true };
    } catch {
      return { success: false, message: 'Something went wrong' };
    }
  },

  updateUserRoleByAdmin: async (userId: string, role: string) => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${env.API_URL}/manage-users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', cookie },
        body: JSON.stringify({ role }),
        cache: 'no-store',
      });
      if (!res.ok) {
        const err = await res.json();
        return { success: false, message: err?.message };
      }
      return { success: true };
    } catch {
      return { success: false, message: 'Something went wrong' };
    }
  },

  updateUserProfile: async (
    userId: string,
    data: { name: string; phone: string; bio: string; image?: string },
  ) => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(`${env.API_URL}/student-profile/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', cookie },
        body: JSON.stringify(data),
        cache: 'no-store',
      });
      if (!res.ok) {
        const err = await res.json();
        return { success: false, message: err?.message };
      }
      return { success: true };
    } catch {
      return { success: false, message: 'Something went wrong' };
    }
  },

  uploadUserAvatar: async (userId: string, formData: FormData) => {
    try {
      const cookie = await getCookieString();
      const res = await fetch(
        `${env.API_URL}/student-profile/${userId}/avatar`,
        {
          method: 'POST',
          headers: { cookie },
          body: formData,
          cache: 'no-store',
        },
      );
      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: data?.message || 'Failed to upload profile image',
        };
      }
      return { success: true, image: data?.data?.image as string | undefined };
    } catch {
      return { success: false, message: 'Something went wrong' };
    }
  },
};
