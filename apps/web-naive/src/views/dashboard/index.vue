<template>
  <div class="p-6">
    <n-grid :cols="4" :x-gap="16" class="mb-4">
      <n-gi v-for="card in statCards" :key="card.title">
        <n-card size="small">
          <n-statistic :label="card.title" :value="card.value" />
        </n-card>
      </n-gi>
    </n-grid>
    <n-card title="欢迎使用 Fast Vue3 · Naive UI">
      <p class="text-gray-600">
        这是基于 Naive UI 的应用，运行在 Fast Vue3 Monorepo 工程平台上。
      </p>
      <p class="text-gray-500 mt-2 text-sm">
        共享基础设施：request / stores / utils / locales / access
      </p>
      <n-divider />
      <n-descriptions label-placement="left" bordered :column="2">
        <n-descriptions-item label="UI 框架">Naive UI</n-descriptions-item>
        <n-descriptions-item label="端口">3003</n-descriptions-item>
        <n-descriptions-item label="构建工具">Vite 7</n-descriptions-item>
        <n-descriptions-item label="语言">TypeScript 5</n-descriptions-item>
        <n-descriptions-item label="状态管理">Pinia</n-descriptions-item>
        <n-descriptions-item label="路由">Vue Router 4</n-descriptions-item>
      </n-descriptions>
    </n-card>
  </div>
</template>

<script setup lang="ts">
  const statCards = [
    { title: '今日访问', value: 1024 },
    { title: '在线用户', value: 32 },
    { title: '待处理任务', value: 8 },
    { title: '系统状态', value: '正常' },
  ];
</script>
