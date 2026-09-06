import type { RequestClient } from '@fast-vue3/request';

import type { CreateMenuParams, MenuItem, UpdateMenuParams } from '../types';

export function createMenuApi(http: RequestClient) {
  return {
    create: (data: CreateMenuParams) =>
      http.post<MenuItem>({ data, url: '/menus' }),

    delete: (id: number) => http.del<undefined>({ url: `/menus/${id}` }),

    detail: (id: number) => http.get<MenuItem>({ url: `/menus/${id}` }),

    /** 当前登录用户的菜单树 */
    mine: () => http.get<MenuItem[]>({ url: '/menus' }),

    /** 全量菜单树（需要 menu:list 权限） */
    tree: () => http.get<MenuItem[]>({ url: '/menus/tree' }),

    update: (id: number, data: UpdateMenuParams) =>
      http.put<MenuItem>({ data, url: `/menus/${id}` }),
  };
}
