'use server';

import { redirect } from 'next/navigation';
import { setTokenInCookies } from '@/lib/tokenUtils';
import { env } from '../../../../env';

export async function loginAction(
  payload: { email: string; password: string },
  redirectPath?: string,
): Promise<{ success: boolean; message: string } | never> {
  let res: Response;
  try {
    res = await fetch(`${env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: env.FRONTEND_URL,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      success: false,
      message: 'Unable to reach the server. Please try again.',
    };
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      success: false,
      message: data?.message || 'Login failed. Please check your credentials.',
    };
  }

  const { accessToken, refreshToken, token } = data?.data ?? {};

  if (!token) {
    return {
      success: false,
      message: 'Authentication failed. No session token received.',
    };
  }

  if (accessToken) await setTokenInCookies('accessToken', accessToken);
  if (refreshToken) await setTokenInCookies('refreshToken', refreshToken);
  await setTokenInCookies('better-auth.session_token', token);

  redirect(redirectPath && redirectPath !== '/' ? redirectPath : '/dashboard');
}
