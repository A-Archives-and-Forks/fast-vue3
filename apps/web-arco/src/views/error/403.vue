<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col gap-4">
    <a-result status="403" title="403" subtitle="抱歉，您没有权限访问该页面。">
      <template #extra>
        <a-space>
          <a-button type="primary" @click="router.push('/home')">
            返回首页
          </a-button>
          <a-button @click="router.back()"> 返回上页 </a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>
