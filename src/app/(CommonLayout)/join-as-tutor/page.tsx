import JoinAsTutor from '@/components/modules/JoinAsTutor/JoinAsTutor';
import { getSessionUser } from '@/lib/getSessionUser';
import { User } from '@/types';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
const JoinAsTutorPage = async () => {
  const userInfo = (await getSessionUser()) as User | null;

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
