import UpdateTutorProfileForm from '@/components/modules/UpdateTutorProfileForm/UpdateTutorProfileForm';
import { tutorService } from '@/services/tutor.service';
import { getSessionUser } from '@/lib/getSessionUser';

export const dynamic = 'force-dynamic';

const UpdateProfile = async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser?.id) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        No session found.
      </div>
    );
  }

  const { data: tutorData } = await tutorService.ensureTutorProfile(
    sessionUser.id,
  );
  if (!tutorData) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Unable to load tutor profile. Please try again.
      </div>
    );
  }

  return (
    <div>
      <UpdateTutorProfileForm tutor={tutorData} />
    </div>
  );
};

export default UpdateProfile;
