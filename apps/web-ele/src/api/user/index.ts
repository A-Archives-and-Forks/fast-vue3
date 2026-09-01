import type { RoleType } from '@fast-vue3/shared';

import { http } from '../http';

interface LoginParams {
  username: string;
  password: string;
}

interface LoginResult {
  token: string;
}

export const userApi = {
  login: (params: LoginParams) =>
    http.post<LoginResult>({ url: '/user/login', data: params }),

  logout: () => http.post<undefined>({ url: '/user/logout' }),

  getProfile: () =>
    http.get<{ avatar: string; role: RoleType; userName: string }>({
      url: '/user/profile',
    }),
};
