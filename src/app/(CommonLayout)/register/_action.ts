'use server';

import { redirect } from 'next/navigation';
import { setTokenInCookies } from '@/lib/tokenUtils';
import { env } from '../../../../env';

export async function registerAction(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string } | never> {
  let res: Response;
  try {
    res = await fetch(`${env.API_URL}/auth/register`, {
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
      message: data?.message || 'Registration failed. Please try again.',
    };
  }

  const { accessToken, refreshToken, token } = data?.data ?? {};

  if (!token) {
    return {
      success: false,
      message: 'Registration failed. No session token received.',
    };
  }

  if (accessToken) await setTokenInCookies('accessToken', accessToken);
  if (refreshToken) await setTokenInCookies('refreshToken', refreshToken);
  await setTokenInCookies('better-auth.session_token', token);

  redirect('/dashboard');
}
