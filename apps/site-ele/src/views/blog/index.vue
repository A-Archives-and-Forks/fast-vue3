<script setup lang="ts">
import type { BlogPost } from '@/api';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { api } from '@/api';

const router = useRouter();

const currentPage = ref(1);
const pageSize = 6;
const categoryFilter = ref<string>('全部');
const blogPosts = reactive<BlogPost[]>([]);
const blogCategories = ref<string[]>(['全部']);

async function loadPosts() {
  const result = await api.portal.blogList({ page: 1, pageSize: 100 });
  blogPosts.splice(0, blogPosts.length, ...result.items);
  blogCategories.value = [
    '全部',
    ...result.categories.filter((category) => category !== '全部'),
  ];
}

onMounted(loadPosts);

const filtered = computed(() =>
  categoryFilter.value === '全部'
    ? blogPosts
    : blogPosts.filter((p) => p.category === categoryFilter.value),
);

const paged = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filtered.value.slice(start, start + pageSize);
});

const total = computed(() => filtered.value.length);

function handleCategoryChange() {
  currentPage.value = 1;
}
function handlePageChange(page: number) {
  currentPage.value = page;
}
function goDetail(post: BlogPost) {
  router.push(`/blog/${post.id}`);
}
</script>

<template>
  <div>
    <section class="site-hero">
      <h1 class="site-hero-title">博客</h1>
      <p class="site-hero-desc">
        工程实践、架构解析与团队故事，来自 Fast Vue3 一线开发者
      </p>
    </section>

    <section class="site-section">
      <div class="site-container">
        <div class="blog-toolbar" v-reveal>
          <ElSelect
            v-model="categoryFilter"
            style="width: 200px"
            @change="handleCategoryChange"
          >
            <ElOption
              v-for="c in blogCategories"
              :key="c"
              :label="c"
              :value="c"
            />
          </ElSelect>
          <span class="blog-count">共 {{ total }} 篇</span>
        </div>

        <div class="site-grid">
          <article
            v-for="(post, i) in paged"
            :key="post.id"
            v-reveal="(i % 3) * 100"
            class="site-card blog-card"
            @click="goDetail(post)"
          >
            <div class="blog-cover">{{ post.category }}</div>
            <h3 class="blog-title">{{ post.title }}</h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <div class="blog-meta">
              <span>{{ post.author }}</span>
              <span class="blog-dot">·</span>
              <span>{{ post.date }}</span>
            </div>
            <div class="blog-tags">
              <ElTag v-for="t in post.tags" :key="t" type="primary">
                {{ t }}
              </ElTag>
            </div>
          </article>
        </div>

        <div class="blog-pagination">
          <ElPagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            layout="prev, pager, next"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.blog-count {
  font-size: 0.9rem;
  color: var(--site-text-3);
}

.blog-card {
  overflow: hidden;
  cursor: pointer;
}

.blog-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  margin: -32px -32px 20px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  background: var(--site-gradient);
}

.blog-title {
  margin: 0 0 8px;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--site-text-1);
}

.blog-excerpt {
  min-height: 46px;
  margin: 0 0 12px;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--site-text-3);
}

.blog-meta {
  font-size: 0.82rem;
  color: var(--site-text-4);
}

.blog-dot {
  margin: 0 6px;
}

.blog-tags {
  margin-top: 12px;
}

.blog-pagination {
  margin-top: 36px;
  text-align: center;
}
</style>
