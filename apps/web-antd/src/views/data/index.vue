<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { DownloadOutlined } from '@ant-design/icons-vue';

interface RecentItem {
  date: string;
  type: string;
  amount: string;
  status: string;
}

const loading = ref(true);

const stats = [
  { title: '总用户数', value: 1280, border: '#1677ff', suffix: '人' },
  { title: '今日订单', value: 342, border: '#52c41a', suffix: '单' },
  {
    title: '月度营收',
    value: 86.5,
    border: '#722ed1',
    prefix: '¥',
    suffix: '万',
  },
  { title: '访问量', value: 9.7, border: '#fa8c16', suffix: '万' },
];

const recentData: RecentItem[] = [
  {
    date: '2026-08-14',
    type: 'Pro 版订阅',
    amount: '¥1,194',
    status: '已完成',
  },
  { date: '2026-08-14', type: '开源版下载', amount: '¥0', status: '已完成' },
  {
    date: '2026-08-13',
    type: '企业版咨询',
    amount: '¥12,000',
    status: '待支付',
  },
  {
    date: '2026-08-13',
    type: '组件市场消费',
    amount: '¥299',
    status: '已完成',
  },
  { date: '2026-08-12', type: 'Pro 版订阅', amount: '¥199', status: '已退款' },
  {
    date: '2026-08-12',
    type: '私有部署服务',
    amount: '¥38,000',
    status: '已完成',
  },
  {
    date: '2026-08-11',
    type: '企业版续费',
    amount: '¥24,000',
    status: '已完成',
  },
  {
    date: '2026-08-11',
    type: '邮件营销转化',
    amount: '¥598',
    status: '已完成',
  },
];

const channels = [
  { name: '官网直访', percent: 38 },
  { name: '搜索引擎', percent: 27 },
  { name: '社交媒体', percent: 18 },
  { name: '邮件营销', percent: 9 },
  { name: '合作渠道', percent: 8 },
];

const statusColorMap: Record<string, string> = {
  已完成: 'green',
  待支付: 'orange',
  已退款: 'red',
};

const recentColumns = [
  { title: '日期', dataIndex: 'date', width: 130 },
  { title: '业务类型', dataIndex: 'type' },
  { title: '金额', dataIndex: 'amount', width: 140 },
  { title: '状态', dataIndex: 'status', width: 110 },
];

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
});
</script>

<template>
  <div class="p-6">
    <ATypographyTitle :level="4" style="margin: 0 0 16px">
      数据业务
    </ATypographyTitle>

    <ASpin :spinning="loading">
      <!-- Stats -->
      <ARow :gutter="16" class="mb-4">
        <ACol v-for="s in stats" :key="s.title" :span="6">
          <ACard
            :bordered="false"
            class="shadow-sm"
            :style="{ borderLeft: `4px solid ${s.border}` }"
          >
            <AStatistic
              :title="s.title"
              :value="s.value"
              :precision="s.suffix === '万' ? 1 : 0"
              :prefix="s.prefix"
              :suffix="s.suffix"
            />
          </ACard>
        </ACol>
      </ARow>

      <ARow :gutter="16">
        <!-- Recent business data -->
        <ACol :span="15">
          <ACard title="近期业务数据" :bordered="false" class="shadow-sm">
            <template #extra>
              <AButton size="small"> <DownloadOutlined />导出 </AButton>
            </template>
            <ATable
              :data-source="recentData"
              :columns="recentColumns"
              :pagination="false"
              size="middle"
              row-key="date"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'status'">
                  <ATag :color="statusColorMap[(record as RecentItem).status]">
                    {{ (record as RecentItem).status }}
                  </ATag>
                </template>
              </template>
            </ATable>
          </ACard>
        </ACol>

        <!-- Channel distribution -->
        <ACol :span="9">
          <ACard title="渠道分布" :bordered="false" class="shadow-sm">
            <div v-for="c in channels" :key="c.name" class="mb-3">
              <div class="mb-1 flex items-center justify-between text-sm">
                <span class="text-gray-600">{{ c.name }}</span>
                <span class="text-gray-500">{{ c.percent }}%</span>
              </div>
              <div class="h-2 w-full overflow-hidden rounded bg-gray-100">
                <div
                  class="h-full rounded bg-blue-500"
                  :style="{ width: `${c.percent}%` }"
                ></div>
              </div>
            </div>
          </ACard>
        </ACol>
      </ARow>
    </ASpin>
  </div>
</template>
