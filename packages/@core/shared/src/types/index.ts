/** 公共类型定义 */

export type Recordable<T = any> = Record<string, T>;

export type Nullable<T> = null | T;

export type Optional<T> = T | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

/** API 响应通用结构（code === 0 表示成功） */
export interface IResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

/** 分页响应结构 */
export interface IPageResult<T = any> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

/** 分页请求参数 */
export interface IPageParams {
  page: number;
  pageSize: number;
}

/** 登录 / 刷新令牌响应 */
export interface ITokenResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

/** 当前用户信息 */
export interface IUserInfo {
  id: number;
  nickname: string;
  permissions: string[];
  roles: string[];
  username: string;
}

export type RoleType = '' | '*' | 'admin' | 'user';

export interface ViteEnv {
  VITE_APP_API_BASEURL: string;
  VITE_APP_NAMESPACE: string;
  VITE_BASE_URL: string;
  VITE_COMPRESS: string;
  VITE_DEV_BACKEND: 'mock' | 'server';
  VITE_FAST_VUE3_SERVER_URL: string;
  VITE_PORT: number;
}
