import JoinAsTutor from '@/components/modules/JoinAsTutor/JoinAsTutor';
import { userService } from '@/services/user.service';
import { User } from '@/types';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
const JoinAsTutorPage = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData?.user as User;

  if (!userInfo) {
    redirect('/login?redirect=/join-as-tutor');
  }

  if (userInfo.role === 'TUTOR') {
    redirect('/dashboard');
  }

  return (
    <div>
      <JoinAsTutor userInfo={userInfo} />
    </div>
  );
};
export default JoinAsTutorPage;
