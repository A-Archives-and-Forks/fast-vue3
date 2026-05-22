import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from '@fast-vue3/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [NaiveUiResolver()],
    },
    vite: {
      server: { port: 3003 },
    },
  };
});
