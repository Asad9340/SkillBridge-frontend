import { getAllUsersByAdmin } from '@/actions/manage-users.action';
import ManageUsersTable from '@/components/modules/user-table/user-table';
import { User } from '@/types/user.type';

export const dynamic = 'force-dynamic';

const SuperAdminManageUsersPage = async () => {
  const { data: users, error } = await getAllUsersByAdmin();
  const typedUsers: User[] = Array.isArray(users) ? (users as User[]) : [];

  if (error) {
    return <div>Failed to load users</div>;
  }

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-center">Manage Users</h1>
        <p className="text-sm text-muted-foreground text-center">
          Super admin can manage admins and all user accounts.
        </p>
      </div>
      <ManageUsersTable
        users={typedUsers.filter(user => user.role !== 'SUPER_ADMIN')}
        actorRole="SUPER_ADMIN"
        allowedRoleOptions={['ADMIN', 'MANAGER', 'TUTOR', 'STUDENT']}
      />
    </div>
  );
};

export default SuperAdminManageUsersPage;
