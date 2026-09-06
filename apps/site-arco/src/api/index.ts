import type { Api } from '@fast-vue3/api';

import { createApi } from '@fast-vue3/api';

import { http } from './http';

export const api: Api = createApi(http);

export * from '@fast-vue3/api';
