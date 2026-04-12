import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/auth/google/callback
 *
 * After the Google OAuth flow the backend mints JWT tokens and redirects here
 * with them as query params.  We set them as httpOnly cookies and then send
 * the user to the originally requested page so they land fully-authenticated.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const sessionToken = searchParams.get('sessionToken');
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(
      new URL('/login?error=oauth_failed', request.url),
    );
  }

  const isValidPath =
    redirectPath.startsWith('/') && !redirectPath.startsWith('//');
  const finalPath = isValidPath ? redirectPath : '/dashboard';

  const response = NextResponse.redirect(new URL(finalPath, request.url));

  const isProduction = process.env.NODE_ENV === 'production';

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  if (sessionToken) {
    response.cookies.set('better-auth.session_token', sessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  return response;
}
