<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col gap-4">
    <div class="text-center">
      <div class="text-8xl font-bold text-red-200">500</div>
      <div class="text-xl font-bold text-gray-700 mt-2">服务器错误</div>
      <div class="text-gray-500 mt-2">抱歉，服务器出现异常，请稍后重试。</div>
      <t-space class="mt-6">
        <t-button theme="primary" @click="router.push('/home')">
          返回首页
        </t-button>
        <t-button @click="router.back()"> 返回上页 </t-button>
      </t-space>
    </div>
  </div>
</template>
