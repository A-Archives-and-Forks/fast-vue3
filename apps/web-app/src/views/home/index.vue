<script setup lang="ts">
const features = [
  {
    icon: '&#9889;',
    title: 'Vite + Turborepo',
    desc: '极速构建，monorepo 工程体系',
  },
  {
    icon: '&#127912;',
    title: '7 大 UI 框架',
    desc: 'Antd / Element / Naive / Arco / TDesign / PrimeVue / iDux',
  },
  {
    icon: '&#127769;',
    title: '深色/亮色双主题',
    desc: '基于 CSS Variables，一键切换',
  },
  { icon: '&#128241;', title: '响应式布局', desc: '完美适配桌面端和移动端' },
  { icon: '&#128295;', title: 'TypeScript', desc: '完整类型安全，开箱即用' },
  {
    icon: '&#128230;',
    title: '自动按需导入',
    desc: 'unplugin-auto-import + Components',
  },
];
</script>

<template>
  <div>
    <section class="hero">
      <h1>Fast Vue3</h1>
      <p>基于 Vite + Turborepo 的多 UI 框架 Monorepo 模板</p>
      <div class="hero-actions">
        <RouterLink to="/features" class="btn-white">了解更多</RouterLink>
        <RouterLink to="/contact" class="btn-outline-white">
          联系我们
        </RouterLink>
      </div>
    </section>
    <section class="features">
      <h2>核心特性</h2>
      <div class="grid">
        <div v-for="f in features" :key="f.title" class="feature-card">
          <span class="feature-icon" v-html="f.icon"></span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>
    <section class="cta">
      <h2>立即开始</h2>
      <p>只需一行命令，创建你的项目</p>
      <code>pnpm create-app</code>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 120px 20px 100px;
  color: #fff;
  text-align: center;
  background: linear-gradient(135deg, #1677ff, #722ed1);
}

.hero h1 {
  margin: 0 0 16px;
  font-size: 3.5rem;
  font-weight: 800;
}

.hero p {
  margin: 0 0 40px;
  font-size: 1.25rem;
  opacity: 0.85;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-white {
  padding: 12px 32px;
  font-weight: 600;
  color: #1677ff;
  text-decoration: none;
  background: #fff;
  border-radius: 8px;
  transition: transform 0.2s;
}

.btn-white:hover {
  transform: translateY(-2px);
}

.btn-outline-white {
  padding: 12px 32px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  background: transparent;
  border: 2px solid rgb(255 255 255 / 50%);
  border-radius: 8px;
  transition: border-color 0.2s;
}

.btn-outline-white:hover {
  border-color: #fff;
}

.features {
  max-width: 1100px;
  padding: 80px 20px;
  margin: 0 auto;
  text-align: center;
}

.features h2 {
  margin: 0 0 48px;
  font-size: 2rem;
  color: #111827;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.feature-card {
  padding: 32px 24px;
  text-align: left;
  background: #f9fafb;
  border-radius: 12px;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}

.feature-card:hover {
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
  transform: translateY(-4px);
}

.feature-icon {
  display: block;
  margin-bottom: 12px;
  font-size: 2rem;
}

.feature-card h3 {
  margin: 0 0 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.feature-card p {
  margin: 0;
  line-height: 1.6;
  color: #6b7280;
}

.cta {
  padding: 80px 20px;
  text-align: center;
  background: #f9fafb;
}

.cta h2 {
  margin: 0 0 12px;
  font-size: 2rem;
  color: #111827;
}

.cta p {
  margin: 0 0 24px;
  color: #6b7280;
}

.cta code {
  display: inline-block;
  padding: 12px 24px;
  font-family: monospace;
  font-size: 1rem;
  color: #52c41a;
  background: #111827;
  border-radius: 8px;
}
</style>
