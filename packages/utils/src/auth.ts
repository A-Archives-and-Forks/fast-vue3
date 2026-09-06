import { REFRESH_TOKEN_KEY, TOKEN_KEY, TOKEN_PREFIX } from '@fast-vue3/shared';

export function getToken(): null | string {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getRefreshToken(): null | string {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function getAuthHeader(): null | string {
  const token = getToken();
  return token ? `${TOKEN_PREFIX}${token}` : null;
}
