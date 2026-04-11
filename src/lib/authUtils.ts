export type UserRole =
  | 'SUPER_ADMIN'
  | 'MANAGER'
  | 'ADMIN'
  | 'TUTOR'
  | 'STUDENT';

export const authRoutes = ['/login', '/register', '/verify-email'];

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some(route => route === pathname);
};

export const protectedRoutes = ['/dashboard', '/join-as-tutor'];

export const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`),
  );
};

export const getDefaultDashboardRoute = () => {
  return '/dashboard';
};
