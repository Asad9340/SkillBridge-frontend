'use client';

import { useForm } from '@tanstack/react-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { toast } from 'sonner';
import { createTutorProfile } from '@/actions/manage-tutor.action';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

const profileSchema = z.object({
  userId: z.string(),
  bio: z.string().min(1, 'Bio is required'),
  hourlyRate: z.string().min(1, 'Hourly Rate is required'),
});

const JoinAsTutor = ({userInfo}: {userInfo:User}) => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      userId: userInfo.id,
      bio: '',
      hourlyRate: '',
    },
    validators: { onSubmit: profileSchema },
    onSubmit: async ({ value }) => {
      const data = {
        userId: userInfo.id,
        bio: value.bio,
        hourlyRate: Number(value.hourlyRate),
      };
      const toastId = toast.loading('Creating Tutor Profile...');
      try {
        const res = await createTutorProfile(data);
        if (!res.success) {
          toast.error('Operation failed', { id: toastId });
          return;
        }
        toast.success('Successfully created tutor profile', { id: toastId });
        router.push('/dashboard/profile');
      } catch {
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Join as Tutor</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form
            onSubmit={e => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={userInfo.name} disabled className="bg-muted/50" />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={userInfo.email} disabled className="bg-muted/50" />
            </div>

            <div className="space-y-2">
              <form.Field name="bio">
                {field => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel>Bio *</FieldLabel>
                      <Textarea
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Tell us about your teaching experience..."
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            <div className="space-y-2">
              <form.Field name="hourlyRate">
                {field => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel>Hourly Rate *</FieldLabel>
                      <Input
                        id="hourlyRate"
                        type="number"
                        aria-invalid={isInvalid}
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        placeholder="200"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            <Button type="submit" className="w-full">
              Join as Tutor
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinAsTutor;
