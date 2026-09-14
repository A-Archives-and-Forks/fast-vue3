import { createApi } from '@fast-vue3/api';

import { http } from './http';

export const api = createApi(http);

export * from '@fast-vue3/api';
