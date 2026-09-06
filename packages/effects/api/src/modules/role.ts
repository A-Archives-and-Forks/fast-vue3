import type { RequestClient } from '@fast-vue3/request';

import type {
  CreateRoleParams,
  PageResult,
  RoleItem,
  RoleQuery,
  UpdateRoleParams,
} from '../types';

export function createRoleApi(http: RequestClient) {
  return {
    create: (data: CreateRoleParams) =>
      http.post<RoleItem>({ data, url: '/roles' }),

    delete: (id: number) => http.del<undefined>({ url: `/roles/${id}` }),

    detail: (id: number) => http.get<RoleItem>({ url: `/roles/${id}` }),

    list: (params: RoleQuery = {}) =>
      http.get<PageResult<RoleItem>>({ params, url: '/roles' }),

    update: (id: number, data: UpdateRoleParams) =>
      http.put<RoleItem>({ data, url: `/roles/${id}` }),
  };
}
