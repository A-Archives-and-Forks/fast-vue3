/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */

import Components from 'unplugin-vue-components/vite';
import {
  ElementPlusResolver,
  VueUseComponentsResolver,
  AntDesignVueResolver,
  NaiveUiResolver,
  DevUiResolver,
  IduxResolver,
  ArcoResolver,
} from 'unplugin-vue-components/resolvers';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';

export const AutoRegistryComponents = () => {
  return Components({
    dirs: ['src/components'],
    extensions: ['vue', 'md'],
    deep: true,
    dts: 'types/components.d.ts',
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      ElementPlusResolver(),
      VueUseComponentsResolver(),
      AntDesignVueResolver({ resolveIcons: true, importStyle: false, prefix: 'Ant' }),
      TDesignResolver({
        library: 'vue-next',
      }),
      ArcoResolver({
        sideEffect: true,
      }),
      NaiveUiResolver(),
      DevUiResolver(),
      IduxResolver({ importStyle: 'css' }),
    ],
  });
};
