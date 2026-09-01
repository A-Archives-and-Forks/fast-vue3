<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col gap-4">
    <n-result status="404" title="404" description="抱歉，您访问的页面不存在。">
      <template #footer>
        <n-button type="primary" @click="router.push('/home')">
          返回首页
        </n-button>
      </template>
    </n-result>
  </div>
</template>
