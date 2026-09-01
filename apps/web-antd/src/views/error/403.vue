<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex-center flex-col h-screen gap-6 bg-gray-50">
    <AResult status="403" title="403" sub-title="抱歉，您没有权限访问该页面。">
      <template #extra>
        <AButton type="primary" @click="router.push('/home')">
          返回首页
        </AButton>
        <AButton @click="router.back()"> 返回上页 </AButton>
      </template>
    </AResult>
  </div>
</template>
