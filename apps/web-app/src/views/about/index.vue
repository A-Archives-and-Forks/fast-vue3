<script setup lang="ts">
const techItems = [
  { label: 'Vue', value: 'Vue 3.5 + Composition API' },
  { label: 'Build', value: 'Vite + Turborepo' },
  { label: 'Language', value: 'TypeScript' },
  { label: 'Style', value: 'UnoCSS + CSS Variables' },
  { label: 'State', value: 'Pinia + Persistedstate' },
  { label: 'Router', value: 'Vue Router + File Routes' },
];
</script>

<template>
  <div class="about-page">
    <h1>关于项目</h1>
    <p class="desc">
      Fast Vue3 是一个基于 Vite + Turborepo 的多 UI 框架 Monorepo
      模板项目，旨在为开发者提供开箱即用的前端工程化解决方案。同时集成 7 大主流
      Admin UI 框架，支持后台管理和纯页面两种开发模式。
    </p>
    <h2>技术栈</h2>
    <div class="grid">
      <div v-for="item in techItems" :key="item.label" class="card">
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </div>
    <div class="nav-links">
      <RouterLink to="/">&#8592; 返回首页</RouterLink>
      <RouterLink to="/features">查看特性 &#8594;</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 800px;
  padding: 80px 20px;
  margin: 0 auto;
}

.about-page h1 {
  margin: 0 0 20px;
  font-size: 2.5rem;
  color: #111827;
}

.desc {
  margin: 0 0 48px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #6b7280;
}

.about-page h2 {
  margin: 0 0 24px;
  font-size: 1.5rem;
  color: #111827;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}

.card {
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
}

.label {
  margin-bottom: 4px;
  font-size: 0.8rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-weight: 600;
  color: #111827;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  font-weight: 500;
  color: #1677ff;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>
