<script setup lang="ts">
import { computed } from 'vue';

import { usePreferences } from '@fast-vue3/preferences';

import { theme } from 'ant-design-vue';

const prefs = usePreferences();

const antdTheme = computed(() => ({
  algorithm: prefs.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: prefs.preferences.primaryColor,
  },
}));
</script>

<template>
  <AConfigProvider :theme="antdTheme">
    <RouterView />
  </AConfigProvider>
</template>
