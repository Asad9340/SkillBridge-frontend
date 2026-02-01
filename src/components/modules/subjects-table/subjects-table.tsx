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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createSubject,
  updateSubject,
  deleteSubject,
} from '@/actions/manage-subjects.action';

type Subject = {
  id: string;
  name: string;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
  description?: string | null;
};

const subjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  categoryId: z.string().min(1, 'Category is required'),
});

const SubjectsTable = ({
  subjects,
  categories
}: {
  subjects: Subject[];
  categories: Category[];
}) => {
  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      categoryId: '',
    },
    validators: { onSubmit: subjectSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        value.id ? 'Updating subject...' : 'Creating subject...'
      );
      try {
        const res = value.id
          ? await updateSubject(value.id, {
              name: value.name,
              categoryId: value.categoryId,
            })
          : await createSubject({
              name: value.name,
              categoryId: value.categoryId,
            });

        if (!res.success) {
          toast.error('Operation failed', { id: toastId });
          return;
        }

        toast.success('Success', { id: toastId });
        form.reset();
      } catch {
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  const handleDelete = async (id: string) => {
    const toastId = toast.loading('Deleting subject...');
    try {
      const res = await deleteSubject(id);
      if (!res.success) {
        toast.error('Delete failed because its connected to booking', { id: toastId });
        return;
      }
      toast.success('Subject deleted', { id: toastId });
    } catch {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="mb-8 p-6 bg-card border rounded-lg"
      >
        <FieldGroup className="flex flex-col sm:flex-row gap-4 items-end">
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="e.g., Python, Algebra"
                    className="w-48"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="categoryId">
            {(field) => (
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  required
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>

          <Button type="submit" size="lg">
            {form.state.values.id ? 'Update Subject' : 'Add Subject'}
          </Button>
        </FieldGroup>
      </form>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-72">Subject Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No subjects found. Create one above.
                </TableCell>
              </TableRow>
            ) : (
              subjects.map((subject) => (
                <TableRow key={subject.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {getCategoryName(subject.categoryId)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        form.setFieldValue('id', subject.id);
                        form.setFieldValue('name', subject.name);
                        form.setFieldValue('categoryId', subject.categoryId);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(subject.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SubjectsTable;
