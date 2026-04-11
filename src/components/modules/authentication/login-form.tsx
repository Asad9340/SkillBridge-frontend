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
import { loginZodSchema } from '@/zod/auth.validation';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { loginAction } from '@/app/(CommonLayout)/login/_action';

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const redirectPath = searchParams?.get('redirect') || '/dashboard';

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginZodSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setIsLoading(true);
      const toastId = toast.loading('Logging in your account...');
      try {
        const result = await loginAction(value, redirectPath);
        // If we reach here, the action returned an error (redirect throws, not returns)
        if (result && !result.success) {
          toast.error(result.message, { id: toastId });
          setServerError(result.message);
          setIsLoading(false);
        }
      } catch (error: any) {
        // NEXT_REDIRECT is thrown by redirect() — let Next.js handle navigation
        if (
          error?.digest?.startsWith('NEXT_REDIRECT') ||
          error?.message === 'NEXT_REDIRECT'
        ) {
          toast.success('Logged in successfully!', { id: toastId });
          throw error;
        }
        toast.error('Something went wrong. Please try again.', { id: toastId });
        setServerError('Something went wrong. Please try again.');
        setIsLoading(false);
      }
    },
  });

  const handleGoogleLogin = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_AUTH_BASE_URL ||
      'https://skill-bridge-backend-nine.vercel.app/api/auth';
    const callbackURL =
      redirectPath && redirectPath !== '/'
        ? `${process.env.NEXT_PUBLIC_FRONTEND_URL || ''}${redirectPath}`
        : `${process.env.NEXT_PUBLIC_FRONTEND_URL || ''}/dashboard`;
    window.location.href = `${baseUrl}/sign-in/social?provider=google&callbackURL=${encodeURIComponent(callbackURL)}`;
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              validators={{ onChange: loginZodSchema.shape.email }}
            >
              {field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
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
              name="password"
              validators={{ onChange: loginZodSchema.shape.password }}
            >
              {field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                        onChange={e => field.handleChange(e.target.value)}
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword(value => !value)}
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-2 -translate-y-1/2"
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" aria-hidden="true" />
                        ) : (
                          <Eye className="size-4" aria-hidden="true" />
                        )}
                      </Button>
                    </div>
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
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm">
            {serverError}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button
          form="login-form"
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleGoogleLogin()}
          type="button"
          disabled={isLoading}
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
