import { createAuthClient } from 'better-auth/react';

const AUTH_BASE_URL =
  process.env.NEXT_PUBLIC_AUTH_BASE_URL || 'http://localhost:5000/api/auth';

export const authClient = createAuthClient({
  baseURL: AUTH_BASE_URL,
  fetchOptions: {
    credentials: 'include',
  },
});
