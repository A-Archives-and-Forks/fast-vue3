import type { Api } from '@fast-vue3/api';

import { createApi, createStaticMockApi } from '@fast-vue3/api';

import { http } from './http';

export const api: Api =
  import.meta.env.VITE_STATIC_MOCK === 'true'
    ? createStaticMockApi()
    : createApi(http);

export * from '@fast-vue3/api';
