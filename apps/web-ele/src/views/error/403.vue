<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col">
    <el-result
      icon="error"
      title="403"
      sub-title="抱歉，您没有权限访问该页面。"
    >
      <template #extra>
        <el-button type="primary" @click="router.push('/home')">
          返回首页
        </el-button>
        <el-button @click="router.back()"> 返回上页 </el-button>
      </template>
    </el-result>
  </div>
</template>
