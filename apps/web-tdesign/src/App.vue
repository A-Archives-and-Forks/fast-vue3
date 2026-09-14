<script setup lang="ts">
import type { GlobalConfigProvider } from 'tdesign-vue-next/es/config-provider/type';

import zhCN from 'tdesign-vue-next/es/locale/zh_CN';

// ConfigProvider types its lists as mutable, while the locale preset uses readonly tuples.
const locale = {
  ...zhCN,
  datePicker: {
    ...zhCN.datePicker,
    months: [...zhCN.datePicker.months],
    quarters: [...zhCN.datePicker.quarters],
    weekdays: [...zhCN.datePicker.weekdays],
  },
  rate: { ...zhCN.rate, rateText: [...zhCN.rate.rateText] },
} satisfies GlobalConfigProvider;
</script>

<template>
  <TConfigProvider :global-config="locale">
    <RouterView />
  </TConfigProvider>
</template>
