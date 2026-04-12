import { UserProfileView } from '@/components/modules/profile/UserProfileView';
import { getSessionUser } from '@/lib/getSessionUser';
import { User } from '@/types';

export const dynamic = 'force-dynamic';

const AdminProfilePage = async () => {
  const userInfo = (await getSessionUser()) as User | null;

  if (!userInfo) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No user session found
      </div>
    );
  }

  return <UserProfileView user={userInfo} />;
};

export default AdminProfilePage;
