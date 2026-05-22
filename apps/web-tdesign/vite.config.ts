import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';
import { defineConfig } from '@fast-vue3/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [TDesignResolver({ library: 'vue-next' })],
    },
    vite: {
      server: { port: 3005 },
    },
  };
});
