<template>
  <div class="p-6">
    <div class="mb-6">
      <t-typography>
        <h2 class="text-2xl font-bold text-gray-800">欢迎使用 Fast Vue3 · TDesign</h2>
        <p class="text-gray-500 mt-2">基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板</p>
      </t-typography>
    </div>

    <t-row :gutter="[16, 16]" class="mb-6">
      <t-col v-for="item in techStack" :key="item.name" :xs="12" :sm="8" :xl="6">
        <t-card hoverable>
          <template #header>
            <div class="flex items-center gap-2">
              <t-tag :theme="item.theme" size="small">{{ item.type }}</t-tag>
              <span class="font-semibold">{{ item.name }}</span>
            </div>
          </template>
          <p class="text-sm text-gray-500 m-0">{{ item.desc }}</p>
        </t-card>
      </t-col>
    </t-row>

    <t-card title="快速导航" bordered>
      <t-space>
        <t-button theme="primary" @click="router.push('/dashboard')">
          <template #icon><t-icon name="chart" /></template>
          查看仪表盘
        </t-button>
      </t-space>
    </t-card>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import type { TagProps } from 'tdesign-vue-next';

  const router = useRouter();

  const techStack: Array<{ name: string; desc: string; type: string; theme: TagProps['theme'] }> = [
    { name: 'Vue 3.5', desc: 'Composition API + script setup', type: 'Core', theme: 'success' },
    { name: 'TDesign Vue Next', desc: '腾讯企业级组件库', type: 'UI', theme: 'primary' },
    { name: 'Vite 7', desc: '极速构建工具', type: 'Build', theme: 'default' },
    { name: 'TypeScript 5', desc: '类型安全保障', type: 'Lang', theme: 'warning' },
    { name: 'Pinia 3', desc: '状态管理 + 持久化', type: 'State', theme: 'danger' },
    { name: 'Vue Router 4', desc: '文件系统路由', type: 'Router', theme: 'default' },
    { name: 'UnoCSS', desc: '原子化 CSS', type: 'Style', theme: 'default' },
    { name: 'Monorepo', desc: 'pnpm + Turbo 工程体系', type: 'Arch', theme: 'success' },
  ];
</script>
