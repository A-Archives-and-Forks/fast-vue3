<script setup lang="ts">
const stats = [
  { title: '总访问量', value: '84,260', suffix: '次', color: '#409eff' },
  { title: '总用户数', value: '12,480', suffix: '人', color: '#67c23a' },
  { title: '总营收', value: '1,026,800', suffix: '元', color: '#722ed1' },
  { title: '系统正常率', value: '99.9', suffix: '%', color: '#e6a23c' },
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

const topPages = [
  { page: '/home', title: '首页', visits: 32_100, avgTime: '2m 30s' },
  { page: '/dashboard', title: '仪表盘', visits: 18_400, avgTime: '4m 15s' },
  { page: '/user', title: '用户管理', visits: 12_800, avgTime: '5m 42s' },
  { page: '/settings', title: '系统设置', visits: 8600, avgTime: '3m 10s' },
  { page: '/components', title: '组件展示', visits: 6300, avgTime: '6m 20s' },
];
</script>

<template>
  <div class="p-6">
    <h2 style="margin: 0 0 24px; font-size: 1.25rem; font-weight: 600">
      数据分析
    </h2>

    <el-row :gutter="16" class="mb-4">
      <el-col v-for="card in stats" :key="card.title" :span="6">
        <el-card shadow="never">
          <div style="margin-bottom: 8px; font-size: 0.875rem; color: #909399">
            {{ card.title }}
          </div>
          <div
            :style="{ fontSize: '1.75rem', fontWeight: 700, color: card.color }"
          >
            {{ card.value }}
            <span
              style="font-size: 0.875rem; font-weight: 400; color: #909399"
              >{{ card.suffix }}</span
            >
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>近7天趋势</template>
          <el-table :data="trendData" stripe size="default" style="width: 100%">
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="visits" label="访问量" />
            <el-table-column prop="users" label="新增用户" />
            <el-table-column prop="orders" label="订单数" />
            <el-table-column prop="revenue" label="营收" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>热门页面</template>
          <el-table :data="topPages" stripe size="small" style="width: 100%">
            <el-table-column prop="title" label="页面" />
            <el-table-column prop="visits" label="访问量" width="100" />
            <el-table-column prop="avgTime" label="停留" width="80" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
