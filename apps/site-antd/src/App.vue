<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';

import Layout from './layout/index.vue';
</script>

<template>
  <AConfigProvider :locale="zhCN">
    <Layout />
  </AConfigProvider>
</template>
