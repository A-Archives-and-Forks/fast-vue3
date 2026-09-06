import { defineConfig } from '@fast-vue3/vite-config';

import { PrimeVueResolver } from '@primevue/auto-import-resolver';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [PrimeVueResolver()],
      uiAutoImportResolvers: [],
    },
  };
});
