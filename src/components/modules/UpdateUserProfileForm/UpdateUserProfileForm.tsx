'use client';

import { User } from '@/types';
import { useForm } from '@tanstack/react-form';
import { ChangeEvent, useState } from 'react';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  updateUserProfile,
  uploadUserAvatar,
} from '@/actions/manage-users.action';
import {
  UserCircle,
  Mail,
  Phone,
  FileText,
  ImageIcon,
  Save,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

const schema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(5, 'Phone required'),
  bio: z.string().min(1, 'Bio required'),
});

const UpdateUserProfileForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarFileName, setAvatarFileName] = useState('');

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setAvatarFile(file);
    setAvatarFileName(file?.name || '');
  };

  const form = useForm({
    defaultValues: {
      id: user.id || '',
      name: user.name || '',
      phone: user.phone || '',
      bio: user.bio || '',
    },
    validators: { onSubmit: schema },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Updating your profile...');

      try {
        if (avatarFile) {
          const avatarFormData = new FormData();
          avatarFormData.append('image', avatarFile);

          const uploadRes = await uploadUserAvatar(user.id, avatarFormData);

          if (!uploadRes.success) {
            toast.error(uploadRes.message || 'Image upload failed.', {
              id: toastId,
            });
            return;
          }
        }

        const res = await updateUserProfile(user.id, {
          name: value.name,
          phone: value.phone,
          bio: value.bio,
        });

        if (!res.success) {
          toast.error(res.message || 'Update failed. Check your connection.', {
            id: toastId,
          });
          return;
        }

        toast.success('Profile updated successfully!', { id: toastId });
        router.refresh();
        router.replace('/dashboard/profile');
      } catch (error) {
        console.error('Update profile error:', error);
        toast.error('Something went wrong. Please try again.', { id: toastId });
      }
    },
  });

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground/90">
            Edit Profile
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Keep your information up to date to get the best experience.
          </p>
        </div>
        <Link href="/dashboard/profile">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Button>
        </Link>
      </div>

      <Card className="border-none shadow-2xl bg-card overflow-hidden">
        <CardHeader className="border-b bg-muted/40 pb-6 px-10">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-xl bg-primary/15 text-primary shadow-sm border border-primary/10">
              <UserCircle className="w-9 h-9" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Personal Information
              </CardTitle>
              <CardDescription className="text-sm font-medium">
                Update your public profile details
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-10 px-6 md:px-12 pb-12">
          <form
            onSubmit={e => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {/* Name */}
              <form.Field name="name">
                {field => (
                  <div className="space-y-2.5">
                    <label className="text-sm font-semibold flex items-center gap-2.5 text-foreground/80">
                      <UserCircle className="w-4.5 h-4.5 text-primary" />
                      Full Name
                    </label>
                    <Input
                      placeholder="Enter your name"
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      className="h-12 bg-muted/20 border-muted-foreground/15 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all rounded-lg"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-[12px] text-destructive mt-1.5 font-medium ml-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive" />
                        {field.state.meta.errors
                          .map(err => err?.message)
                          .join(', ')}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Email (Read Only) */}
              <div className="space-y-2.5 opacity-80 group">
                <label className="text-sm font-semibold flex items-center gap-2.5 text-foreground/80">
                  <Mail className="w-4.5 h-4.5 text-primary" />
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    value={user.email}
                    readOnly
                    className="h-12 bg-muted/50 cursor-not-allowed border-dashed border-muted-foreground/30 rounded-lg pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium italic ml-1 flex items-center gap-1.5">
                  <span className="w-3 border-t border-muted-foreground/30" />
                  Primary email cannot be changed.
                </p>
              </div>

              {/* Phone */}
              <form.Field name="phone">
                {field => (
                  <div className="space-y-2.5">
                    <label className="text-sm font-semibold flex items-center gap-2.5 text-foreground/80">
                      <Phone className="w-4.5 h-4.5 text-primary" />
                      Phone Number
                    </label>
                    <Input
                      placeholder="+1 (555) 000-0000"
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      className="h-12 bg-muted/20 border-muted-foreground/15 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all rounded-lg"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-[12px] text-destructive mt-1.5 font-medium ml-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive" />
                        {field.state.meta.errors
                          .map(err => err?.message)
                          .join(', ')}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <div className="space-y-2.5">
                <label className="text-sm font-semibold flex items-center gap-2.5 text-foreground/80">
                  <ImageIcon className="w-4.5 h-4.5 text-primary" />
                  Profile Image Upload
                </label>
                <Input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleAvatarChange}
                  className="h-12 bg-muted/20 border-muted-foreground/15 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all rounded-lg"
                />
                <p className="text-xs text-muted-foreground ml-1">
                  {avatarFileName
                    ? `Selected: ${avatarFileName}`
                    : 'Upload a new profile image file (optional).'}
                </p>
              </div>

              {/* Bio */}
              <form.Field name="bio">
                {field => (
                  <div className="space-y-2.5 md:col-span-2">
                    <label className="text-sm font-semibold flex items-center gap-2.5 text-foreground/80">
                      <FileText className="w-4.5 h-4.5 text-primary" />
                      Short Bio / Description
                    </label>
                    <Textarea
                      placeholder="Tell us about yourself, your skills, or your goals..."
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      rows={6}
                      className="bg-muted/20 border-muted-foreground/15 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all rounded-lg resize-none p-4"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-[12px] text-destructive mt-1.5 font-medium ml-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-destructive" />
                        {field.state.meta.errors
                          .map(err => err?.message)
                          .join(', ')}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            <div className="flex justify-end pt-8 border-t border-muted-foreground/10 gap-5 items-center">
              <Link href="/dashboard/profile">
                <Button
                  variant="ghost"
                  type="button"
                  className="px-8 font-semibold h-12 text-muted-foreground hover:text-foreground"
                >
                  Cancel Changes
                </Button>
              </Link>
              <form.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="px-12 h-12 gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all font-bold rounded-lg bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    {isSubmitting ? 'Optimizing Profile...' : 'Save & Publish'}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUserProfileForm;
