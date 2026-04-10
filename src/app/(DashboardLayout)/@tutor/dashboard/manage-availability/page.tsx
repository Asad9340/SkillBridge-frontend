import { getAllAvailability } from '@/actions/manage-availability.action';
import { userService } from '@/services/user.service';
import ManageAvailabilityTable from '@/components/modules/ManangeAvailabilityTable/ManageAvailabilityTable';
import { getAllSubjects } from '@/actions/manage-subjects.action';
import { tutorService } from '@/services/tutor.service';

export const dynamic = 'force-dynamic';

const ManageAvailability = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData.user;
  const { data: subjects } = await getAllSubjects();
  const { data: tutorProfile } = await tutorService.getTutorProfile(
    userInfo.id,
  );
  const tutorId = tutorProfile.id;
  const { data: availabilityData } = await getAllAvailability(tutorId);
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-center">
          Manage All Availability
        </h1>
      </div>
      {/* <div>
        <AddAvailAbilityForm subjects={subjects} tutorId={tutorId} />
      </div> */}
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
