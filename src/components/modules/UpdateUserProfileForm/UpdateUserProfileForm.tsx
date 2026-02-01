'use client';

import { User } from '@/types';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/actions/manage-users.action';

const schema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  image: z.string(),
  phone: z.string().min(5, 'Phone required'),
  bio: z.string().min(1, 'Bio required'),
});

const UpdateUserProfileForm = ({ user }: { user: User }) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      id: user.id,
      name: user.name || '',
      image: user.image || '',
      phone: user.phone || '',
      bio: user.bio || '',
    },
    validators: { onSubmit: schema },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Updating profile...');

      try {
        const payload =  {
          name: value.name,
          image: value.image || '',
          phone: value.phone,
          bio: value.bio,
        };
        const res = await updateUserProfile(user.id, {
          name: value.name,
          image: value.image || '',
          phone: value.phone,
          bio: value.bio,
        });

        if (!res.success) {
          toast.error('Update failed', { id: toastId });
          return;
        }

        toast.success('Profile updated', { id: toastId });
        router.refresh();
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
          <CardTitle className="text-2xl text-center">
            Update User Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form
            onSubmit={e => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Name */}
            <form.Field name="name">
              {field => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel>Name *</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      aria-invalid={invalid}
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            {/* Image URL */}
            <form.Field name="image">
              {field => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel>Profile Image URL</FieldLabel>
                    <Input
                      placeholder="https://example.com/photo.jpg"
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      aria-invalid={invalid}
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            {/* Phone */}
            <form.Field name="phone">
              {field => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel>Phone *</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      aria-invalid={invalid}
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            {/* Bio */}
            <form.Field name="bio">
              {field => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel>Bio *</FieldLabel>
                    <Textarea
                      rows={4}
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      aria-invalid={invalid}
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUserProfileForm;
