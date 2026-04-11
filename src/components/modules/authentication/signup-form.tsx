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
import { registerZodSchema } from '@/zod/auth.validation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { registerAction } from '@/app/(CommonLayout)/register/_action';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    validators: {
      onChange: registerZodSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      setIsLoading(true);
      const toastId = toast.loading('Creating your account...');
      try {
        const result = await registerAction(value);
        // If we reach here, the action returned an error
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
          toast.success('Account created successfully!', { id: toastId });
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
    const callbackURL = `${process.env.NEXT_PUBLIC_FRONTEND_URL || ''}/dashboard`;
    window.location.href = `${baseUrl}/sign-in/social?provider=google&callbackURL=${encodeURIComponent(callbackURL)}`;
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              validators={{ onChange: registerZodSchema.shape.name }}
            >
              {field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      value={field.state.value}
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
              name="email"
              validators={{ onChange: registerZodSchema.shape.email }}
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
              validators={{ onChange: registerZodSchema.shape.password }}
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
          form="register-form"
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Register'}
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
