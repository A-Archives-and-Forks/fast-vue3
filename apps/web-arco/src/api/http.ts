import { createHttpClient, createRequest } from '@fast-vue3/request';
const client = createHttpClient(
  import.meta.env.VITE_APP_API_BASEURL ?? '/api/v1',
);
export const http = createRequest(client);
