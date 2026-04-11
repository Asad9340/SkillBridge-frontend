/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only';

import { cookies, headers } from 'next/headers';
import { getNewTokensWithRefreshToken } from '@/services/auth.services';
import { isTokenExpiringSoon } from '../tokenUtils';
import { env } from '../../../env';

const API_URL = env.API_URL;
const BACKEND_URL = env.BACKEND_URL;
const BASE_AUTH_URL = env.AUTH_URL;
interface FetchOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  cache?: RequestCache;
  tags?: string[];
  isAuth?: boolean;
}

const parseJsonSafe = async (res: Response): Promise<any> => {
  const text = await res.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

async function tryRefreshToken(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  if (!(await isTokenExpiringSoon(accessToken))) {
    return;
  }

  const requestHeader = await headers();

  if (requestHeader.get('x-token-refreshed') === '1') {
    return;
  }

  try {
    await getNewTokensWithRefreshToken(refreshToken);
  } catch (error: any) {
    console.error('Error refreshing token in server http client:', error);
  }
}

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');
}

async function httpGet<T>(
  endpoint: string,
  options?: FetchOptions,
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (accessToken && refreshToken) {
    await tryRefreshToken(accessToken, refreshToken);
  }

  const cookieHeader = await getCookieHeader();
  const baseUrl = options?.isAuth ? BACKEND_URL : API_URL;
  const url = new URL(`${baseUrl}${endpoint}`);

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const init: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
      ...options?.headers,
    },
  };

  if (options?.cache) {
    init.cache = options.cache;
  }

  if (options?.tags) {
    init.next = { tags: options.tags };
  }

  const res = await fetch(url.toString(), init);

  if (!res.ok) {
    const errorData = await parseJsonSafe(res);
    throw {
      response: {
        data: errorData,
      },
      message: errorData?.message || 'Request failed',
    };
  }

  return (await parseJsonSafe(res)) as T;
}

async function httpPost<T>(
  endpoint: string,
  data: unknown,
  options?: FetchOptions,
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (accessToken && refreshToken) {
    await tryRefreshToken(accessToken, refreshToken);
  }

  const cookieHeader = await getCookieHeader();
  const baseUrl = options?.isAuth ? BASE_AUTH_URL : API_URL;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
      ...options?.headers,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await parseJsonSafe(res);
    throw {
      response: {
        data: errorData,
      },
      message: errorData?.message || 'Request failed',
    };
  }

  return (await parseJsonSafe(res)) as T;
}

async function httpPatch<T>(
  endpoint: string,
  data: unknown,
  options?: FetchOptions,
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (accessToken && refreshToken) {
    await tryRefreshToken(accessToken, refreshToken);
  }

  const cookieHeader = await getCookieHeader();
  const baseUrl = options?.isAuth ? BACKEND_URL : API_URL;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
      ...options?.headers,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await parseJsonSafe(res);
    throw {
      response: {
        data: errorData,
      },
      message: errorData?.message || 'Request failed',
    };
  }

  return (await parseJsonSafe(res)) as T;
}

async function httpDelete<T>(
  endpoint: string,
  options?: FetchOptions,
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (accessToken && refreshToken) {
    await tryRefreshToken(accessToken, refreshToken);
  }

  const cookieHeader = await getCookieHeader();
  const baseUrl = options?.isAuth ? BACKEND_URL : API_URL;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorData = await parseJsonSafe(res);
    throw {
      response: {
        data: errorData,
      },
      message: errorData?.message || 'Request failed',
    };
  }

  return (await parseJsonSafe(res)) as T;
}

export const serverHttpClient = {
  get: httpGet,
  post: httpPost,
  patch: httpPatch,
  delete: httpDelete,
};
