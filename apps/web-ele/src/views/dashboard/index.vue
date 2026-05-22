<template>
  <div class="p-6">
    <el-row :gutter="16">
      <el-col v-for="card in statCards" :key="card.title" :span="6">
        <el-card shadow="never" class="mb-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-gray-500">{{ card.title }}</div>
              <div class="text-2xl font-bold mt-1">{{ card.value }}</div>
            </div>
            <el-icon :size="40" :class="card.color">
              <component :is="card.icon" />
            </el-icon>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card header="欢迎使用 Fast Vue3 · Element Plus" shadow="never">
      <p class="text-gray-600">
        这是基于 Element Plus 的应用，运行在 Fast Vue3 Monorepo 工程平台上。
      </p>
      <p class="text-gray-500 mt-2 text-sm">
        共享基础设施：request / stores / utils / locales / access
      </p>
      <el-divider />
      <el-descriptions title="工程信息" :column="2" border>
        <el-descriptions-item label="UI 框架">Element Plus</el-descriptions-item>
        <el-descriptions-item label="端口">3002</el-descriptions-item>
        <el-descriptions-item label="构建工具">Vite 7</el-descriptions-item>
        <el-descriptions-item label="语言">TypeScript 5</el-descriptions-item>
        <el-descriptions-item label="状态管理">Pinia</el-descriptions-item>
        <el-descriptions-item label="路由">Vue Router 4</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { User, TrendCharts, Timer, SuccessFilled } from '@element-plus/icons-vue';

  const statCards = [
    { title: '今日访问', value: 1024, icon: TrendCharts, color: 'text-blue-500' },
    { title: '在线用户', value: 32, icon: User, color: 'text-green-500' },
    { title: '待处理任务', value: 8, icon: Timer, color: 'text-orange-500' },
    { title: '系统状态', value: '正常', icon: SuccessFilled, color: 'text-emerald-500' },
  ];
</script>
