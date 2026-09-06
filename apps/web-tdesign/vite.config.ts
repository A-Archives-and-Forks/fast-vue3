import { defineConfig } from '@fast-vue3/vite-config';

import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [TDesignResolver({ library: 'vue-next' })],
    },
  };
});
