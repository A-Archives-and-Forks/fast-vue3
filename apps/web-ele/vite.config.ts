import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from '@fast-vue3/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [ElementPlusResolver({ importStyle: false })],
    },
    vite: {
      server: { port: 3002 },
    },
  };
});
