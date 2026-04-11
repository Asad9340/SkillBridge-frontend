import { z } from 'zod';

export const loginZodSchema = z.object({
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters'),
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;

export const registerZodSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters'),
});

export type IRegisterPayload = z.infer<typeof registerZodSchema>;

export const verifyEmailOtpZodSchema = z.object({
  email: z.email('Invalid email address'),
  otp: z.string().regex(/^\d{6}$/, 'OTP must be a 6-digit numeric code'),
});

export const resendEmailOtpZodSchema = z.object({
  email: z.email('Invalid email address'),
});

export type IVerifyEmailOtpPayload = z.infer<typeof verifyEmailOtpZodSchema>;
export type IResendEmailOtpPayload = z.infer<typeof resendEmailOtpZodSchema>;
