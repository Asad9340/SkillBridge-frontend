import { getAllUsersByAdmin } from '@/actions/manage-users.action';
import ManageUsersTable from '@/components/modules/user-table/user-table';

export const dynamic = 'force-dynamic';

const RoleManagementPage = async () => {
  const { data: users, error } = await getAllUsersByAdmin();

  if (error) {
    return <div>Failed to load users</div>;
  }

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-center">Role Management</h1>
        <p className="text-sm text-muted-foreground text-center">
          Manage role assignments for admins and users.
        </p>
      </div>
      <ManageUsersTable
        users={(users ?? []).filter(user => user.role !== 'SUPER_ADMIN')}
        actorRole="SUPER_ADMIN"
        allowedRoleOptions={['ADMIN', 'MANAGER', 'TUTOR', 'STUDENT']}
      />
    </div>
  );
};

export default RoleManagementPage;
