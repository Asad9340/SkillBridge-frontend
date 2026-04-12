/**
 * Returns a properly formatted Cookie header string from Next.js RequestCookies.
 * Using cookieStore.toString() is unsafe because Next.js URL-encodes values
 * which breaks backend cookie parsing (especially for BetterAuth session tokens).
 */
import { cookies } from 'next/headers';

export async function getCookieString(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');
}
