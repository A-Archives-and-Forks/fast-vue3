<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Message } from '@arco-design/web-vue';
import { IconDelete, IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';

interface ArticleRecord {
  id: number;
  title: string;
  category: string;
  author: string;
  status: string;
  views: number;
  cover: string;
  summary: string;
  publishedAt: string;
}

const router = useRouter();

const loading = ref(false);
const dataSource = ref<ArticleRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const categoryFilter = ref('');
const statusFilter = ref('');

const categoryOptions = ['产品动态', '技术分享', '团队博客', '公告'];
const statusOptions = [
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
];
const statusColorMap: Record<string, string> = {
  published: 'green',
  draft: 'gray',
};

function seed(): ArticleRecord[] {
  const cats = categoryOptions;
  const list: ArticleRecord[] = [];
  for (let i = 1; i <= 46; i++) {
    const published = i % 3 !== 0;
    list.push({
      id: i,
      title: `${cats[i % cats.length]}示例文章标题 ${String(i).padStart(2, '0')}`,
      category: cats[i % cats.length],
      author: ['张三', '李四', '王五'][i % 3],
      status: published ? 'published' : 'draft',
      views: 200 + ((i * 137) % 5200),
      cover: '',
      summary:
        '这是一篇用于演示内容管理模块的示例文章，涵盖业务场景与真实交互。',
      publishedAt: `2026-0${(i % 9) + 1}-${String((i % 27) + 1).padStart(2, '0')} 1${i % 9}:24:00`,
    });
  }
  return list;
}

function applyFilter() {
  const all = seed();
  const filtered = all.filter((a) => {
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
  categoryFilter.value = '';
  statusFilter.value = '';
  currentPage.value = 1;
  handleSearch();
}

function handlePageChange(page: number) {
  currentPage.value = page;
  loading.value = true;
  setTimeout(() => {
    applyFilter();
    loading.value = false;
  }, 200);
}

function handlePageSizeChange(size: number) {
  pageSize.value = size;
  currentPage.value = 1;
  loading.value = true;
  setTimeout(() => {
    applyFilter();
    loading.value = false;
  }, 200);
}

function goCreate() {
  router.push('/content/article/edit');
}
function goEdit(record: ArticleRecord) {
  router.push(`/content/article/edit?id=${record.id}`);
}
function handleDelete(record: ArticleRecord) {
  dataSource.value = dataSource.value.filter((r) => r.id !== record.id);
  total.value -= 1;
  Message.success('文章已删除');
}

const columns: TableColumnData[] = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '标题', dataIndex: 'title', width: 280, slotName: 'title' },
  { title: '分类', dataIndex: 'category', width: 110 },
  { title: '作者', dataIndex: 'author', width: 90 },
  { title: '状态', dataIndex: 'status', width: 90, slotName: 'status' },
  { title: '浏览量', dataIndex: 'views', width: 100 },
  { title: '发布时间', dataIndex: 'publishedAt', width: 170 },
  { title: '操作', slotName: 'actions', width: 140, fixed: 'right' as const },
];

onMounted(handleSearch);
</script>

<template>
  <div class="p-6">
    <h4 style="margin: 0 0 16px; font-size: 18px; font-weight: 600">
      文章管理
    </h4>

    <!-- Search -->
    <a-card :bordered="false" class="mb-4">
      <a-row :gutter="16" align="center">
        <a-col :span="7">
          <a-input
            v-model="keyword"
            placeholder="标题 / 作者"
            allow-clear
            @press-enter="handleSearch"
          />
        </a-col>
        <a-col :span="4">
          <a-select
            v-model="categoryFilter"
            placeholder="分类"
            allow-clear
            style="width: 100%"
          >
            <a-option
              v-for="c in categoryOptions"
              :key="c"
              :value="c"
              :label="c"
            />
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-select
            v-model="statusFilter"
            placeholder="状态"
            allow-clear
            style="width: 100%"
          >
            <a-option
              v-for="s in statusOptions"
              :key="s.value"
              :value="s.value"
              :label="s.label"
            />
          </a-select>
        </a-col>
        <a-col :span="5">
          <a-space>
            <a-button type="primary" @click="handleSearch">搜索</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-col>
        <a-col :span="4" style="text-align: right">
          <a-button type="primary" @click="goCreate">
            <template #icon><IconPlus /></template>新建文章
          </a-button>
        </a-col>
      </a-row>
    </a-card>

    <!-- Table -->
    <a-card :bordered="false">
      <a-table
        :loading="loading"
        :data="dataSource"
        :columns="columns"
        :pagination="false"
        size="medium"
        row-key="id"
        :scroll="{ x: 1100 }"
        stripe
      >
        <template #title="{ record }">
          <div class="flex items-center gap-3">
            <div
              class="flex items-center justify-center text-gray-400 text-xs"
              style="
                flex-shrink: 0;
                width: 48px;
                height: 36px;
                background: #f2f3f5;
                border-radius: 4px;
              "
            >
              封面
            </div>
            <span class="line-clamp-2">{{
              (record as ArticleRecord).title
            }}</span>
          </div>
        </template>
        <template #status="{ record }">
          <a-tag :color="statusColorMap[(record as ArticleRecord).status]">
            {{
              (record as ArticleRecord).status === 'published'
                ? '已发布'
                : '草稿'
            }}
          </a-tag>
        </template>
        <template #actions="{ record }">
          <a-button
            type="text"
            size="small"
            @click="goEdit(record as ArticleRecord)"
          >
            <template #icon><IconEdit /></template>编辑
          </a-button>
          <a-popconfirm
            content="确定删除该文章？"
            @ok="handleDelete(record as ArticleRecord)"
          >
            <a-button type="text" status="danger" size="small">
              <template #icon><IconDelete /></template>删除
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <a-pagination
          :current="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-size-options="[10, 20, 50]"
          show-total
          show-jumper
          show-page-size
          @change="handlePageChange"
          @page-size-change="handlePageSizeChange"
        />
      </div>
    </a-card>
  </div>
</template>
