import { ROLES } from '@/constants/roles';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { userService } from '@/services/user.service';
import { DashboardSidebar } from '@/components/layout/Sidebar';
import { Menu } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  admin,
  manager,
  student,
  superAdmin,
  tutor,
  organizer,
}: {
  admin: React.ReactNode;
  manager: React.ReactNode;
  student: React.ReactNode;
  superAdmin: React.ReactNode;
  tutor: React.ReactNode;
  organizer: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userInfo = data?.user ?? null;

  if (!userInfo) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <DashboardSidebar user={userInfo} />

      <div className="md:hidden p-2">
        <SidebarTrigger className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          <Menu className="w-6 h-6" />
        </SidebarTrigger>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        {userInfo?.role === ROLES.SUPER_ADMIN
          ? superAdmin
          : userInfo?.role === ROLES.MANAGER
            ? manager
            : userInfo?.role === ROLES.ADMIN
              ? admin
              : userInfo?.role === ROLES.TUTOR
                ? tutor
                : userInfo?.role === ROLES.ORGANIZER
                  ? organizer
                  : student}
      </div>
    </SidebarProvider>
  );
}
