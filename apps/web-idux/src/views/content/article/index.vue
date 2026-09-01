<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMessage } from '@idux/components/message';

const { success: messageSuccess } = useMessage();

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
  published: 'success',
  draft: 'default',
};
const statusLabelMap: Record<string, string> = {
  published: '已发布',
  draft: '草稿',
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

function goCreate() {
  router.push('/content/article/edit');
}
function goEdit(record: ArticleRecord) {
  router.push(`/content/article/edit?id=${record.id}`);
}
function handleDelete(record: ArticleRecord) {
  dataSource.value = dataSource.value.filter((r) => r.id !== record.id);
  total.value -= 1;
  messageSuccess('文章已删除');
}

const columns = [
  { title: 'ID', dataKey: 'id', width: 60 },
  { title: '标题', key: 'title', width: 300, customCell: true },
  { title: '分类', dataKey: 'category', width: 110 },
  { title: '作者', dataKey: 'author', width: 90 },
  { title: '状态', key: 'status', width: 90, customCell: true },
  { title: '浏览量', dataKey: 'views', width: 100 },
  { title: '发布时间', dataKey: 'publishedAt', width: 170 },
  { title: '操作', key: 'actions', width: 140, customCell: true },
];

onMounted(handleSearch);
</script>

<template>
  <div style="padding: 24px">
    <h4 style="margin: 0 0 16px; font-size: 18px; font-weight: 600">
      文章管理
    </h4>

    <!-- Search -->
    <IxCard shadow="never" style="margin-bottom: 16px">
      <div
        style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center"
      >
        <IxInput
          v-model:value="keyword"
          placeholder="标题 / 作者"
          style="width: 220px"
          @keyup.enter="handleSearch"
        />
        <IxSelect
          v-model:value="categoryFilter"
          placeholder="分类"
          clearable
          style="width: 160px"
        >
          <IxSelectOption
            v-for="c in categoryOptions"
            :key="c"
            :label="c"
            :value="c"
          />
        </IxSelect>
        <IxSelect
          v-model:value="statusFilter"
          placeholder="状态"
          clearable
          style="width: 160px"
        >
          <IxSelectOption
            v-for="s in statusOptions"
            :key="s.value"
            :label="s.label"
            :value="s.value"
          />
        </IxSelect>
        <IxButton mode="primary" @click="handleSearch">搜索</IxButton>
        <IxButton @click="handleReset">重置</IxButton>
        <div style="flex: 1"></div>
        <IxButton mode="primary" @click="goCreate">+ 新建文章</IxButton>
      </div>
    </IxCard>

    <!-- Table -->
    <IxCard shadow="never">
      <IxTable
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="false"
        :borderless="false"
        stripe
      >
        <template #cell="{ record, column }">
          <template v-if="column.key === 'title'">
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
                  color: #9ca3af;
                  background: #f3f4f6;
                  border-radius: 6px;
                "
              >
                封面
              </div>
              <span>{{ (record as ArticleRecord).title }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'status'">
            <IxTag :color="statusColorMap[(record as ArticleRecord).status]">
              {{ statusLabelMap[(record as ArticleRecord).status] }}
            </IxTag>
          </template>
          <template v-else-if="column.key === 'actions'">
            <IxButton
              mode="link"
              size="sm"
              @click="goEdit(record as ArticleRecord)"
            >
              编辑
            </IxButton>
            <IxPopconfirm
              title="确定删除该文章？"
              @confirm="handleDelete(record as ArticleRecord)"
            >
              <IxButton mode="link" size="sm" danger>删除</IxButton>
            </IxPopconfirm>
          </template>
        </template>
      </IxTable>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <IxPagination
          v-model:page-index="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          show-total
          show-quick-jumper
          @change="handlePageChange"
        />
      </div>
    </IxCard>
  </div>
</template>
