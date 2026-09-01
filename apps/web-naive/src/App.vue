<script setup lang="ts">
import { computed } from 'vue';

import { usePreferences } from '@fast-vue3/preferences';

import { darkTheme, NConfigProvider } from 'naive-ui';
import { storeToRefs } from 'pinia';

const prefs = usePreferences();
const { isDark, preferences } = storeToRefs(prefs);

const naiveTheme = computed(() => (isDark.value ? darkTheme : null));
const naiveOverrides = computed(() => ({
  common: {
    primaryColor: preferences.value.primaryColor,
    primaryColorHover: preferences.value.primaryColor,
    primaryColorPressed: preferences.value.primaryColor,
    primaryColorSuppl: preferences.value.primaryColor,
  },
}));
</script>

<template>
  <NConfigProvider :theme="naiveTheme" :theme-overrides="naiveOverrides">
    <RouterView />
  </NConfigProvider>
</template>
