<template>
  <div class="p-6">
    <a-row :gutter="16">
      <a-col v-for="card in statCards" :key="card.title" :span="6">
        <a-card :bordered="false" class="mb-4 shadow-sm">
          <a-statistic :title="card.title" :value="card.value" />
        </a-card>
      </a-col>
    </a-row>
    <a-card title="欢迎使用 Fast Vue3 · Arco Design" :bordered="false" class="shadow-sm">
      <p class="text-gray-600">
        这是基于 Arco Design 的应用，运行在 Fast Vue3 Monorepo 工程平台上。
      </p>
      <p class="text-gray-500 mt-2 text-sm">
        共享基础设施：request / stores / utils / locales / access
      </p>
      <a-divider />
      <a-descriptions title="工程信息" :column="2" bordered>
        <a-descriptions-item label="UI 框架">Arco Design Vue</a-descriptions-item>
        <a-descriptions-item label="端口">3004</a-descriptions-item>
        <a-descriptions-item label="构建工具">Vite 7</a-descriptions-item>
        <a-descriptions-item label="语言">TypeScript 5</a-descriptions-item>
        <a-descriptions-item label="状态管理">Pinia</a-descriptions-item>
        <a-descriptions-item label="路由">Vue Router 4</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  const statCards: Array<{ title: string; value: number }> = [
    { title: '今日访问', value: 1024 },
    { title: '在线用户', value: 32 },
    { title: '待处理任务', value: 8 },
    { title: '系统正常率', value: 100 },
  ];
</script>
