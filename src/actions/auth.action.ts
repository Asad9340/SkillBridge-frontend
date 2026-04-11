'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { env } from '../../env';

export async function logoutAction(): Promise<never> {
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get('better-auth.session_token')?.value ||
    cookieStore.get('better-auth.session-token')?.value;

  // Tell BetterAuth to invalidate the session on the backend
  if (sessionToken) {
    try {
      await fetch(`${env.AUTH_URL}/sign-out`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `better-auth.session_token=${sessionToken}`,
          Origin: env.FRONTEND_URL,
        },
      });
    } catch {
      // Best effort — proceed with local cookie deletion regardless
    }
  }

  // Clear all auth cookies from the Next.js server cookie store
  cookieStore.delete('better-auth.session_token');
  cookieStore.delete('better-auth.session-token');
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  redirect('/login');
}
