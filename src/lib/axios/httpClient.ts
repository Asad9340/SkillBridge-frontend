import { env } from '../../../env';

const API_URL = env.API_URL;

interface FetchOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

async function httpGet<T>(
  endpoint: string,
  options?: FetchOptions,
): Promise<T> {
  const url = new URL(`${API_URL}${endpoint}`);
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  return res.json();
}

async function httpPost<T>(
  endpoint: string,
  data: unknown,
  options?: FetchOptions,
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
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
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
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
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  return res.json();
}

export const httpClient = {
  get: httpGet,
  post: httpPost,
  patch: httpPatch,
  delete: httpDelete,
};
