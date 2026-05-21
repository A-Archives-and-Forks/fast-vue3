// env.d.ts
/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv extends ViteEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_PORT: string;
  readonly VITE_OPEN_PROXY: string;
  readonly VITE_USE_MOCK: string;
  readonly VITE_USE_COMPRESS: string;
  readonly VITE_APP_API_BASEURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
