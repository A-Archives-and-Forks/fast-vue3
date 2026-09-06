import type { RequestClient } from '@fast-vue3/request';

import type {
  CreateUserParams,
  PageResult,
  UpdateUserParams,
  UserItem,
  UserQuery,
} from '../types';

export function createUserApi(http: RequestClient) {
  return {
    create: (data: CreateUserParams) =>
      http.post<UserItem>({ data, url: '/users' }),

    delete: (id: number) => http.del<undefined>({ url: `/users/${id}` }),

    detail: (id: number) => http.get<UserItem>({ url: `/users/${id}` }),

    list: (params: UserQuery = {}) =>
      http.get<PageResult<UserItem>>({ params, url: '/users' }),

    update: (id: number, data: UpdateUserParams) =>
      http.put<UserItem>({ data, url: `/users/${id}` }),
  };
}
