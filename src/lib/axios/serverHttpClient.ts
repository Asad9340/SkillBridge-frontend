import 'server-only';

import { cookies } from 'next/headers';
import { env } from '../../../env';

const API_URL = env.API_URL;

interface FetchOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  cache?: RequestCache;
  tags?: string[];
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
  const cookieHeader = await getCookieHeader();
  const url = new URL(`${API_URL}${endpoint}`);

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
  return res.json();
}

async function httpPost<T>(
  endpoint: string,
  data: unknown,
  options?: FetchOptions,
): Promise<T> {
  const cookieHeader = await getCookieHeader();

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
      ...options?.headers,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

async function httpPatch<T>(
  endpoint: string,
  data: unknown,
  options?: FetchOptions,
): Promise<T> {
  const cookieHeader = await getCookieHeader();

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
      ...options?.headers,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

async function httpDelete<T>(
  endpoint: string,
  options?: FetchOptions,
): Promise<T> {
  const cookieHeader = await getCookieHeader();

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
      ...options?.headers,
    },
  });

  return res.json();
}

export const serverHttpClient = {
  get: httpGet,
  post: httpPost,
  patch: httpPatch,
  delete: httpDelete,
};
