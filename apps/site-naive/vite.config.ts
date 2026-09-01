import { defineConfig } from '@fast-vue3/vite-config';

import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [NaiveUiResolver()],
    },
  };
});
