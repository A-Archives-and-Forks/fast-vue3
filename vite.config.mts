import { fileURLToPath, URL } from 'node:url';

import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';

import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugins';
import proxy from './build/vite/proxy';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    base: process.env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
      },

      extensions: ['.ts', '.js', '.mjs', '.mts'],
    },

    // plugins
    plugins: createVitePlugins(viteEnv, isBuild),

    // css
    css: {},

    // server
    server: {
      hmr: { overlay: true },
      // 服务配置
      port: 3000, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 为开发服务器配置 CORS
      host: '0.0.0.0', // IP配置，支持从IP启动
      proxy,
    },
  };
};
