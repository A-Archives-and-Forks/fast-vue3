<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col gap-4">
    <a-result status="404" title="404" subtitle="抱歉，您访问的页面不存在。">
      <template #extra>
        <a-button type="primary" @click="router.push('/home')">
          返回首页
        </a-button>
      </template>
    </a-result>
  </div>
</template>
