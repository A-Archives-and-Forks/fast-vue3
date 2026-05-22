import type { PluginOption, UserConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig, loadEnv, mergeConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { viteMockServe } from 'vite-plugin-mock';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'node:path';

export interface ApplicationOptions {
  /** 额外的 unplugin-vue-components resolvers（由各 app 传入 UI 库 resolver） */
  uiResolvers?: any[];
  /** 额外的 unplugin-auto-import resolvers */
  autoImportResolvers?: any[];
  /** 额外的 Vite 插件 */
  extraPlugins?: PluginOption[];
  /** 是否启用 SVG 图标插件 */
  svgIcons?: boolean;
}

export interface DefineConfigOptions {
  application?: ApplicationOptions;
  vite?: UserConfig;
}

type UserConfigFn = () => DefineConfigOptions | Promise<DefineConfigOptions>;

export function defineApplicationConfig(userConfigFn?: UserConfigFn) {
  return defineConfig(async ({ command, mode }) => {
    const opts = await userConfigFn?.();
    const { application = {}, vite = {} } = opts ?? {};
    const root = process.cwd();
    const isBuild = command === 'build';
    const env = loadEnv(mode, root);

    const {
      uiResolvers = [],
      autoImportResolvers = [],
      extraPlugins = [],
      svgIcons = false,
    } = application;

    const plugins: PluginOption[] = [
      // 文件系统路由（需要在 vue() 前）
      VueRouter({
        routesFolder: ['src/views'],
        dts: 'types/typed-router.d.ts',
        extensions: ['.vue'],
      }),
      vue(),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        imports: [
          'vue',
          'pinia',
          '@vueuse/core',
          VueRouterAutoImports,
        ],
        resolvers: autoImportResolvers,
      }),
      Components({
        dirs: ['src/components'],
        dts: 'types/components.d.ts',
        extensions: ['vue'],
        resolvers: uiResolvers,
      }),
    ];

    if (svgIcons) {
      plugins.push(
        createSvgIconsPlugin({
          iconDirs: [resolve(root, 'src/assets/icons/svg')],
          symbolId: 'icon-[dir]-[name]',
        }),
      );
    }

    if (!isBuild) {
      plugins.push(
        viteMockServe({
          mockPath: 'mock',
          enable: true,
        }),
      );
    }

    plugins.push(visualizer({ open: false, filename: 'stats.html' }));
    plugins.push(...extraPlugins);

    if (isBuild && env.VITE_USE_COMPRESS === 'true') {
      plugins.push(compression({ algorithm: 'gzip', threshold: 10240 }));
    }

    const baseConfig: UserConfig = {
      base: env.VITE_BASE_URL || '/',
      resolve: {
        alias: {
          '@': resolve(root, 'src'),
          '#': resolve(root, 'types'),
        },
      },
      plugins,
      css: {
        preprocessorOptions: {
          less: { javascriptEnabled: true },
        },
      },
      server: {
        port: Number(env.VITE_PORT) || 3000,
        host: '0.0.0.0',
        cors: true,
        hmr: { overlay: true },
      },
      build: {
        target: 'es2015',
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
          output: {
            manualChunks: {
              'vue-core': ['vue', 'vue-router', 'pinia'],
            },
          },
        },
      },
    };

    return mergeConfig(baseConfig, vite);
  });
}
