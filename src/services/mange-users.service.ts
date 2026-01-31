import { cookies } from 'next/headers';
import { env } from '../../env';

const API_URL = env.API_URL;
export const manageUserService = {
  getAllUsersByAdmin: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/manage-users`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: 'no-store',
        next: {
          tags: ['manage-users'],
        },
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
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/manage-users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          cookie: cookieStore.toString(),
        },
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

  updateUserProfile: async (
    userId: string,
    data: { name: string; image: string; phone: string; bio: string },
  ) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${env.API_URL}/manage-users/update-student/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            cookie: cookieStore.toString(),
          },
          body: JSON.stringify(data),
          cache: 'no-store',
        },
      );
      if (!res.ok) {
        const err = await res.json();
        return { success: false, message: err?.message };
      }
      return { success: true };
    } catch {
      return { success: false, message: 'Something went wrong' };
    }
  },
};
