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
  { title: '总用户数', value: 12_480, suffix: '人' },
  { title: '今日访问', value: 3256, suffix: '次' },
  { title: '活跃应用', value: 7, suffix: '个' },
  { title: '系统正常率', value: 99.9, suffix: '%' },
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
          label: { show: false },
          emphasis: { label: { show: true } },
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
        data: ['首页', '仪表盘', '用户管理', '个人中心', '组件展示', '设置'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [3200, 4500, 2800, 1900, 3700, 1200],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#6366f1' },
              { offset: 1, color: '#4f46e5' },
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
  <div class="p-4 flex flex-col gap-4">
    <div class="grid grid-cols-4 gap-4">
      <Card v-for="card in statCards" :key="card.title">
        <template #content>
          <div class="text-sm text-gray-500">
            {{ card.title }}
          </div>
          <div class="text-2xl font-bold mt-1">
            {{ card.value }}{{ card.suffix }}
          </div>
        </template>
      </Card>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <Card class="col-span-2">
        <template #title> 访问趋势（近7天） </template>
        <template #content>
          <div ref="lineChartRef" style="height: 280px"></div>
        </template>
      </Card>
      <Card>
        <template #title> 用户角色分布 </template>
        <template #content>
          <div ref="pieChartRef" style="height: 280px"></div>
        </template>
      </Card>
    </div>
    <Card>
      <template #title> 各模块使用频率 </template>
      <template #content>
        <div ref="barChartRef" style="height: 240px"></div>
      </template>
    </Card>
  </div>
</template>
