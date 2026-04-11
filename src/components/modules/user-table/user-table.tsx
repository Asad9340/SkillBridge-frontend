'use client';

import { updateUserStatusByAdmin } from '@/actions/manage-users.action';
import { updateUserRoleByAdmin } from '@/actions/manage-users.action';
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
import { UserCircle, Mail, Phone } from 'lucide-react';

const statusSchema = z.object({
  userId: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
});

const roleSchema = z.object({
  userId: z.string(),
  role: z.enum(['MANAGER', 'ADMIN', 'TUTOR', 'STUDENT']),
});

export interface StatusType {
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

type RoleType = 'MANAGER' | 'ADMIN' | 'TUTOR' | 'STUDENT';

type ManagerActorRole = 'SUPER_ADMIN' | 'ADMIN';

const roleLabelMap: Record<RoleType, string> = {
  MANAGER: 'Manager',
  ADMIN: 'Admin',
  TUTOR: 'Tutor',
  STUDENT: 'Student',
};

const ManageUsersTable = ({
  users,
  actorRole,
  allowedRoleOptions,
}: {
  users: User[];
  actorRole: ManagerActorRole;
  allowedRoleOptions: RoleType[];
}) => {
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

  const roleForm = useForm({
    defaultValues: {
      userId: '',
      role: 'STUDENT' as RoleType,
    },
    validators: {
      onSubmit: roleSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Updating role...');
      try {
        const res = await updateUserRoleByAdmin(value.userId, value.role);
        if (!res.success) {
          toast.error(res.message ?? 'Failed to update role', {
            id: toastId,
          });
          return;
        }
        toast.success('Role updated successfully', { id: toastId });
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

  const submitRole = (userId: string, role: RoleType) => {
    roleForm.setFieldValue('userId', userId);
    roleForm.setFieldValue('role', role);
    roleForm.handleSubmit();
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      ACTIVE: { label: 'Active', color: 'bg-green-100 text-green-800' },
      INACTIVE: { label: 'Inactive', color: 'bg-orange-100 text-orange-800' },
      SUSPENDED: { label: 'Suspended', color: 'bg-red-100 text-red-800' },
    };
    const config =
      statusMap[status as keyof typeof statusMap] || statusMap.INACTIVE;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-230">
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="hidden md:table-cell">Bio</TableHead>
              <TableHead className="hidden lg:table-cell">Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map(user => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                        <UserCircle className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="truncate max-w-55">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {user.phone ?? 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-3xs truncate">
                    {user.bio && user.bio.length > 50
                      ? `${user.bio.slice(0, 50)}...`
                      : (user.bio ?? 'No bio')}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        disabled={user.role === 'SUPER_ADMIN'}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 text-xs"
                        >
                          {user.role === 'SUPER_ADMIN'
                            ? 'Super Admin'
                            : 'Manage'}
                        </Button>
                      </DropdownMenuTrigger>
                      {user.role !== 'SUPER_ADMIN' && (
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            className="text-xs font-semibold text-muted-foreground"
                            disabled
                          >
                            Update Role
                          </DropdownMenuItem>
                          {allowedRoleOptions.map(role => (
                            <DropdownMenuItem
                              key={`${user.id}-${role}`}
                              onClick={() => submitRole(user.id, role)}
                              className="cursor-pointer"
                              disabled={user.role === role}
                            >
                              {roleLabelMap[role]}
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuItem
                            className="text-xs font-semibold text-muted-foreground"
                            disabled
                          >
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => submitStatus(user.id, 'ACTIVE')}
                            className="cursor-pointer"
                          >
                            <span className="mr-2 w-3 h-3 bg-green-500 rounded-full" />
                            Active
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => submitStatus(user.id, 'INACTIVE')}
                            className="cursor-pointer"
                          >
                            <span className="mr-2 w-3 h-3 bg-orange-500 rounded-full" />
                            Inactive
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => submitStatus(user.id, 'SUSPENDED')}
                            className="cursor-pointer text-destructive"
                            disabled={
                              actorRole === 'ADMIN' && user.role === 'ADMIN'
                            }
                          >
                            <span className="mr-2 w-3 h-3 bg-red-500 rounded-full" />
                            Suspend
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      )}
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageUsersTable;
