<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { MessagePlugin } from 'tdesign-vue-next';

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

function handlePageChange(pageInfo: { current: number; pageSize: number }) {
  currentPage.value = pageInfo.current;
  pageSize.value = pageInfo.pageSize;
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
  MessagePlugin.success('文章已删除');
}

const columns = [
  { title: 'ID', colKey: 'id', width: 60 },
  { title: '标题', colKey: 'title', width: 280 },
  { title: '分类', colKey: 'category', width: 110 },
  { title: '作者', colKey: 'author', width: 90 },
  { title: '状态', colKey: 'status', width: 90 },
  { title: '浏览量', colKey: 'views', width: 100 },
  { title: '发布时间', colKey: 'publishedAt', width: 170 },
  { title: '操作', colKey: 'actions', width: 140, fixed: 'right' as const },
];

onMounted(handleSearch);
</script>

<template>
  <div>
    <h4 style="margin: 0 0 16px; font-size: 18px; font-weight: 600">
      文章管理
    </h4>

    <!-- Search -->
    <t-card :bordered="false" style="margin-bottom: 16px">
      <t-row :gutter="16" align="middle">
        <t-col :span="7">
          <t-input
            v-model="keyword"
            placeholder="标题 / 作者"
            clearable
            @enter="handleSearch"
          />
        </t-col>
        <t-col :span="4">
          <t-select
            v-model="categoryFilter"
            placeholder="分类"
            clearable
            style="width: 100%"
          >
            <t-option
              v-for="c in categoryOptions"
              :key="c"
              :label="c"
              :value="c"
            />
          </t-select>
        </t-col>
        <t-col :span="4">
          <t-select
            v-model="statusFilter"
            placeholder="状态"
            clearable
            style="width: 100%"
          >
            <t-option
              v-for="s in statusOptions"
              :key="s.value"
              :label="s.label"
              :value="s.value"
            />
          </t-select>
        </t-col>
        <t-col :span="5">
          <t-space>
            <t-button theme="primary" @click="handleSearch">搜索</t-button>
            <t-button theme="default" @click="handleReset">重置</t-button>
          </t-space>
        </t-col>
        <t-col :span="4" style="text-align: right">
          <t-button theme="primary" @click="goCreate">新建文章</t-button>
        </t-col>
      </t-row>
    </t-card>

    <!-- Table -->
    <t-card :bordered="false">
      <t-table
        :loading="loading"
        :data="dataSource"
        :columns="columns"
        row-key="id"
        size="medium"
        stripe
      >
        <template #title="{ row }">
          <div style="display: flex; gap: 12px; align-items: center">
            <div
              style="
                display: flex;
                flex-shrink: 0;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 36px;
                font-size: 12px;
                color: #bbb;
                background: #f3f3f3;
                border-radius: 4px;
              "
            >
              封面
            </div>
            <span>{{ row.title }}</span>
          </div>
        </template>
        <template #status="{ row }">
          <t-tag
            :theme="row.status === 'published' ? 'success' : 'default'"
            size="small"
          >
            {{ row.status === 'published' ? '已发布' : '草稿' }}
          </t-tag>
        </template>
        <template #actions="{ row }">
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="goEdit(row)"
          >
            编辑
          </t-button>
          <t-popconfirm content="确定删除该文章？" @confirm="handleDelete(row)">
            <t-button theme="danger" variant="text" size="small">删除</t-button>
          </t-popconfirm>
        </template>
      </t-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <t-pagination
          v-model:current="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-size-options="[10, 20, 50]"
          show-jumper
          @change="handlePageChange"
        />
      </div>
    </t-card>
  </div>
</template>
