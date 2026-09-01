<script setup lang="ts">
import type { Article } from '@/mock/content';

import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { articles, categories } from '@/mock/content';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const router = useRouter();

const loading = ref(false);
const dataSource = ref<Article[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const categoryFilter = ref<string | undefined>(undefined);
const statusFilter = ref<string | undefined>(undefined);

const categoryOptions = categories.map((c) => c.name);
const statusOptions = [
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
];
const statusColorMap: Record<string, string> = {
  published: 'green',
  draft: 'default',
};

function applyFilter() {
  const filtered = articles.filter((a) => {
    const matchKeyword =
      !keyword.value ||
      a.title.includes(keyword.value) ||
      a.author.includes(keyword.value);
    const matchCategory =
      !categoryFilter.value || a.category === categoryFilter.value;
    const matchStatus = !statusFilter.value || a.status === statusFilter.value;
    return matchKeyword && matchCategory && matchStatus;
  });
  total.value = filtered.length;
  const start = (currentPage.value - 1) * pageSize.value;
  dataSource.value = filtered.slice(start, start + pageSize.value);
}

function handleSearch() {
  currentPage.value = 1;
  loading.value = true;
  setTimeout(() => {
    applyFilter();
    loading.value = false;
  }, 200);
}

function handleReset() {
  keyword.value = '';
  categoryFilter.value = undefined;
  statusFilter.value = undefined;
  currentPage.value = 1;
  handleSearch();
}

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  loading.value = true;
  setTimeout(() => {
    applyFilter();
    loading.value = false;
  }, 200);
}

function goCreate() {
  router.push('/content/article/edit');
}
function goEdit(record: Article) {
  router.push(`/content/article/edit?id=${record.id}`);
}
function handleDelete(record: Article) {
  const idx = articles.findIndex((a) => a.id === record.id);
  if (idx !== -1) articles.splice(idx, 1);
  applyFilter();
  message.success('文章已删除');
}

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '标题', dataIndex: 'title', width: 320 },
  { title: '分类', dataIndex: 'category', width: 110 },
  { title: '作者', dataIndex: 'author', width: 90 },
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '发布时间', dataIndex: 'date', width: 170 },
  { title: '操作', key: 'action', width: 140, fixed: 'right' as const },
];

const paginationConfig = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  showTotal: (t: number) => `共 ${t} 条`,
  onChange: handlePageChange,
}));

onMounted(handleSearch);
</script>

<template>
  <div class="p-6">
    <ATypographyTitle :level="4" style="margin: 0 0 16px">
      文章管理
    </ATypographyTitle>

    <!-- Search -->
    <ACard :bordered="false" class="mb-4 shadow-sm">
      <ARow :gutter="16" align="middle">
        <ACol :span="7">
          <AInput
            v-model:value="keyword"
            placeholder="标题 / 作者"
            allow-clear
            @press-enter="handleSearch"
          />
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="categoryFilter"
            placeholder="分类"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption v-for="c in categoryOptions" :key="c" :value="c">
              {{ c }}
            </ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="statusFilter"
            placeholder="状态"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption
              v-for="s in statusOptions"
              :key="s.value"
              :value="s.value"
            >
              {{ s.label }}
            </ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="5">
          <ASpace>
            <AButton type="primary" @click="handleSearch">搜索</AButton>
            <AButton @click="handleReset">重置</AButton>
          </ASpace>
        </ACol>
        <ACol :span="4" style="text-align: right">
          <AButton type="primary" @click="goCreate">
            <PlusOutlined />新建文章
          </AButton>
        </ACol>
      </ARow>
    </ACard>

    <!-- Table -->
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
            <template v-if="column.dataIndex === 'title'">
              <div class="flex items-center gap-3">
                <div
                  class="h-9 w-12 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs"
                >
                  封面
                </div>
                <span class="line-clamp-2">{{
                  (record as Article).title
                }}</span>
              </div>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ATag :color="statusColorMap[(record as Article).status]">
                {{
                  (record as Article).status === 'published' ? '已发布' : '草稿'
                }}
              </ATag>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="goEdit(record as Article)"
              >
                <EditOutlined />编辑
              </AButton>
              <APopconfirm
                title="确定删除该文章？"
                @confirm="handleDelete(record as Article)"
              >
                <AButton type="link" size="small" danger>
                  <DeleteOutlined />删除
                </AButton>
              </APopconfirm>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>
  </div>
</template>
