<script setup lang="ts">
const features = [
  {
    title: '多 UI 框架集成',
    desc: '内置 7 大 UI 框架支持，Ant Design Vue、Element Plus、Naive UI、Arco Design、TDesign、PrimeVue、iDux，通过 create-app 命令一键选择。',
    icon: '&#127912;',
  },
  {
    title: 'Monorepo 工程体系',
    desc: '基于 pnpm workspace + Turborepo，统一管理 packages、apps、internal 工具链，依赖复用、增量构建、并行编译。',
    icon: '&#128230;',
  },
  {
    title: 'TypeScript 全覆盖',
    desc: '从 tsconfig 统一继承、vue-tsc 类型检查到 auto-import 类型声明，全链路类型安全。',
    icon: '&#128295;',
  },
  {
    title: '自动按需导入',
    desc: 'unplugin-auto-import 自动导入 Vue/Router/Pinia API，unplugin-vue-components 自动注册 UI 组件，零手动 import。',
    icon: '&#9889;',
  },
  {
    title: '主题与样式',
    desc: '基于 CSS Variables 的主题系统，支持亮色/暗色模式切换，配合 UnoCSS 原子化框架实现高效样式开发。',
    icon: '&#127912;',
  },
  {
    title: '代码质量保障',
    desc: 'ESLint + Prettier + Stylelint + Commitlint + Lefthook，提交前自动检查，保证代码风格一致。',
    icon: '&#128736;',
  },
];
</script>

<template>
  <div class="features-page">
    <div class="page-header">
      <h1>产品特性</h1>
      <p>Fast Vue3 为现代前端开发提供完整的工程化解决方案</p>
    </div>
    <div class="grid">
      <div v-for="f in features" :key="f.title" class="card">
        <span class="card-icon" v-html="f.icon"></span>
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
