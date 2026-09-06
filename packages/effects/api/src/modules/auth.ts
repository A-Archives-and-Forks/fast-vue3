import type { RequestClient } from '@fast-vue3/request';

import type {
  LoginParams,
  RegisterParams,
  RegisterResult,
  TokenResult,
  UserInfo,
} from '../types';

export function createAuthApi(http: RequestClient) {
  return {
    login: (data: LoginParams) =>
      http.post<TokenResult>({ data, url: '/auth/login' }),

    logout: (refreshToken: string) =>
      http.post<undefined>({ data: { refreshToken }, url: '/auth/logout' }),

    me: () => http.get<UserInfo>({ url: '/auth/me' }),

    register: (data: RegisterParams) =>
      http.post<RegisterResult>({ data, url: '/auth/register' }),

    refresh: (refreshToken: string) =>
      http.post<TokenResult>({ data: { refreshToken }, url: '/auth/refresh' }),
  };
}
