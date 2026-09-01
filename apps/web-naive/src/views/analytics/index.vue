<script setup lang="ts">
import { NCard, NDataTable, NStatistic } from 'naive-ui';

const stats = [
  { title: '总访问量', value: 84_260, suffix: '次' },
  { title: '总用户数', value: 12_480, suffix: '人' },
  { title: '总营收', value: 1_026_800, suffix: '元' },
  { title: '系统正常率', value: 99.9, suffix: '%' },
];

const trendData = [
  {
    id: 1,
    date: '2026-05-18',
    visits: 12_300,
    users: 1200,
    orders: 320,
    revenue: 89_600,
  },
  {
    id: 2,
    date: '2026-05-19',
    visits: 11_800,
    users: 1100,
    orders: 290,
    revenue: 81_200,
  },
  {
    id: 3,
    date: '2026-05-20',
    visits: 13_500,
    users: 1350,
    orders: 380,
    revenue: 106_400,
  },
  {
    id: 4,
    date: '2026-05-21',
    visits: 14_200,
    users: 1420,
    orders: 410,
    revenue: 114_800,
  },
  {
    id: 5,
    date: '2026-05-22',
    visits: 12_900,
    users: 1280,
    orders: 350,
    revenue: 98_000,
  },
  {
    id: 6,
    date: '2026-05-23',
    visits: 15_100,
    users: 1510,
    orders: 450,
    revenue: 126_000,
  },
  {
    id: 7,
    date: '2026-05-24',
    visits: 14_460,
    users: 1460,
    orders: 420,
    revenue: 117_600,
  },
];

const trendColumns = [
  { title: '日期', key: 'date' },
  { title: '访问量', key: 'visits' },
  { title: '新增用户', key: 'users' },
  { title: '订单数', key: 'orders' },
  { title: '营收', key: 'revenue' },
];

const topPages = [
  { id: 1, page: '/home', title: '首页', visits: 32_100, avgTime: '2m 30s' },
  {
    id: 2,
    page: '/dashboard',
    title: '仪表盘',
    visits: 18_400,
    avgTime: '4m 15s',
  },
  {
    id: 3,
    page: '/user',
    title: '用户管理',
    visits: 12_800,
    avgTime: '5m 42s',
  },
  {
    id: 4,
    page: '/settings',
    title: '系统设置',
    visits: 8600,
    avgTime: '3m 10s',
  },
  {
    id: 5,
    page: '/components',
    title: '组件展示',
    visits: 6300,
    avgTime: '6m 20s',
  },
];

const pageColumns = [
  { title: '页面', key: 'title' },
  { title: '访问量', key: 'visits' },
  { title: '停留', key: 'avgTime' },
];
</script>

<template>
  <div style="padding: 24px">
    <h2 style="margin: 0 0 20px; font-size: 1.25rem; font-weight: 600">
      数据分析
    </h2>

    <div
      style="
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 16px;
      "
    >
      <NCard v-for="card in stats" :key="card.title">
        <NStatistic :label="card.title" :value="card.value">
          <template #suffix>
            <span style="font-size: 0.875rem">{{ card.suffix }}</span>
          </template>
        </NStatistic>
      </NCard>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px">
      <NCard title="近7天趋势">
        <NDataTable
          :columns="trendColumns"
          :data="trendData"
          :pagination="false"
          striped
        />
      </NCard>
      <NCard title="热门页面">
        <NDataTable
          :columns="pageColumns"
          :data="topPages"
          :pagination="false"
          striped
          size="small"
        />
      </NCard>
    </div>
  </div>
</template>
