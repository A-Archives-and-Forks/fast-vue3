<template>
  <div class="p-6">
    <t-row :gutter="16">
      <t-col v-for="card in statCards" :key="card.title" :span="3">
        <t-card :bordered="false" class="mb-4 shadow-sm">
          <t-statistic :title="card.title" :value="card.value" />
        </t-card>
      </t-col>
    </t-row>
    <t-card title="欢迎使用 Fast Vue3 · TDesign" :bordered="false" class="shadow-sm">
      <template #body>
        <p class="text-gray-600">
          这是基于 TDesign Vue Next 的应用，运行在 Fast Vue3 Monorepo 工程平台上。
        </p>
        <p class="text-gray-500 mt-2 text-sm">
          共享基础设施：request / stores / utils / locales / access
        </p>
        <t-divider />
        <t-descriptions title="工程信息" :column="2" bordered>
          <t-descriptions-item label="UI 框架">TDesign Vue Next</t-descriptions-item>
          <t-descriptions-item label="端口">3005</t-descriptions-item>
          <t-descriptions-item label="构建工具">Vite 7</t-descriptions-item>
          <t-descriptions-item label="语言">TypeScript 5</t-descriptions-item>
          <t-descriptions-item label="状态管理">Pinia</t-descriptions-item>
          <t-descriptions-item label="路由">Vue Router 4</t-descriptions-item>
        </t-descriptions>
      </template>
    </t-card>
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
