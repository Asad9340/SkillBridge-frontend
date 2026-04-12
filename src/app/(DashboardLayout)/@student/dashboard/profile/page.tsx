import { getSessionUser } from '@/lib/getSessionUser';
import { UserProfileView } from '@/components/modules/profile/UserProfileView';
import { User } from '@/types';

export const dynamic = 'force-dynamic';

const UserProfile = async () => {
  const userInfo = (await getSessionUser()) as User | null;

  if (!userInfo) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center text-muted-foreground">
        No user session found
      </div>
    );
  }

  return <UserProfileView user={userInfo} />;
};

export default UserProfile;
