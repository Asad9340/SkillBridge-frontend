import { cookies } from 'next/headers';
import { env } from '../../env';

const AUTH_URL = env.AUTH_URL;
let hasLoggedAuthUnavailable = false;

export const userService = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: 'no-store',
      });

      if (!res.ok) {
        return {
          data: null,
          error: new Error(`Session request failed: ${res.status}`),
        };
      }

      const session = await res.json();
      return { data: session, error: null };
    } catch (error) {
      if (!hasLoggedAuthUnavailable) {
        hasLoggedAuthUnavailable = true;
        console.warn(
          'Auth session endpoint unavailable. Continuing without session.',
        );
      }
      return { data: null, error };
    }
  },
};
