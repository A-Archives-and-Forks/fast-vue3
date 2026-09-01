<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col gap-4">
    <div style="font-size: 5rem; font-weight: 700; color: #fecaca">500</div>
    <div style="font-size: 1.25rem; font-weight: 700; color: #374151">
      服务器错误
    </div>
    <div style="color: #6b7280">抱歉，服务器出现异常，请稍后重试。</div>
    <div class="flex gap-2">
      <IxButton mode="primary" @click="router.push('/home')">
        返回首页
      </IxButton>
      <IxButton @click="router.back()"> 返回上页 </IxButton>
    </div>
  </div>
</template>
