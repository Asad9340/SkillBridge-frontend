import { getAllAvailability } from '@/actions/manage-availability.action';
import { getSessionUser } from '@/lib/getSessionUser';
import ManageAvailabilityTable from '@/components/modules/ManangeAvailabilityTable/ManageAvailabilityTable';
import { getAllSubjects } from '@/actions/manage-subjects.action';
import { tutorService } from '@/services/tutor.service';

export const dynamic = 'force-dynamic';

const ManageAvailability = async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser?.id) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        No session found.
      </div>
    );
  }

  const { data: subjects } = await getAllSubjects();
  const { data: tutorProfile } = await tutorService.ensureTutorProfile(
    sessionUser.id,
  );

  if (!tutorProfile?.id) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Unable to load tutor profile. Please try again.
      </div>
    );
  }

  const tutorId = tutorProfile.id;
  const { data: availabilityData } = await getAllAvailability(tutorId);

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-center">
          Manage All Availability
        </h1>
      </div>
      <div className="mt-8 max-w-5xl mx-auto w-full">
        <ManageAvailabilityTable
          availabilityData={availabilityData}
          subjects={subjects}
          tutorId={tutorId}
        />
      </div>
    </div>
  );
};

export default ManageAvailability;
