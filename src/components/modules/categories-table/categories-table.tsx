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
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/actions/manage-categories.action';

type Category = {
  id: string;
  name: string;
  description: string | null;
};

const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
});

const CategoriesTable = ({ categories }: { categories: Category[] }) => {
  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      description: '',
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        value.id ? 'Updating category...' : 'Creating category...',
      );
      try {
        const res = value.id
          ? await updateCategory(value.id, {
              name: value.name,
              description: value.description,
            })
          : await createCategory({
              name: value.name,
              description: value.description,
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
    const toastId = toast.loading('Deleting category...');
    try {
      const res = await deleteCategory(id);
      if (!res.success) {
        toast.error('Delete failed', { id: toastId });
        return;
      }
      toast.success('Category deleted', { id: toastId });
    } catch {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="mb-6"
      >
        <FieldGroup className="flex gap-4 items-end">
          <form.Field name="name">
            {field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="description">
            {field => (
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          <Button type="submit">
            {form.state.values.id ? 'Update' : 'Add'}
          </Button>
        </FieldGroup>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map(cat => (
            <TableRow key={cat.id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.description ?? 'N/A'}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  onClick={() => {
                    form.setFieldValue('id', cat.id);
                    form.setFieldValue('name', cat.name);
                    form.setFieldValue('description', cat.description ?? '');
                  }}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CategoriesTable;
