const isProduction = process.env.NODE_ENV === 'production';

const DEFAULT_BACKEND_URL = isProduction
  ? 'https://skill-bridge-backend-nine.vercel.app'
  : 'http://localhost:5000';

const DEFAULT_FRONTEND_URL = isProduction
  ? 'https://skill-bridge-sooty-five.vercel.app'
  : 'http://localhost:3000';

const BACKEND_URL = process.env.BACKEND_URL || DEFAULT_BACKEND_URL;

const FRONTEND_URL = process.env.FRONTEND_URL || DEFAULT_FRONTEND_URL;

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  `${BACKEND_URL}/api/v1`;

const AUTH_URL =
  process.env.AUTH_URL ||
  process.env.NEXT_PUBLIC_AUTH_BASE_URL ||
  `${BACKEND_URL}/api/auth`;

export const env = {
  BACKEND_URL,
  FRONTEND_URL,
  API_URL,
  AUTH_URL,
};
