import { NextRequest, NextResponse } from 'next/server';
import {
  isAuthRoute,
  isProtectedRoute,
  getDefaultDashboardRoute,
} from './src/lib/authUtils';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isStaticOrApi =
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico';

  if (isStaticOrApi) {
    return NextResponse.next();
  }

  // Read all authentication cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const sessionToken =
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('better-auth.session-token')?.value;

  // User is logged in if they have all required tokens
  const isLoggedIn = !!(accessToken && refreshToken && sessionToken);

  // If user is on an auth page (login/register) but already logged in, redirect to dashboard
  if (isAuthRoute(pathname) && isLoggedIn) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(), request.url),
    );
  }

  // If user tries to access protected route without all tokens, redirect to login
  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
