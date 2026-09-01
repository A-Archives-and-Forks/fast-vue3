<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col gap-4">
    <div class="text-center">
      <div class="text-8xl font-bold text-gray-200">404</div>
      <div class="text-xl font-bold text-gray-700 mt-2">页面不存在</div>
      <div class="text-gray-500 mt-2">抱歉，您访问的页面不存在。</div>
      <t-button theme="primary" class="mt-6" @click="router.push('/home')">
        返回首页
      </t-button>
    </div>
  </div>
</template>
