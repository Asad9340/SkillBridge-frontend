import UpdateUserProfileForm from '@/components/modules/UpdateUserProfileForm/UpdateUserProfileForm';
import { userService } from '@/services/user.service';
import { User } from '@/types';

export const dynamic = 'force-dynamic';

const AdminUpdateProfilePage = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData?.user as User | undefined;

  if (!userInfo) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No user session found
      </div>
    );
  }

  return <UpdateUserProfileForm user={userInfo} />;
};

export default AdminUpdateProfilePage;
