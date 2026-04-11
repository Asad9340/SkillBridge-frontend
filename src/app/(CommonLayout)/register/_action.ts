/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getDefaultDashboardRoute } from '@/lib/authUtils';
import { serverHttpClient } from '@/lib/axios/serverHttpClient';
import { setTokenInCookies } from '@/lib/tokenUtils';
import { ApiErrorResponse, IRegisterResponse } from '@/types/auth.types';
import { IRegisterPayload, registerZodSchema } from '@/zod/auth.validation';
import { redirect } from 'next/navigation';

export const registerAction = async (
  payload: IRegisterPayload,
): Promise<{ success: boolean; message: string } | ApiErrorResponse> => {
  const parsedPayload = registerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || 'Invalid input';
    return {
      success: false,
      message: firstError,
    };
  }
  try {
    const response = await serverHttpClient.post<IRegisterResponse>(
      '/api/auth/register',
      parsedPayload.data,
      { isAuth: true },
    );

    const { accessToken, refreshToken, token } = response;

    await setTokenInCookies('accessToken', accessToken);
    await setTokenInCookies('refreshToken', refreshToken);
    await setTokenInCookies('better-auth.session_token', token, 24 * 60 * 60);

    redirect(getDefaultDashboardRoute());
  } catch (error: any) {
    if (
      error &&
      typeof error === 'object' &&
      'digest' in error &&
      typeof error.digest === 'string' &&
      error.digest.startsWith('NEXT_REDIRECT')
    ) {
      throw error;
    }

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        'Registration failed',
    };
  }
};
