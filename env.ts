const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

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
