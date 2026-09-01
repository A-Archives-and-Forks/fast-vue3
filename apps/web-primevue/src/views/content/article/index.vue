<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

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
const toast = useToast();
const confirm = useConfirm();

const keyword = ref('');
const categoryFilter = ref<null | string>(null);
const statusFilter = ref<null | string>(null);

const pageSize = ref(10);
const first = ref(0);

const categoryOptions = ['产品动态', '技术分享', '团队博客', '公告'];
const statusOptions = [
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
];

const statusSeverityMap: Record<string, 'secondary' | 'success'> = {
  published: 'success',
  draft: 'secondary',
};

function seed(): ArticleRecord[] {
  const cats = categoryOptions;
  const authors = ['张三', '李四', '王五'];
  const list: ArticleRecord[] = [];
  for (let i = 1; i <= 46; i++) {
    const published = i % 3 !== 0;
    list.push({
      id: i,
      title: `${cats[i % cats.length]}示例文章标题 ${String(i).padStart(2, '0')}`,
      category: cats[i % cats.length],
      author: authors[i % authors.length],
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

const seedList = ref<ArticleRecord[]>(seed());

const filteredList = computed(() =>
  seedList.value.filter((a) => {
    const matchKeyword =
      !keyword.value ||
      a.title.includes(keyword.value) ||
      a.author.includes(keyword.value);
    const matchCategory =
      !categoryFilter.value || a.category === categoryFilter.value;
    const matchStatus = !statusFilter.value || a.status === statusFilter.value;
    return matchKeyword && matchCategory && matchStatus;
  }),
);

const pagedArticles = computed(() =>
  filteredList.value.slice(first.value, first.value + pageSize.value),
);

function onPage(event: { first: number; rows: number }) {
  first.value = event.first;
  pageSize.value = event.rows;
}

function handleSearch() {
  first.value = 0;
}

function handleReset() {
  keyword.value = '';
  categoryFilter.value = null;
  statusFilter.value = null;
  first.value = 0;
}

function goCreate() {
  router.push('/content/article/edit');
}

function goEdit(record: ArticleRecord) {
  router.push(`/content/article/edit?id=${record.id}`);
}

function handleDelete(record: ArticleRecord) {
  confirm.require({
    message: '确定删除该文章？',
    header: '确认',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: '取消',
    acceptLabel: '确定',
    accept: () => {
      seedList.value = seedList.value.filter((r) => r.id !== record.id);
      toast.add({ severity: 'success', summary: '成功', detail: '文章已删除' });
    },
  });
}
</script>

<template>
  <div class="p-6">
    <Toast />
    <ConfirmDialog />

    <h4 style="margin: 0 0 16px; font-size: 18px; font-weight: 600">
      文章管理
    </h4>

    <!-- Search -->
    <Card style="margin-bottom: 16px">
      <template #content>
        <div
          style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center"
        >
          <InputText
            v-model="keyword"
            placeholder="标题 / 作者"
            @keyup.enter="handleSearch"
            style="width: 220px"
          />
          <Select
            v-model="categoryFilter"
            :options="categoryOptions"
            placeholder="分类"
            show-clear
            style="width: 140px"
          />
          <Select
            v-model="statusFilter"
            :options="statusOptions"
            option-label="label"
            option-value="value"
            placeholder="状态"
            show-clear
            style="width: 140px"
          />
          <Button label="搜索" icon="pi pi-search" @click="handleSearch" />
          <Button label="重置" severity="secondary" @click="handleReset" />
          <Button
            label="+ 新建文章"
            icon="pi pi-plus"
            style="margin-left: auto"
            @click="goCreate"
          />
        </div>
      </template>
    </Card>

    <!-- Table -->
    <Card>
      <template #content>
        <DataTable
          :value="pagedArticles"
          data-key="id"
          size="small"
          striped-rows
        >
          <Column field="id" header="ID" style="width: 60px" />
          <Column header="标题" style="width: 300px">
            <template #body="{ data }">
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
                    border-radius: 4px;
                  "
                >
                  封面
                </div>
                <span>{{ (data as ArticleRecord).title }}</span>
              </div>
            </template>
          </Column>
          <Column field="category" header="分类" style="width: 110px" />
          <Column field="author" header="作者" style="width: 90px" />
          <Column header="状态" style="width: 90px">
            <template #body="{ data }">
              <Tag
                :value="
                  (data as ArticleRecord).status === 'published'
                    ? '已发布'
                    : '草稿'
                "
                :severity="statusSeverityMap[(data as ArticleRecord).status]"
              />
            </template>
          </Column>
          <Column field="views" header="浏览量" style="width: 100px" />
          <Column field="publishedAt" header="发布时间" style="width: 170px" />
          <Column header="操作" style="width: 150px">
            <template #body="{ data }">
              <Button
                label="编辑"
                size="small"
                text
                @click="goEdit(data as ArticleRecord)"
              />
              <Button
                label="删除"
                size="small"
                text
                severity="danger"
                @click="handleDelete(data as ArticleRecord)"
              />
            </template>
          </Column>
        </DataTable>
        <Paginator
          :first="first"
          :rows="pageSize"
          :total-records="filteredList.length"
          :rows-per-page-options="[10, 20, 50]"
          @page="onPage"
          style="margin-top: 12px"
        />
      </template>
    </Card>
  </div>
</template>
