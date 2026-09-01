<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col gap-4">
    <div style="font-size: 5rem; font-weight: 700; color: #e5e7eb">404</div>
    <div style="font-size: 1.25rem; font-weight: 700; color: #374151">
      页面不存在
    </div>
    <IxButton mode="primary" @click="router.push('/home')"> 返回首页 </IxButton>
  </div>
</template>
