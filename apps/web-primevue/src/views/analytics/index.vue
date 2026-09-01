<script setup lang="ts">
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';

const stats = [
  { title: '总访问量', value: '84,260', suffix: '次', color: '#3b82f6' },
  { title: '总用户数', value: '12,480', suffix: '人', color: '#22c55e' },
  { title: '总营收', value: '1,026,800', suffix: '元', color: '#8b5cf6' },
  { title: '系统正常率', value: '99.9', suffix: '%', color: '#f59e0b' },
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

const topPages = [
  { id: 1, title: '首页', visits: 32_100, avgTime: '2m 30s' },
  { id: 2, title: '仪表盘', visits: 18_400, avgTime: '4m 15s' },
  { id: 3, title: '用户管理', visits: 12_800, avgTime: '5m 42s' },
  { id: 4, title: '系统设置', visits: 8600, avgTime: '3m 10s' },
  { id: 5, title: '组件展示', visits: 6300, avgTime: '6m 20s' },
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
      <Card v-for="card in stats" :key="card.title">
        <template #content>
          <div style="margin-bottom: 4px; font-size: 0.875rem; color: #6b7280">
            {{ card.title }}
          </div>
          <div
            :style="{ fontSize: '1.75rem', fontWeight: 700, color: card.color }"
          >
            {{ card.value }}
            <span
              style="font-size: 0.875rem; font-weight: 400; color: #9ca3af"
              >{{ card.suffix }}</span
            >
          </div>
        </template>
      </Card>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px">
      <Card>
        <template #title>近7天趋势</template>
        <template #content>
          <DataTable :value="trendData" size="small" striped-rows>
            <Column field="date" header="日期" />
            <Column field="visits" header="访问量" />
            <Column field="users" header="新增用户" />
            <Column field="orders" header="订单数" />
            <Column field="revenue" header="营收" />
          </DataTable>
        </template>
      </Card>
      <Card>
        <template #title>热门页面</template>
        <template #content>
          <DataTable :value="topPages" size="small" striped-rows>
            <Column field="title" header="页面" />
            <Column field="visits" header="访问量" />
            <Column field="avgTime" header="停留" />
          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>
