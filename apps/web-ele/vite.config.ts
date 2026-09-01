import { defineConfig } from '@fast-vue3/vite-config';

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [ElementPlusResolver()],
    },
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            target: 'http://localhost:5320',
            ws: true,
          },
        },
      },
    },
  };
});
