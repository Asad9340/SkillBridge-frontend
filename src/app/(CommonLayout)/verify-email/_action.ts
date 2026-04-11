/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import {
  IResendEmailOtpPayload,
  IVerifyEmailOtpPayload,
  resendEmailOtpZodSchema,
  verifyEmailOtpZodSchema,
} from '@/zod/auth.validation';
import { redirect } from 'next/navigation';

type ActionResponse = {
  success: boolean;
  message: string;
};

const AUTH_URL =
  process.env.AUTH_URL ||
  process.env.NEXT_PUBLIC_AUTH_BASE_URL ||
  'http://localhost:5000/api/auth';

const VERIFY_EMAIL_ENDPOINTS = ['/verify-email', '/email-otp/verify-email'];
const RESEND_OTP_ENDPOINTS = [
  '/send-verification-email',
  '/email-otp/send-verification-otp',
];

const getErrorMessage = (body: any, fallback: string) => {
  return (
    body?.message ||
    body?.error?.message ||
    body?.error ||
    body?.details ||
    fallback
  );
};

const postToAuthEndpoints = async (
  endpoints: string[],
  payload: Record<string, unknown>,
  defaultError: string,
): Promise<ActionResponse> => {
  let lastErrorMessage = defaultError;

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${AUTH_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => null);

      if (res.ok) {
        return {
          success: true,
          message: body?.message || 'Request completed successfully.',
        };
      }

      if (res.status !== 404) {
        return {
          success: false,
          message: getErrorMessage(body, defaultError),
        };
      }

      lastErrorMessage = getErrorMessage(body, defaultError);
    } catch (error: any) {
      lastErrorMessage = error?.message || defaultError;
    }
  }

  return {
    success: false,
    message: lastErrorMessage,
  };
};

export const verifyEmailOtpAction = async (
  payload: IVerifyEmailOtpPayload,
): Promise<ActionResponse> => {
  const parsedPayload = verifyEmailOtpZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message || 'Invalid OTP payload',
    };
  }

  const response = await postToAuthEndpoints(
    VERIFY_EMAIL_ENDPOINTS,
    {
      email: parsedPayload.data.email,
      otp: parsedPayload.data.otp,
      type: 'email-verification',
    },
    'OTP verification failed',
  );

  if (!response.success) {
    return response;
  }

  redirect('/login?verified=1');
};

export const resendEmailOtpAction = async (
  payload: IResendEmailOtpPayload,
): Promise<ActionResponse> => {
  const parsedPayload = resendEmailOtpZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message:
        parsedPayload.error.issues[0].message || 'Invalid resend OTP payload',
    };
  }

  return postToAuthEndpoints(
    RESEND_OTP_ENDPOINTS,
    {
      email: parsedPayload.data.email,
      type: 'email-verification',
    },
    'Failed to resend OTP',
  );
};
