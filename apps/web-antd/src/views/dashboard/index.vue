<template>
  <div class="p-6">
    <ARow :gutter="16">
      <ACol :span="6" v-for="card in statCards" :key="card.title">
        <ACard :bordered="false" class="shadow-sm">
          <AStatistic
            :title="card.title"
            :value="card.value"
            :suffix="card.suffix"
          />
        </ACard>
      </ACol>
    </ARow>
    <ACard title="欢迎使用 Fast Vue3 · Ant Design" class="mt-4 shadow-sm">
      <p class="text-gray-600">
        这是基于 Ant Design Vue 的应用，运行在 Fast Vue3 Monorepo 工程平台上。
      </p>
      <p class="text-gray-500 mt-2 text-sm">
        共享基础设施：request / stores / utils / locales / access
      </p>
    </ACard>
  </div>
</template>

<script setup lang="ts">
  const statCards = [
    { title: '今日访问', value: 1024, suffix: '次' },
    { title: '在线用户', value: 32, suffix: '人' },
    { title: '待处理任务', value: 8, suffix: '项' },
    { title: '系统状态', value: '正常', suffix: '' },
  ];
</script>
