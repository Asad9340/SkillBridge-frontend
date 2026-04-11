import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NavbarSessionSkeleton } from '@/components/modules/homepage/HomeSectionSkeletons';
import { userService } from '@/services/user.service';

export const dynamic = 'force-dynamic';

const NavbarWithSession = async () => {
  const { data } = await userService.getSession();
  const userInfo = data?.user ?? null;

  return <Navbar user={userInfo} />;
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-0 left-0 w-full z-50 border-b bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4">
          <Suspense fallback={<NavbarSessionSkeleton />}>
            <NavbarWithSession />
          </Suspense>
        </div>
      </div>

      <main className="pt-20 max-w-7xl mx-auto px-4">{children}</main>

      <Footer />
    </div>
  );
};

export default RootLayout;
