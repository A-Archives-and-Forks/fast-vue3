import type { ITokenResponse, IUserInfo, RoleType } from '@fast-vue3/shared';

import { getRefreshToken } from '@fast-vue3/utils';

import { http } from '../http';

interface LoginParams {
  username: string;
  password: string;
}

export type LoginResult = ITokenResponse;

export interface Profile {
  avatar: string;
  role: RoleType;
  userName: string;
}

export const authApi = {
  login: (params: LoginParams) =>
    http.post<LoginResult>({ url: '/auth/login', data: params }),

  logout: () =>
    http.post<undefined>({
      url: '/auth/logout',
      data: { refreshToken: getRefreshToken() ?? '' },
    }),

  refresh: () =>
    http.post<LoginResult>({
      url: '/auth/refresh',
      data: { refreshToken: getRefreshToken() ?? '' },
    }),

  me: () => http.get<IUserInfo>({ url: '/auth/me' }),
};

/**
 * 兼容旧调用方的 userApi：login 返回令牌，getProfile 返回适配后的用户信息。
 */
export const userApi = {
  login: authApi.login,
  logout: authApi.logout,
  getProfile: async (): Promise<Profile> => {
    const info = await authApi.me();
    return {
      avatar: '',
      role: (info.roles[0] as RoleType) ?? '',
      userName: info.nickname || info.username,
    };
  },
};
