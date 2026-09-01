<script setup lang="ts">
const stats = [
  { title: '总访问量', value: 84_260, suffix: '次', color: '#1890ff' },
  { title: '总用户数', value: 12_480, suffix: '人', color: '#52c41a' },
  { title: '总营收', value: 1_026_800, suffix: '元', color: '#722ed1' },
  { title: '系统正常率', value: 99.9, suffix: '%', color: '#fa8c16' },
];

const trendData = [
  {
    date: '2026-05-18',
    visits: 12_300,
    users: 1200,
    orders: 320,
    revenue: 89_600,
  },
  {
    date: '2026-05-19',
    visits: 11_800,
    users: 1100,
    orders: 290,
    revenue: 81_200,
  },
  {
    date: '2026-05-20',
    visits: 13_500,
    users: 1350,
    orders: 380,
    revenue: 106_400,
  },
  {
    date: '2026-05-21',
    visits: 14_200,
    users: 1420,
    orders: 410,
    revenue: 114_800,
  },
  {
    date: '2026-05-22',
    visits: 12_900,
    users: 1280,
    orders: 350,
    revenue: 98_000,
  },
  {
    date: '2026-05-23',
    visits: 15_100,
    users: 1510,
    orders: 450,
    revenue: 126_000,
  },
  {
    date: '2026-05-24',
    visits: 14_460,
    users: 1460,
    orders: 420,
    revenue: 117_600,
  },
];

const trendColumns = [
  { title: '日期', dataIndex: 'date' },
  { title: '访问量', dataIndex: 'visits' },
  { title: '新增用户', dataIndex: 'users' },
  { title: '订单数', dataIndex: 'orders' },
  { title: '营收', dataIndex: 'revenue' },
];

const topPages = [
  { page: '/home', title: '首页', visits: 32_100, avgTime: '2m 30s' },
  { page: '/dashboard', title: '仪表盘', visits: 18_400, avgTime: '4m 15s' },
  { page: '/user', title: '用户管理', visits: 12_800, avgTime: '5m 42s' },
  { page: '/settings', title: '系统设置', visits: 8600, avgTime: '3m 10s' },
  { page: '/components', title: '组件展示', visits: 6300, avgTime: '6m 20s' },
];

const pageColumns = [
  { title: '页面路径', dataIndex: 'page' },
  { title: '页面名称', dataIndex: 'title' },
  { title: '访问量', dataIndex: 'visits' },
  { title: '平均停留', dataIndex: 'avgTime' },
];
</script>

<template>
  <div class="p-6">
    <a-typography-title :heading="4" :style="{ marginBottom: '24px' }">
      数据分析
    </a-typography-title>

    <a-row :gutter="16" :style="{ marginBottom: '16px' }">
      <a-col v-for="card in stats" :key="card.title" :span="6">
        <a-card :bordered="false" class="shadow-sm">
          <a-statistic
            :title="card.title"
            :value="card.value"
            :suffix="card.suffix"
            :value-style="{ color: card.color }"
          />
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :span="16">
        <a-card title="近7天趋势" :bordered="false" class="shadow-sm">
          <a-table
            :data="trendData"
            :columns="trendColumns"
            :pagination="false"
            size="medium"
          />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="热门页面" :bordered="false" class="shadow-sm">
          <a-table
            :data="topPages"
            :columns="pageColumns"
            :pagination="false"
            size="small"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
