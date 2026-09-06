import { defineConfig } from '@fast-vue3/vite-config';

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [
        AntDesignVueResolver({ resolveIcons: true, importStyle: false }),
      ],
    },
  };
});
