<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui';

import Layout from './layout/index.vue';
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider>
      <Layout />
    </NMessageProvider>
  </NConfigProvider>
</template>
