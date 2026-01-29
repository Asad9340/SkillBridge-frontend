'use client';

import { updateUserStatusByAdmin } from '@/actions/manage-users.action';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@/types';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { z } from 'zod';

const statusSchema = z.object({
  userId: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
});
export interface StatusType {
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}
const ManageUsersTable = ({ users }: { users: User[] }) => {
  const form = useForm({
    defaultValues: {
      userId: '',
      status: 'ACTIVE',
    },
    validators: {
      onSubmit: statusSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Updating status...');
      try {
        const res = await updateUserStatusByAdmin(value.userId, value.status);
        if (!res.success) {
          toast.error(res.message ?? 'Failed to update status', {
            id: toastId,
          });
          return;
        }

        toast.success('Status updated successfully', { id: toastId });
      } catch {
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  const submitStatus = (userId: string, status: string) => {
    form.setFieldValue('userId', userId);
    form.setFieldValue('status', status);
    form.handleSubmit();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Bio</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone ?? 'N/A'}</TableCell>
            <TableCell>{user.bio ?? 'N/A'}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>

            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="text-xs">
                    Update Status
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => submitStatus(user.id, 'ACTIVE')}
                  >
                    Active
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => submitStatus(user.id, 'INACTIVE')}
                  >
                    Inactive
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => submitStatus(user.id, 'SUSPENDED')}
                  >
                    Suspend
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageUsersTable;
