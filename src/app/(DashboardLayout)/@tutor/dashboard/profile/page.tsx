import { TutorProfile } from "@/components/modules/tutor/TutorProfile";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";

const TutorProfilePage = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData.user;
  const { data: tutorData } = await tutorService.getTutorProfile(userInfo.id);
  if (!tutorData) {
    return <div>No tutor profile found</div>;
  }

  return <TutorProfile tutor={tutorData} />;
};

export default TutorProfilePage;
