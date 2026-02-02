import UpdateUserProfileForm from "@/components/modules/UpdateUserProfileForm/UpdateUserProfileForm";
import { userService } from "@/services/user.service";
import { User } from "@/types";

export const dynamic = 'force-dynamic';

const UpdateUserProfile = async() => {
    const { data: sessionData } = await userService.getSession();
    const userInfo = sessionData?.user as User;
  return (
    <div>
      <UpdateUserProfileForm user={userInfo} />
    </div>
  );
}

export default UpdateUserProfile
