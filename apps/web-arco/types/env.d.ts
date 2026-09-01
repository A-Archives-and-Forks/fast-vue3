// / <reference types="vite/client" />
// / <reference types="unplugin-vue-router/client" />
interface ImportMetaEnv {
  readonly VITE_APP_NAMESPACE: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_PORT: string;
  readonly VITE_APP_API_BASEURL: string;
  readonly VITE_USE_MOCK: string;
  readonly VITE_USE_COMPRESS: string;
  readonly VITE_NITRO_MOCK: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
