import { UserProfileView } from '@/components/modules/profile/UserProfileView';
import { userService } from '@/services/user.service';
import { User } from '@/types';

export const dynamic = 'force-dynamic';

const AdminProfilePage = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData?.user as User | undefined;

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
