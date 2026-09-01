<script setup lang="ts">
import type { BlogPost } from '@/mock/blog';

import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { blogPosts } from '@/mock/blog';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import ProgressSpinner from 'primevue/progressspinner';
import Tag from 'primevue/tag';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const post = ref<BlogPost | null>(null);

const coverText = computed(() => (post.value?.category ?? '封面').slice(0, 2));

onMounted(() => {
  const id = Number(route.params.id);
  post.value = blogPosts.find((p) => p.id === id) ?? null;
  setTimeout(() => {
    loading.value = false;
  }, 200);
});

function goBack() {
  router.push('/blog');
}
</script>

<template>
  <div>
    <section class="site-hero detail-hero">
      <Button variant="text" class="back-btn" @click="goBack">
        <i class="pi pi-arrow-left" style="margin-right: 6px"></i>返回博客列表
      </Button>
      <div
        v-if="loading"
        style="display: flex; justify-content: center; padding: 40px"
      >
        <ProgressSpinner />
      </div>
      <template v-if="!loading && post">
        <h1 class="site-hero-title">{{ post.title }}</h1>
        <div class="hero-meta">
          <span>{{ post.author }}</span
          ><span class="dot">·</span><span>{{ post.date }}</span>
          <Tag :value="post.category" severity="info" class="hero-tag" />
        </div>
      </template>
      <h1 v-if="!loading && !post" class="site-hero-title">未找到该文章</h1>
    </section>

    <section class="site-section detail-section">
      <div class="site-container site-container--narrow">
        <div
          v-if="!post && !loading"
          style="padding: 64px 0; color: var(--site-text-3); text-align: center"
        >
          未找到该文章
        </div>
        <article v-if="post" v-reveal class="site-card detail-card">
          <div class="detail-cover">{{ coverText }} 封面</div>
          <p v-for="(p, i) in post.content" :key="i" class="detail-paragraph">
            {{ p }}
          </p>
          <Divider />
          <div class="detail-tags">
            <span class="detail-tags-label">标签：</span>
            <Tag v-for="t in post.tags" :key="t" :value="t" severity="info" />
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.detail-hero {
  padding-block: 64px 48px;
}

.back-btn {
  margin-bottom: 16px;
  color: rgb(255 255 255 / 85%) !important;
}

.back-btn:hover {
  color: #fff !important;
}

.hero-meta {
  font-size: 0.95rem;
  color: rgb(255 255 255 / 80%);
}

.hero-meta .dot {
  margin: 0 8px;
}

.hero-tag {
  margin-left: 10px;
}

.detail-section {
  padding-block: 48px;
}

.detail-card {
  padding: 40px;
}

.detail-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
  margin-bottom: 28px;
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  background: var(--site-gradient);
  border-radius: var(--site-radius-sm);
}

.detail-paragraph {
  margin: 0 0 18px;
  font-size: 1rem;
  line-height: 1.9;
  color: var(--site-text-2);
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.detail-tags-label {
  font-size: 0.9rem;
  color: var(--site-text-3);
}
</style>
