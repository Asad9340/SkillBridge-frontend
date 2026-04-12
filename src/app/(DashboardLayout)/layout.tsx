import { ROLES } from '@/constants/roles';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { userService } from '@/services/user.service';
import { DashboardSidebar } from '@/components/layout/Sidebar';
import { cookies } from 'next/headers';
import { jwtUtils } from '@/lib/jwtUtils';
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
  // Fast path: decode JWT from accessToken cookie (no network call needed)
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  let userInfo = null;

  if (accessToken) {
    const decoded = jwtUtils.decodedToken(accessToken);
    if (decoded?.userId) {
      userInfo = {
        id: decoded.userId as string,
        name: (decoded.name as string) ?? '',
        email: (decoded.email as string) ?? '',
        role: (decoded.role as string) ?? 'STUDENT',
        emailVerified: (decoded.emailVerified as boolean) ?? false,
        image: null,
        createdAt: '',
        updatedAt: '',
        phone: '',
        status: 'ACTIVE',
        bio: '',
      };
    }
  }

  // Fallback: call getSession if JWT decode failed (e.g., Google OAuth users without accessToken)
  if (!userInfo) {
    const { data } = await userService.getSession();
    if (data?.user) {
      const u = data.user;
      userInfo = {
        id: u.id,
        name: u.name ?? '',
        email: u.email ?? '',
        role: u.role ?? 'STUDENT',
        emailVerified: u.emailVerified ?? false,
        image: u.image ?? null,
        createdAt: '',
        updatedAt: '',
        phone: '',
        status: u.status ?? 'ACTIVE',
        bio: '',
      };
    }
  }

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
