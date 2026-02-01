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
        toast.error('Delete failed its connected to a booking', { id: toastId });
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
        className="mb-8 p-6 bg-card border rounded-lg"
      >
        <FieldGroup className="flex flex-col sm:flex-row gap-4 items-end">
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
                    placeholder="e.g., Programming, Mathematics"
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
                  placeholder="Optional description"
                />
              </Field>
            )}
          </form.Field>

          <Button type="submit" size="lg">
            {form.state.values.id ? 'Update Category' : 'Add Category'}
          </Button>
        </FieldGroup>
      </form>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-72">Category Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No categories found. Create one above.
                </TableCell>
              </TableRow>
            ) : (
              categories.map(cat => (
                <TableRow key={cat.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>{cat.description ?? 'No description'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        form.setFieldValue('id', cat.id);
                        form.setFieldValue('name', cat.name);
                        form.setFieldValue(
                          'description',
                          cat.description ?? '',
                        );
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CategoriesTable;
