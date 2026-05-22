import { defineStore } from 'pinia';

import type { AppState } from './types';

export const useAppStore = defineStore('fast-vue3-app', {
  state: (): AppState => ({
    title: 'Fast Vue3',
    theme: 'light',
    locale: 'zh-CN',
    collapsed: false,
  }),
  getters: {
    isDark: (state) => state.theme === 'dark',
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
    },
    setLocale(locale: string) {
      this.locale = locale;
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
  persist: {
    pick: ['theme', 'locale', 'collapsed'],
  },
});
