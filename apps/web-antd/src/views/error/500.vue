<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex-center flex-col h-screen gap-6 bg-gray-50">
    <AResult
      status="500"
      title="500"
      sub-title="抱歉，服务器出现异常，请稍后重试。"
    >
      <template #extra>
        <AButton type="primary" @click="router.push('/home')">
          返回首页
        </AButton>
        <AButton @click="router.back()"> 返回上页 </AButton>
      </template>
    </AResult>
  </div>
</template>
