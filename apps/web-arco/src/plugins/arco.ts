import type { App } from 'vue';

import { watch } from 'vue';

import { usePreferences } from '@fast-vue3/preferences';

import { storeToRefs } from 'pinia';

export function setupArco(_app: App) {
  // Arco Design 通过 unplugin-vue-components + ArcoResolver 自动按需引入
  // Arco 暗色模式依赖 <html arco-theme="dark"> 属性，而非 .dark class
  const { isDark } = storeToRefs(usePreferences());

  const applyArcoTheme = (dark: boolean) => {
    document.documentElement.setAttribute(
      'arco-theme',
      dark ? 'dark' : 'light',
    );
  };

  applyArcoTheme(isDark.value);
  watch(isDark, applyArcoTheme);
}
