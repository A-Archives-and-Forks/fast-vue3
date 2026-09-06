import type { RequestClient } from '@fast-vue3/request';

import type { PermissionItem } from '../types';

export function createPermissionApi(http: RequestClient) {
  return {
    create: (data: Omit<PermissionItem, 'id'>) =>
      http.post<PermissionItem>({ data, url: '/permissions' }),

    delete: (id: number) => http.del<undefined>({ url: `/permissions/${id}` }),

    list: () => http.get<PermissionItem[]>({ url: '/permissions' }),

    update: (id: number, data: Partial<Omit<PermissionItem, 'id'>>) =>
      http.put<PermissionItem>({ data, url: `/permissions/${id}` }),
  };
}
