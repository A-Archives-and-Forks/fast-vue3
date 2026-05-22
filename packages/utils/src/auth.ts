import { TOKEN_KEY, TOKEN_PREFIX } from '@fast-vue3/shared';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function getAuthHeader(): string | null {
  const token = getToken();
  return token ? `${TOKEN_PREFIX}${token}` : null;
}
