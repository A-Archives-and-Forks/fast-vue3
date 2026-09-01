<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex-center flex-col h-screen gap-6 bg-gray-50">
    <AResult status="404" title="404" sub-title="抱歉，您访问的页面不存在。">
      <template #extra>
        <AButton type="primary" @click="router.push('/home')">
          返回首页
        </AButton>
      </template>
    </AResult>
  </div>
</template>
