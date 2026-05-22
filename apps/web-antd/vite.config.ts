import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from '@fast-vue3/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [
        AntDesignVueResolver({ resolveIcons: true, importStyle: false }),
      ],
    },
    vite: {
      server: {
        port: 3001,
        proxy: {
          '/api': {
            changeOrigin: true,
            target: 'http://localhost:5320/api',
            rewrite: (path: string) => path.replace(/^\/api/, ''),
          },
        },
      },
    },
  };
});
