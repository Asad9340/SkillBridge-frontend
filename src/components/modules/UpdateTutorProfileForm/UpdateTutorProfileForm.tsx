'use client';

import { ITutorProfile } from '@/types';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { toast } from 'sonner';
import { UpdateTutorProfile } from '@/actions/manage-tutor.action';
import { useRouter } from 'next/navigation';

const profileSchema = z.object({
  id: z.string(),
  bio: z.string().min(1, 'Bio is required'),
  hourlyRate: z.string().min(1, 'Hourly Rate is required'),
});

const UpdateTutorProfileForm = ({ tutor }: { tutor: ITutorProfile }) => {
    const router = useRouter();
  const form = useForm({
    defaultValues: {
      id: tutor.id,
      bio: tutor.bio || '',
      hourlyRate: tutor.hourlyRate?.toString() || '',
    },
    validators: { onSubmit: profileSchema },
    onSubmit: async ({ value }) => {
      const id = value.id;
      const data = {
        bio: value.bio,
        hourlyRate: Number(value.hourlyRate),
      };
      const toastId = toast.loading('Updating Profile...');
      try {
        const res = await UpdateTutorProfile(id, data);
        if (!res.success) {
          toast.error('Operation failed', { id: toastId });
          return;
        }
        toast.success('Successfully updated profile', { id: toastId });
        router.push('/dashboard/profile')
      } catch {
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Update Profile</CardTitle>
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
              <Input value={tutor.name} disabled className="bg-muted/50" />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={tutor.email} disabled className="bg-muted/50" />
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
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateTutorProfileForm;
