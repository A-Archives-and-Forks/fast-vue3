import type { PluginOption } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export interface UnPluginOptions {
  /**
   * 是否启用自动导入
   * @default true
   */
  autoImport?: boolean;
  /**
   * 是否启用组件自动注册
   * @default true
   */
  components?: boolean;
  /**
   * 仅传给 AutoImport 的 resolvers,未指定时回退为 uiResolvers
   */
  uiAutoImportResolvers?: any[];
  /**
   * UI 组件库 resolvers
   */
  uiResolvers?: any[];
}

/**
 * 创建 UI 组件自动导入和注册插件
 */
export function viteUnpluginPlugin(options: UnPluginOptions): PluginOption[] {
  const {
    uiResolvers = [],
    uiAutoImportResolvers = uiResolvers,
    autoImport = true,
    components = true,
  } = options;

  const plugins: PluginOption[] = [];

  if (autoImport) {
    plugins.push(
      AutoImport({
        dts: './types/auto-imports.d.ts',
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
        resolvers: [...uiAutoImportResolvers],
      }),
    );
  }

  if (components) {
    plugins.push(
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        deep: true,
        dts: './types/components.d.ts',
        directoryAsNamespace: false,
        directives: true,
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
        resolvers: [...uiResolvers],
      }),
    );
  }

  return plugins;
}
