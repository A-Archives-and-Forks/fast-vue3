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
  { colKey: 'date', title: '日期' },
  { colKey: 'visits', title: '访问量' },
  { colKey: 'users', title: '新增用户' },
  { colKey: 'orders', title: '订单数' },
  { colKey: 'revenue', title: '营收' },
];

const topPages = [
  { title: '首页', visits: 32_100, avgTime: '2m 30s' },
  { title: '仪表盘', visits: 18_400, avgTime: '4m 15s' },
  { title: '用户管理', visits: 12_800, avgTime: '5m 42s' },
  { title: '系统设置', visits: 8600, avgTime: '3m 10s' },
  { title: '组件展示', visits: 6300, avgTime: '6m 20s' },
];

const pageColumns = [
  { colKey: 'title', title: '页面' },
  { colKey: 'visits', title: '访问量' },
  { colKey: 'avgTime', title: '停留' },
];
</script>

<template>
  <div style="padding: 24px">
    <h2 style="margin: 0 0 20px; font-size: 1.25rem; font-weight: 600">
      数据分析
    </h2>

    <t-row :gutter="[16, 16]" class="mb-4">
      <t-col v-for="card in stats" :key="card.title" :span="3">
        <t-card :bordered="false" hover-shadow>
          <div style="margin-bottom: 4px; font-size: 0.875rem; color: #909399">
            {{ card.title }}
          </div>
          <div
            :style="{ fontSize: '1.75rem', fontWeight: 700, color: card.color }"
          >
            {{ card.value.toLocaleString() }}
            <span
              style="font-size: 0.875rem; font-weight: 400; color: #c0c4cc"
              >{{ card.suffix }}</span
            >
          </div>
        </t-card>
      </t-col>
    </t-row>

    <t-row :gutter="[16, 16]">
      <t-col :span="8">
        <t-card title="近7天趋势" :bordered="false">
          <t-table :data="trendData" :columns="trendColumns" size="small" />
        </t-card>
      </t-col>
      <t-col :span="4">
        <t-card title="热门页面" :bordered="false">
          <t-table :data="topPages" :columns="pageColumns" size="small" />
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>
