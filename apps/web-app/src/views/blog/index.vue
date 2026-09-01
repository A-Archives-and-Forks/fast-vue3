<script setup lang="ts">
const posts = [
  {
    title: 'Fast Vue3 v2.0 发布',
    summary:
      '全新 Monorepo 架构重构，支持 7 大 UI 框架，引入 Turborepo 增量构建，开发体验大幅提升。',
    date: '2025-01-15',
    tag: 'Release',
  },
  {
    title: '如何选择适合你的 UI 框架',
    summary:
      '从组件丰富度、TypeScript 支持、主题定制、社区活跃度等维度对比分析 7 大 Vue 3 UI 框架。',
    date: '2025-01-10',
    tag: 'Guide',
  },
  {
    title: 'Monorepo 最佳实践',
    summary:
      '详解 pnpm workspace 配置、依赖管理策略、构建编排方案，以及在大型 Vue 项目中的落地经验。',
    date: '2025-01-05',
    tag: 'Architecture',
  },
  {
    title: 'UnoCSS 与主题系统设计',
    summary:
      '基于 CSS Variables + UnoCSS 实现亮色/暗色主题切换，零运行时开销的动态主题方案。',
    date: '2024-12-28',
    tag: 'Style',
  },
];
</script>

<template>
  <div class="blog-page">
    <div class="page-header">
      <h1>博客动态</h1>
      <p>项目更新、技术分享与最佳实践</p>
    </div>
    <div class="post-list">
      <article v-for="post in posts" :key="post.title" class="post-card">
        <div class="post-meta">
          <span class="tag">{{ post.tag }}</span>
          <span class="date">{{ post.date }}</span>
        </div>
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
      </article>
    </div>
    <div class="bottom-nav">
      <RouterLink to="/features">&#8592; 产品特性</RouterLink>
      <RouterLink to="/contact">联系我们 &#8594;</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
  max-width: 800px;
  padding: 80px 20px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 48px;
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

.post-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
}

.post-card {
  padding: 28px;
  cursor: pointer;
  background: #f9fafb;
  border-radius: 12px;
  transition: box-shadow 0.2s;
}

.post-card:hover {
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
}

.post-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.tag {
  padding: 2px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #1677ff;
  background: #e6f4ff;
  border-radius: 4px;
}

.date {
  font-size: 0.8rem;
  color: #9ca3af;
}

.post-card h2 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.post-card p {
  margin: 0;
  line-height: 1.6;
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
