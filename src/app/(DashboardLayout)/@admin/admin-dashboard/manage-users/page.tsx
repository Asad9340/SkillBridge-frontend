
import { getAllUsersByAdmin } from '@/actions/manage-users.action';
import ManageUsersTable from './../../../../../components/modules/user-table/user-table';
const ManageUsersPage = async () => {
  const { data, error } = await getAllUsersByAdmin();
  if (error) {
    return <div>Failed to load users</div>;
  }
  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
      <div>
        <h3 className="text-3xl font-bold text-center">Manage Users</h3>
      </div>
      <ManageUsersTable users={data} />
    </div>
  );
};

export default ManageUsersPage
