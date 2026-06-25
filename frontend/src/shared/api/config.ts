export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_ANALYTICS: '/auth/analytics',

  // Books
  BOOKS_LIST: '/books',
  BOOKS_GET: (isbn13: string) => `/books/${isbn13}`,
  BOOKS_CREATE: '/books',
  BOOKS_UPDATE: (isbn13: string) => `/books/${isbn13}`,
  BOOKS_DELETE: (isbn13: string) => `/books/${isbn13}`,
} as const;