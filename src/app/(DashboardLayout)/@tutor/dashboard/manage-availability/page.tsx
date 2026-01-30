import { getAllAvailability } from '@/actions/manage-availability.action';
import { userService } from '@/services/user.service';
import ManageAvailabilityTable from '@/components/modules/ManangeAvailabilityTable/ManageAvailabilityTable';

const ManageAvailability = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData.user;
  const { data: availabilityData } = await getAllAvailability(userInfo.id);
  return (
    <div className="max-w-7xl mx-auto w-full">
       <div className="mb-4">
          <h1 className="text-2xl font-semibold text-center">
            Manage All Availability
          </h1>
        </div>
      <ManageAvailabilityTable availabilityData={availabilityData} />
    </div>
  );
};

export default ManageAvailability;
