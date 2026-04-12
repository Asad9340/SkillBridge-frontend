import { ROLES } from '@/constants/roles';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/layout/Sidebar';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/getSessionUser';

export const dynamic = 'force-dynamic';

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
  const userInfo = await getSessionUser();

  if (!userInfo) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <DashboardSidebar user={userInfo} />

      <SidebarInset className="min-w-0 overflow-x-hidden">
        <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur md:hidden">
          <SidebarTrigger className="-ml-1" />
        </header>

        <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">
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
      </SidebarInset>
    </SidebarProvider>
  );
}
