<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import * as echarts from 'echarts';

const lineChartRef = ref<HTMLElement>();
const pieChartRef = ref<HTMLElement>();
const barChartRef = ref<HTMLElement>();
let lineChart: echarts.ECharts | null = null;
let pieChart: echarts.ECharts | null = null;
let barChart: echarts.ECharts | null = null;

const statCards = [
  { title: '总用户数', value: 12_480, suffix: '人', color: '#1890ff' },
  { title: '今日访问', value: 3256, suffix: '次', color: '#52c41a' },
  { title: '活跃应用', value: 5, suffix: '个', color: '#722ed1' },
  { title: '系统正常率', value: 99.9, suffix: '%', color: '#fa8c16' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const pv = [820, 932, 1201, 934, 1290, 1330, 1320];
const uv = [620, 732, 801, 734, 1090, 1130, 1120];

onMounted(() => {
  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value);
    lineChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['PV', 'UV'] },
      xAxis: { type: 'category', data: days },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'PV',
          type: 'line',
          smooth: true,
          data: pv,
          areaStyle: { opacity: 0.1 },
        },
        {
          name: 'UV',
          type: 'line',
          smooth: true,
          data: uv,
          areaStyle: { opacity: 0.1 },
        },
      ],
    });
  }
  if (pieChartRef.value) {
    pieChart = echarts.init(pieChartRef.value);
    pieChart.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      series: [
        {
          type: 'pie',
          radius: ['40%', '65%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
          data: [
            { value: 480, name: 'Admin' },
            { value: 1048, name: 'Editor' },
            { value: 2400, name: 'Viewer' },
            { value: 735, name: 'Guest' },
          ],
        },
      ],
    });
  }
  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value);
    barChart.setOption({
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: [
          '首页',
          '仪表盘',
          '用户管理',
          '个人中心',
          '组件展示',
          '系统设置',
        ],
      },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [3200, 4500, 2800, 1900, 3700, 1200],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#1890ff' },
              { offset: 1, color: '#096dd9' },
            ]),
          },
        },
      ],
    });
  }
  window.addEventListener('resize', handleResize);
});

function handleResize() {
  lineChart?.resize();
  pieChart?.resize();
  barChart?.resize();
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  lineChart?.dispose();
  pieChart?.dispose();
  barChart?.dispose();
});
</script>

<template>
  <div class="p-6">
    <ARow :gutter="16" class="mb-4">
      <ACol v-for="card in statCards" :key="card.title" :span="6">
        <ACard :bordered="false" class="shadow-sm">
          <AStatistic
            :title="card.title"
            :value="card.value"
            :suffix="card.suffix"
            :value-style="{ color: card.color }"
          />
        </ACard>
      </ACol>
    </ARow>
    <ARow :gutter="16" class="mb-4">
      <ACol :span="16">
        <ACard title="访问趋势（近7天）" :bordered="false" class="shadow-sm">
          <div ref="lineChartRef" style="height: 280px"></div>
        </ACard>
      </ACol>
      <ACol :span="8">
        <ACard title="用户角色分布" :bordered="false" class="shadow-sm">
          <div ref="pieChartRef" style="height: 280px"></div>
        </ACard>
      </ACol>
    </ARow>
    <ARow :gutter="16">
      <ACol :span="24">
        <ACard title="各模块使用频率" :bordered="false" class="shadow-sm">
          <div ref="barChartRef" style="height: 240px"></div>
        </ACard>
      </ACol>
    </ARow>
  </div>
</template>
