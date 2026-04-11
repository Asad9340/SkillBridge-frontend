/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useForm } from '@tanstack/react-form';
import {
  resendEmailOtpZodSchema,
  verifyEmailOtpZodSchema,
} from '@/zod/auth.validation';
import { toast } from 'sonner';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

interface VerifyEmailFormProps extends React.ComponentProps<typeof Card> {
  initialEmail?: string;
}

const RESEND_COOLDOWN_SECONDS = 60;

const getAuthBaseUrl = () =>
  process.env.NEXT_PUBLIC_AUTH_BASE_URL ||
  'https://skill-bridge-backend-nine.vercel.app/api/auth';

const parseJsonSafe = async (res: Response) => {
  const text = await res.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

export function VerifyEmailForm({
  initialEmail,
  ...props
}: VerifyEmailFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  const emailFromQuery = useMemo(
    () => initialEmail?.trim() || '',
    [initialEmail],
  );

  useEffect(() => {
    if (resendCountdown <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setResendCountdown(value => {
        if (value <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [resendCountdown]);

  const form = useForm({
    defaultValues: {
      email: emailFromQuery,
      otp: '',
    },
    validators: {
      onChange: verifyEmailOtpZodSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setIsSubmitting(true);
      const toastId = toast.loading('Verifying OTP...');

      try {
        const res = await fetch(`${getAuthBaseUrl()}/email-otp/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: value.email,
            otp: value.otp,
            type: 'email-verification',
          }),
        });

        const result = (await parseJsonSafe(res)) as any;

        if (!res.ok) {
          const message = result?.message || 'OTP verification failed';
          toast.error(message, {
            id: toastId,
          });
          setServerError(message);
          setIsSubmitting(false);
          return;
        }

        toast.success(result.message || 'Email verified successfully!', {
          id: toastId,
        });
        router.push('/login?verified=1');
        router.refresh();
      } catch (error: any) {
        toast.error('Something went wrong. Please try again.', {
          id: toastId,
        });
        setServerError('Something went wrong. Please try again.');
        setIsSubmitting(false);
      }
    },
  });

  const handleResendOtp = async () => {
    setServerError(null);
    const values = form.state.values;

    const parsed = resendEmailOtpZodSchema.safeParse({ email: values.email });
    if (!parsed.success) {
      setServerError(parsed.error.issues[0].message || 'Invalid email');
      return;
    }

    setIsResending(true);
    const toastId = toast.loading('Resending OTP...');

    try {
      const res = await fetch(
        `${getAuthBaseUrl()}/email-otp/send-verification-otp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: values.email,
            type: 'email-verification',
          }),
        },
      );

      const result = (await parseJsonSafe(res)) as any;

      if (!res.ok) {
        const message = result?.message || 'Failed to resend OTP';
        toast.error(message, { id: toastId });
        setServerError(message);
        setIsResending(false);
        return;
      }

      toast.success(result.message || 'OTP sent successfully!', {
        id: toastId,
      });
      setResendCountdown(RESEND_COOLDOWN_SECONDS);
    } catch {
      toast.error('Something went wrong. Please try again.', { id: toastId });
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter the 6-digit OTP we sent to your email address.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="verify-email-form"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              validators={{ onChange: verifyEmailOtpZodSchema.shape.email }}
            >
              {field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="otp"
              validators={{ onChange: verifyEmailOtpZodSchema.shape.otp }}
            >
              {field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>OTP</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter 6-digit code"
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      autoComplete="one-time-code"
                      onChange={e => {
                        const numericOnly = e.target.value.replace(/\D/g, '');
                        field.handleChange(numericOnly);
                      }}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>

        {serverError && (
          <div className="mt-4 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
            {serverError}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button
          form="verify-email-form"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Verifying...' : 'Verify Email'}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleResendOtp}
          disabled={isResending || resendCountdown > 0}
        >
          {isResending
            ? 'Sending...'
            : resendCountdown > 0
              ? `Resend OTP in ${resendCountdown}s`
              : 'Resend OTP'}
        </Button>
      </CardFooter>
    </Card>
  );
}
