/* eslint-disable @typescript-eslint/no-unused-vars */
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
import * as z from 'zod';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Minimum length is 6 character'),
});
export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading('LogIn your account...');
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success('Logged in successfully!', {
          id: toastId,
        });

        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 100);
      } catch (error) {
        toast.error('Something went wrong. Please try again.', { id: toastId });
      }
    },
  });

  const handleGoogleLogin = async () => {
    const callbackURL =
      typeof window !== 'undefined'
        ? `${window.location.origin}${redirectPath}`
        : 'http://localhost:3000';

    try {
      const { error } = await authClient.signIn.social({
        provider: 'google',
        callbackURL,
      });

      if (error) {
        toast.error(
          error.message ||
            'Google login is unavailable. Please check OAuth configuration.',
        );
      }
    } catch {
      toast.error('Google login failed. Please try again.');
    }
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
          id="register-form"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="email">
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

            <form.Field name="password">
              {field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button form="register-form" type="submit" className="w-full">
          Login
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleGoogleLogin()}
          type="button"
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
