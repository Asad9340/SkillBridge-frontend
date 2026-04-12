import { NextRequest, NextResponse } from 'next/server';
import {
  isAuthRoute,
  isProtectedRoute,
  getDefaultDashboardRoute,
} from './src/lib/authUtils';

const defaultBackendUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://skill-bridge-backend-nine.vercel.app'
    : 'http://localhost:5000';

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  `${process.env.BACKEND_URL || defaultBackendUrl}/api/v1`;

/**
 * Exchange a BetterAuth session token for custom JWT access + refresh tokens.
 * Called when a user has a session cookie (e.g. after Google OAuth) but the
 * custom JWT cookies have not been set yet.
 * Returns the tokens on success, or null on failure.
 */
async function exchangeSessionForTokens(
  sessionToken: string,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const res = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `better-auth.session_token=${sessionToken}`,
      },
    });
    if (!res.ok) return null;
    const json = await res.json().catch(() => null);
    const { accessToken, refreshToken } = json?.data ?? {};
    if (!accessToken || !refreshToken) return null;
    return { accessToken, refreshToken };
  } catch {
    return null;
  }
}

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
  const sessionToken =
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('better-auth.session-token')?.value;

  // User is logged in if they have the Better Auth session token.
  const isLoggedIn = !!sessionToken;

  // If user is on an auth page (login/register) but already logged in, redirect to dashboard
  if (isAuthRoute(pathname) && isLoggedIn) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(), request.url),
    );
  }

  // If user tries to access protected route without a session, redirect to login
  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the user has a session (e.g. after Google OAuth) but the custom JWT
  // cookies are missing, exchange the session for JWT tokens and set them.
  if (sessionToken && !accessToken) {
    const tokens = await exchangeSessionForTokens(sessionToken);
    if (tokens) {
      const response = NextResponse.next();
      const oneDaySeconds = 60 * 60 * 24;
      response.cookies.set('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: oneDaySeconds,
      });
      response.cookies.set('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: oneDaySeconds * 7,
      });
      return response;
    }
  }

  return NextResponse.next();
}
