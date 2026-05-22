<template>
  <div class="p-6">
    <div class="mb-6">
      <n-h2>欢迎使用 Fast Vue3 · Naive UI</n-h2>
      <n-text depth="3">基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板</n-text>
    </div>

    <n-grid :cols="3" :x-gap="16" :y-gap="16" responsive="screen" class="mb-6">
      <n-gi v-for="item in techStack" :key="item.name">
        <n-card hoverable>
          <div class="flex items-center gap-2 mb-2">
            <n-tag :type="item.tagType" size="small">{{ item.type }}</n-tag>
            <span class="font-semibold">{{ item.name }}</span>
          </div>
          <n-text depth="3" class="text-sm">{{ item.desc }}</n-text>
        </n-card>
      </n-gi>
    </n-grid>

    <n-card title="快速导航">
      <n-space>
        <n-button type="primary" @click="router.push('/dashboard')">查看仪表盘</n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import type { TagProps } from 'naive-ui';

  const router = useRouter();

  const techStack: Array<{ name: string; desc: string; type: string; tagType: TagProps['type'] }> = [
    { name: 'Vue 3.5', desc: 'Composition API + script setup', type: 'Core', tagType: 'success' },
    { name: 'Naive UI 2', desc: '轻量级 Vue3 组件库', type: 'UI', tagType: 'info' },
    { name: 'Vite 7', desc: '极速构建工具', type: 'Build', tagType: 'default' },
    { name: 'TypeScript 5', desc: '类型安全保障', type: 'Lang', tagType: 'warning' },
    { name: 'Pinia 3', desc: '状态管理 + 持久化', type: 'State', tagType: 'error' },
    { name: 'Vue Router 4', desc: '文件系统路由', type: 'Router', tagType: 'default' },
    { name: 'UnoCSS', desc: '原子化 CSS', type: 'Style', tagType: 'info' },
    { name: 'Monorepo', desc: 'pnpm + Turbo 工程体系', type: 'Arch', tagType: 'success' },
  ];
</script>
