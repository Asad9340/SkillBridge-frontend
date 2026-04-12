/**
 * Server-side helper: returns the current user with FULL profile data.
 * Decodes the accessToken JWT first (fast, no network), then fetches the full
 * profile from /student-profile/:id to get phone, bio, image.
 * Falls back to the Better Auth /get-session endpoint for Google OAuth users.
 */

import { cookies } from 'next/headers';
import { jwtUtils } from './jwtUtils';
import { userService } from '@/services/user.service';
import { env } from '../../env';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
  image: string | null;
  phone: string;
  status: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

async function fetchFullProfile(
  userId: string,
  cookieHeader: string,
): Promise<Partial<SessionUser> | null> {
  try {
    const res = await fetch(`${env.API_URL}/student-profile/${userId}`, {
      headers: { cookie: cookieHeader },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && json.data) return json.data;
  } catch {
    // silently return null if backend unreachable
  }
  return null;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  // ── Strategy 1: decode accessToken JWT ──────────────────────────────────
  const accessToken = cookieStore.get('accessToken')?.value;
  if (accessToken) {
    try {
      const decoded = jwtUtils.decodedToken(accessToken);
      if (decoded?.userId) {
        const userId = decoded.userId as string;

        // Fetch full profile (phone, bio, image) from backend
        const full = await fetchFullProfile(userId, cookieHeader);

        return {
          id: userId,
          name: (full?.name ?? decoded.name ?? '') as string,
          email: (full?.email ?? decoded.email ?? '') as string,
          role: (full?.role ?? decoded.role ?? 'STUDENT') as string,
          emailVerified: (full?.emailVerified ??
            decoded.emailVerified ??
            false) as boolean,
          image: (full?.image ?? null) as string | null,
          phone: (full?.phone ?? '') as string,
          status: (full?.status ?? 'ACTIVE') as string,
          bio: (full?.bio ?? '') as string,
          createdAt: ((full?.createdAt as string) ?? '') as string,
          updatedAt: ((full?.updatedAt as string) ?? '') as string,
        };
      }
    } catch {
      // fall through
    }
  }

  // ── Strategy 2: BetterAuth /get-session (Google OAuth fallback) ──────────
  try {
    const { data } = await userService.getSession();
    if (data?.user) {
      const u = data.user;
      const userId = u.id as string;

      const full = await fetchFullProfile(userId, cookieHeader);

      return {
        id: userId,
        name: (full?.name ?? u.name ?? '') as string,
        email: (full?.email ?? u.email ?? '') as string,
        role: (full?.role ?? u.role ?? 'STUDENT') as string,
        emailVerified: (full?.emailVerified ??
          u.emailVerified ??
          false) as boolean,
        image: (full?.image ?? u.image ?? null) as string | null,
        phone: (full?.phone ?? '') as string,
        status: (full?.status ?? u.status ?? 'ACTIVE') as string,
        bio: (full?.bio ?? '') as string,
        createdAt: ((full?.createdAt as string) ?? '') as string,
        updatedAt: ((full?.updatedAt as string) ?? '') as string,
      };
    }
  } catch {
    // silently return null
  }

  return null;
}
