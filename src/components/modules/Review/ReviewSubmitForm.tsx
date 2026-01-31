'use client';

import { useForm } from '@tanstack/react-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { createReview } from '@/actions/reviews.action';

interface Props {
  tutorId: string;
}

const reviewSchema = z.object({
  rating: z
    .string()
    .min(1, 'Rating required')
    .refine(v => Number(v) >= 1 && Number(v) <= 5, {
      message: 'Rating must be between 1 and 5',
    }),
  comment: z.string().min(3, 'Comment required'),
});

const ReviewSubmitForm = ({ tutorId }: Props) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      rating: '',
      comment: '',
    },
    validators: {
      onSubmit: reviewSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Submitting review...');

      try {
        const payload = {
          tutorId,
          rating: Number(value.rating),
          comment: value.comment,
        };
        const res = await createReview(payload);
        if (!res?.success) {
          toast.error('Review submit failed', { id: toastId });
          return;
        }

        toast.success('Review submitted!', { id: toastId });
        form.reset();
        router.refresh();
      } catch {
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="border rounded-xl p-5 space-y-4 bg-card"
    >
      <FieldGroup className="space-y-4">
        {/* Rating */}
        <form.Field name="rating">
          {field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Rating (1–5)</FieldLabel>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter rating"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Comment */}
        <form.Field name="comment">
          {field => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel>Comment</FieldLabel>
                <Textarea
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Write your review..."
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" className="w-full">
          Submit Review
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ReviewSubmitForm;
