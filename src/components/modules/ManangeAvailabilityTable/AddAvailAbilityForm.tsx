'use client';

import { useForm } from '@tanstack/react-form';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createAvailability } from '@/actions/manage-availability.action';

type Subject = {
  id: string;
  name: string;
  categoryId: string;
};

const availabilitySchema = z.object({
  subjectId: z.string().min(1, 'Subject required'),
  date: z.string().min(1, 'Date required'),
  startTime: z.string().min(1, 'Start time required'),
  endTime: z.string().min(1, 'End time required'),
});

const AddAvailAbilityForm = ({
  subjects,
  tutorId,
}: {
  subjects: Subject[];
  tutorId: string;
}) => {
  const form = useForm({
    defaultValues: {
      subjectId: '',
      date: '',
      startTime: '',
      endTime: '',
    },
    validators: { onSubmit: availabilitySchema },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Adding availability...');
      try {
        const payload = {
          subjectId: value.subjectId,
          date: new Date(value.date).toISOString(),
          startTime: value.startTime,
          endTime: value.endTime,
          tutorId,
        };
        const res = await createAvailability(payload);
        if (!res.success) {
          toast.error('Failed', { id: toastId });
          return;
        }

        toast.success('Availability added', { id: toastId });
        form.reset();
      } catch {
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  return (
    <Card className="max-w-xl mx-auto f-full border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Add Availability
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <form.Field name="subjectId">
                {field => (
                  <Field>
                    <FieldLabel>Subject</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects?.map(s => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              <form.Field name="date">
                {field => (
                  <Field>
                    <FieldLabel>Date</FieldLabel>
                    <Input
                      type="date"
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <form.Field name="startTime">
                {field => (
                  <Field>
                    <FieldLabel>Start Time</FieldLabel>
                    <Input
                      type="time"
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              <form.Field name="endTime">
                {field => (
                  <Field>
                    <FieldLabel>End Time</FieldLabel>
                    <Input
                      type="time"
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </div>

            <Button type="submit" className="w-full">
              Save Availability
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAvailAbilityForm;
