<script setup lang="ts">
import { usePreferences } from '@fast-vue3/preferences';

import { theme } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const prefs = usePreferences();

const antdTheme = computed(() => ({
  algorithm: prefs.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: prefs.preferences.primaryColor,
  },
}));
</script>

<template>
  <AConfigProvider :locale="zhCN" :theme="antdTheme">
    <RouterView />
  </AConfigProvider>
</template>
