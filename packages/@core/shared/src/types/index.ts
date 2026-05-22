/** 公共类型定义 */

export type Recordable<T = any> = Record<string, T>;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

/** API 响应通用结构 */
export interface IResponse<T = any> {
  code: number | string;
  result: T;
  message: string;
  status: string | number;
}

/** 分页响应结构 */
export interface IPageResult<T = any> {
  items: T[];
  total: number;
}

/** 分页请求参数 */
export interface IPageParams {
  page: number;
  pageSize: number;
}

export type RoleType = '' | '*' | 'admin' | 'user';

export interface ViteEnv {
  VITE_BASE_URL: string;
  VITE_PORT: number;
  VITE_APP_API_BASEURL: string;
  VITE_USE_MOCK: boolean;
  VITE_USE_COMPRESS: boolean;
  VITE_OPEN_PROXY: boolean;
  VITE_APP_NAMESPACE: string;
}
