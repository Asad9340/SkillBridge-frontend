'use server';

import { cookies } from 'next/headers';
import { env } from '../../env';

const API_URL = env.API_URL;

/**
 * Calls the backend /api/v1/auth/refresh-token to issue new custom JWT cookies.
 * The endpoint validates the Better Auth session and sets accessToken + refreshToken cookies.
 */
export async function getNewTokensWithRefreshToken(
  _refreshToken?: string,
): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join('; ');

    const res = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
    });

    return res.ok;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
}

/**
 * Fetches the current user's info from the backend /api/v1/auth/me endpoint.
 * The backend derives the user from the Better Auth session cookie.
 */
export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const sessionToken =
      cookieStore.get('better-auth.session_token')?.value ||
      cookieStore.get('better-auth.session-token')?.value;

    if (!sessionToken) {
      return null;
    }

    const cookieHeader = cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join('; ');

    const res = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json?.data ?? null;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}
