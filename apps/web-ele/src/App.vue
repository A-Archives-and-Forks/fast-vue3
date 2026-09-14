<script setup lang="ts">
import zhCN from 'element-plus/es/locale/lang/zh-cn';
</script>

<template>
  <ElConfigProvider :locale="zhCN">
    <RouterView />
  </ElConfigProvider>
</template>
