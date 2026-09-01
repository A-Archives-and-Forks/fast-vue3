<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

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
  ElMessage.success('文章已删除');
}

onMounted(handleSearch);
</script>

<template>
  <div class="p-6">
    <h4 style="margin: 0 0 16px; font-size: 18px; font-weight: 600">
      文章管理
    </h4>

    <!-- Search -->
    <el-card shadow="never" class="mb-4">
      <el-row :gutter="16" align="middle">
        <el-col :span="7">
          <el-input
            v-model="keyword"
            placeholder="标题 / 作者"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="categoryFilter"
            placeholder="分类"
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="c in categoryOptions"
              :key="c"
              :label="c"
              :value="c"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="statusFilter"
            placeholder="状态"
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="s in statusOptions"
              :key="s.value"
              :label="s.label"
              :value="s.value"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-space>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-space>
        </el-col>
        <el-col :span="4" style="text-align: right">
          <el-button type="primary" :icon="Plus" @click="goCreate">
            新建文章
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- Table -->
    <el-card shadow="never">
      <el-table
        v-loading="loading"
        :data="dataSource"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column label="标题" width="300">
          <template #default="{ row }">
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
              <span>{{ row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="110" />
        <el-table-column prop="author" label="作者" width="90" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'published' ? 'success' : 'info'"
              size="small"
            >
              {{ row.status === 'published' ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览量" width="100" />
        <el-table-column prop="publishedAt" label="发布时间" width="170" />
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="goEdit(row)">
              <el-icon><Edit /></el-icon>编辑
            </el-button>
            <el-popconfirm
              title="确定删除该文章？"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button type="danger" link size="small">
                  <el-icon><Delete /></el-icon>删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>
  </div>
</template>
