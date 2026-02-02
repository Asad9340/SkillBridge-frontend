import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  baseURL: 'https://skill-bridge-sooty-five.vercel.app/api/auth',
});
