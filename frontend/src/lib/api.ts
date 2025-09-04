// Utility to get backend base URL from Vite env
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export function apiUrl(path: string) {
  // Ensures no double slashes
  return `${BACKEND_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
