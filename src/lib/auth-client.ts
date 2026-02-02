import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  baseURL: 'https://skill-bridge-backend-nine.vercel.app',
});
