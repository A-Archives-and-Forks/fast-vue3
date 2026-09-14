<script setup lang="ts">
import { api } from '@/api';

const features = ref<{ desc: string; icon: string; title: string }[]>([]);
const error = ref('');

onMounted(async () => {
  try {
    const items = await api.portal.features();
    features.value = items.map((item, index) => ({
      icon: ['🎨', '📦', '🔧', '⚡', '🌗', '🔒'][index % 6] ?? '✨',
      title: item.title,
      desc: item.description,
    }));
  } catch {
    error.value = '功能特性加载失败，请稍后重试';
  }
});
</script>

<template>
  <div class="features-page">
    <p v-if="error" role="alert">{{ error }}</p>
    <div class="page-header">
      <h1>产品特性</h1>
      <p>Fast Vue3 为现代前端开发提供完整的工程化解决方案</p>
    </div>
    <div class="grid">
      <div v-for="f in features" :key="f.title" class="card">
        <span class="card-icon">{{ f.icon }}</span>
        <h2>{{ f.title }}</h2>
        <p>{{ f.desc }}</p>
      </div>
    </div>
    <div class="bottom-nav">
      <RouterLink to="/">&#8592; 返回首页</RouterLink>
      <RouterLink to="/blog">查看博客 &#8594;</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.features-page {
  max-width: 1100px;
  padding: 80px 20px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 64px;
  text-align: center;
}

.page-header h1 {
  margin: 0 0 16px;
  font-size: 2.5rem;
  color: #111827;
}

.page-header p {
  margin: 0;
  font-size: 1.1rem;
  color: #6b7280;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.card {
  padding: 32px;
  background: #f9fafb;
  border-radius: 12px;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}

.card:hover {
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
  transform: translateY(-2px);
}

.card-icon {
  display: block;
  margin-bottom: 16px;
  font-size: 2rem;
}

.card h2 {
  margin: 0 0 12px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #111827;
}

.card p {
  margin: 0;
  line-height: 1.7;
  color: #6b7280;
}

.bottom-nav {
  display: flex;
  justify-content: space-between;
}

.bottom-nav a {
  font-weight: 500;
  color: #1677ff;
  text-decoration: none;
}

.bottom-nav a:hover {
  text-decoration: underline;
}
</style>
