<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col gap-4">
    <n-result
      status="500"
      title="500"
      description="抱歉，服务器出现异常，请稍后重试。"
    >
      <template #footer>
        <n-space>
          <n-button type="primary" @click="router.push('/home')">
            返回首页
          </n-button>
          <n-button @click="router.back()"> 返回上页 </n-button>
        </n-space>
      </template>
    </n-result>
  </div>
</template>
