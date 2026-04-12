import UpdateUserProfileForm from '@/components/modules/UpdateUserProfileForm/UpdateUserProfileForm';
import { getSessionUser } from '@/lib/getSessionUser';
import { User } from '@/types';

export const dynamic = 'force-dynamic';

const ManagerUpdateProfilePage = async () => {
  const userInfo = (await getSessionUser()) as User | null;

  if (!userInfo) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No user session found
      </div>
    );
  }

  return <UpdateUserProfileForm user={userInfo} />;
};

export default ManagerUpdateProfilePage;
