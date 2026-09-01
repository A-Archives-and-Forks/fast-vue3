<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  NButton,
  NDataTable,
  NInput,
  NPopconfirm,
  NSelect,
  NTag,
  useMessage,
} from 'naive-ui';

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
const message = useMessage();

const loading = ref(false);
const dataSource = ref<ArticleRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const categoryFilter = ref<null | string>(null);
const statusFilter = ref<null | string>(null);

const categoryOptions = ['产品动态', '技术分享', '团队博客', '公告'].map(
  (c) => ({ label: c, value: c }),
);
const statusOptions = [
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
];

function seed(): ArticleRecord[] {
  const cats = ['产品动态', '技术分享', '团队博客', '公告'];
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
  categoryFilter.value = null;
  statusFilter.value = null;
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

function handleSizeChange(size: number) {
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
  message.success('文章已删除');
}

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: '标题',
    key: 'title',
    width: 300,
    render: (row: ArticleRecord) =>
      h('div', { style: 'display:flex;align-items:center;gap:12px' }, [
        h(
          'div',
          {
            style:
              'width:48px;height:36px;flex-shrink:0;border-radius:6px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:12px',
          },
          '封面',
        ),
        h('span', row.title),
      ]),
  },
  { title: '分类', key: 'category', width: 110 },
  { title: '作者', key: 'author', width: 90 },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render: (row: ArticleRecord) =>
      h(
        NTag,
        {
          type: row.status === 'published' ? 'success' : 'default',
          size: 'small',
        },
        () => (row.status === 'published' ? '已发布' : '草稿'),
      ),
  },
  { title: '浏览量', key: 'views', width: 100 },
  { title: '发布时间', key: 'publishedAt', width: 170 },
  {
    title: '操作',
    key: 'action',
    width: 140,
    fixed: 'right' as const,
    render: (row: ArticleRecord) => [
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => goEdit(row),
        },
        () => '编辑',
      ),
      h(
        NPopconfirm,
        { onPositiveClick: () => handleDelete(row) },
        {
          trigger: () =>
            h(
              NButton,
              {
                text: true,
                type: 'error',
                size: 'small',
                style: { marginLeft: '8px' },
              },
              () => '删除',
            ),
          default: () => '确定删除该文章？',
        },
      ),
    ],
  },
];

const pagination = computed(() => ({
  page: currentPage.value,
  pageSize: pageSize.value,
  itemCount: total.value,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onUpdatePage: handlePageChange,
  onUpdatePageSize: handleSizeChange,
}));

onMounted(handleSearch);
</script>

<template>
  <div style="padding: 24px">
    <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600">
      文章管理
    </h3>

    <NCard style="margin-bottom: 16px">
      <div
        style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center"
      >
        <NInput
          v-model:value="keyword"
          placeholder="标题 / 作者"
          clearable
          style="width: 200px"
          @keyup.enter="handleSearch"
        />
        <NSelect
          v-model:value="categoryFilter"
          placeholder="分类"
          clearable
          :options="categoryOptions"
          style="width: 140px"
        />
        <NSelect
          v-model:value="statusFilter"
          placeholder="状态"
          clearable
          :options="statusOptions"
          style="width: 120px"
        />
        <NButton type="primary" @click="handleSearch">搜索</NButton>
        <NButton @click="handleReset">重置</NButton>
        <div style="flex: 1"></div>
        <NButton type="primary" @click="goCreate">+ 新建文章</NButton>
      </div>
    </NCard>

    <NCard>
      <NDataTable
        :columns="columns"
        :data="dataSource"
        :loading="loading"
        :pagination="pagination"
        size="small"
        striped
      />
    </NCard>
  </div>
</template>
