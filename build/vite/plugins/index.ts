/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { PluginOption } from 'vite';
import VitePluginCertificate from 'vite-plugin-mkcert';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

import { AutoImportDeps } from './autoImport';
import { AutoRegistryComponents } from './component';
import { ConfigCompressPlugin } from './compress';
import { ConfigImageminPlugin } from './imagemin';
import { ConfigMockPlugin } from './mock';
import { ConfigPagesPlugin } from './pages';
import { ConfigProgressPlugin } from './progress';
import { ConfigRestartPlugin } from './restart';
import { ConfigSvgIconsPlugin } from './svgIcons';
import { ConfigUnocssPlugin } from './unocss';
import { ConfigVisualizerConfig } from './visualizer';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK, VITE_USE_COMPRESS } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // 自动生成路由
    ConfigPagesPlugin(),
    // Vue 核心支持
    vue(),
    // JSX 支持
    vueJsx(),
    // setup 语法糖组件名支持
    vueSetupExtend(),
    // 提供 https 证书（开发环境）
    VitePluginCertificate({ source: 'coding' }),
  ];

  // 自动按需引入组件
  vitePlugins.push(AutoRegistryComponents());

  // 自动按需引入依赖
  vitePlugins.push(AutoImportDeps());

  // 监听配置文件改动重启
  vitePlugins.push(ConfigRestartPlugin());

  // 构建时显示进度条
  vitePlugins.push(ConfigProgressPlugin());

  // UnoCSS
  vitePlugins.push(ConfigUnocssPlugin());

  // SVG 图标
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild));

  // Mock 服务
  if (VITE_USE_MOCK) {
    vitePlugins.push(ConfigMockPlugin(isBuild));
  }

  // 构建产物分析
  vitePlugins.push(ConfigVisualizerConfig());

  if (isBuild) {
    // 图片压缩
    vitePlugins.push(ConfigImageminPlugin());

    // Gzip 压缩
    if (VITE_USE_COMPRESS) {
      vitePlugins.push(ConfigCompressPlugin());
    }
  }

  return vitePlugins;
}
