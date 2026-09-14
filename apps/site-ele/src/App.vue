<script setup lang="ts">
import zhCN from 'element-plus/es/locale/lang/zh-cn';

import Layout from './layout/index.vue';
</script>

<template>
  <ElConfigProvider :locale="zhCN">
    <Layout />
  </ElConfigProvider>
</template>
