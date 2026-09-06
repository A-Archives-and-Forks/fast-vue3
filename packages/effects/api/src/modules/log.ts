import type { RequestClient } from '@fast-vue3/request';

import type {
  ErrorLogItem,
  ErrorLogQuery,
  LoginLogItem,
  OperationLogItem,
  OperationLogQuery,
  PageQuery,
  PageResult,
} from '../types';

export function createLogApi(http: RequestClient) {
  return {
    error: (params: ErrorLogQuery = {}) =>
      http.get<PageResult<ErrorLogItem>>({ params, url: '/log/error' }),

    login: (params: PageQuery = {}) =>
      http.get<PageResult<LoginLogItem>>({ params, url: '/log/login' }),

    operation: (params: OperationLogQuery = {}) =>
      http.get<PageResult<OperationLogItem>>({ params, url: '/log/operation' }),
  };
}
