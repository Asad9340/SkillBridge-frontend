import { ROLES } from '@/constants/roles';
import { SidebarProvider } from '@/components/ui/sidebar';
import { userService } from '@/services/user.service';
import { DashboardSidebar } from '@/components/layout/Sidebar';

export default async function DashboardLayout({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userInfo = data.user;
  console.log(userInfo)
  return (
    <SidebarProvider>
      <DashboardSidebar user={userInfo} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {userInfo?.role === ROLES.ADMIN
          ? admin
          : userInfo?.role === ROLES.TUTOR
            ? tutor
            : student}
      </div>
    </SidebarProvider>
  );
}
