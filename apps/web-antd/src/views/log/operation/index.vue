<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { http } from '@/api/http';
import { message } from 'ant-design-vue';

interface OperationLog {
  id: number;
  username: string;
  module: string;
  action: string;
  description: string;
  ip: string;
  method: string;
  status: string;
  duration: number;
  createdAt: string;
}

const loading = ref(false);
const dataSource = ref<OperationLog[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const moduleFilter = ref('');

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '操作人', dataIndex: 'username', width: 100 },
  { title: '模块', dataIndex: 'module', width: 110 },
  { title: '操作', dataIndex: 'action', width: 80 },
  { title: '描述', dataIndex: 'description' },
  { title: '方法', dataIndex: 'method', width: 80 },
  { title: 'IP', dataIndex: 'ip', width: 130 },
  { title: '耗时', dataIndex: 'duration', width: 80 },
  { title: '状态', dataIndex: 'status', width: 80 },
  { title: '操作时间', dataIndex: 'createdAt', width: 170 },
];

const modules = ['用户管理', '角色管理', '菜单管理', '系统设置', '日志管理'];

const methodColor: Record<string, string> = {
  GET: 'green',
  POST: 'blue',
  PUT: 'orange',
  DELETE: 'red',
};

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: OperationLog[]; total: number }>({
      url: '/log/operation',
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
        module: moduleFilter.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    message.error('加载操作日志失败');
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

function handleReset() {
  keyword.value = '';
  moduleFilter.value = '';
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  fetchData();
}

const paginationConfig = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  showTotal: (t: number) => `共 ${t} 条`,
  onChange: handlePageChange,
}));

onMounted(fetchData);
</script>

<template>
  <div class="p-6">
    <ATypographyTitle :level="4" style="margin: 0 0 16px">
      操作日志
    </ATypographyTitle>

    <ACard :bordered="false" class="mb-4 shadow-sm">
      <ARow :gutter="16">
        <ACol :span="6">
          <AInput
            v-model:value="keyword"
            placeholder="搜索操作人 / 描述"
            allow-clear
            @press-enter="handleSearch"
          />
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="moduleFilter"
            placeholder="模块"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption v-for="m in modules" :key="m" :value="m">
              {{ m }}
            </ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="4">
          <ASpace>
            <AButton type="primary" @click="handleSearch">搜索</AButton>
            <AButton @click="handleReset">重置</AButton>
          </ASpace>
        </ACol>
      </ARow>
    </ACard>

    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="dataSource"
          :columns="columns"
          :pagination="paginationConfig"
          size="middle"
          row-key="id"
          :scroll="{ x: 1100 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'method'">
              <ATag :color="methodColor[record.method] || 'default'">
                {{ record.method }}
              </ATag>
            </template>
            <template v-if="column.dataIndex === 'duration'">
              <span
                :style="{
                  color: record.duration > 300 ? '#f5222d' : '#52c41a',
                }"
              >
                {{ record.duration }}ms
              </span>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ATag :color="record.status === 'success' ? 'green' : 'red'">
                {{ record.status === 'success' ? '成功' : '失败' }}
              </ATag>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>
  </div>
</template>
