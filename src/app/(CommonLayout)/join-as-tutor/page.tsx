import JoinAsTutor from '@/components/modules/JoinAsTutor/JoinAsTutor';
import { userService } from '@/services/user.service';
import { User } from '@/types';

export const dynamic = 'force-dynamic';
const JoinAsTutorPage = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData?.user as User;
  return (
    <div>
      <JoinAsTutor userInfo={userInfo} />
    </div>
  );
};
export default JoinAsTutorPage;
