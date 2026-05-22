import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from '@fast-vue3/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [ArcoResolver({ sideEffect: true })],
    },
    vite: {
      server: { port: 3004 },
    },
  };
});
