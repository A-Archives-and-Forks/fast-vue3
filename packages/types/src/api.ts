export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface PageParams {
  page: number;
  pageSize: number;
}

export interface PageResult<T = any> {
  items: T[];
  total: number;
}
