<template>
  <div class="p-6">
    <div class="mb-6">
      <a-typography>
        <a-typography-title :heading="2">欢迎使用 Fast Vue3 · Arco Design</a-typography-title>
        <a-typography-paragraph>
          基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板
        </a-typography-paragraph>
      </a-typography>
    </div>

    <a-row :gutter="16" class="mb-6">
      <a-col v-for="item in techStack" :key="item.name" :xs="24" :sm="12" :lg="8" class="mb-4">
        <a-card hoverable class="h-full">
          <div class="flex items-center gap-2 mb-2">
            <a-tag :color="item.color" size="small">{{ item.type }}</a-tag>
            <span class="font-semibold text-gray-800">{{ item.name }}</span>
          </div>
          <p class="text-sm text-gray-500 m-0">{{ item.desc }}</p>
        </a-card>
      </a-col>
    </a-row>

    <a-card title="快速导航" :bordered="false">
      <a-space>
        <a-button type="primary" @click="router.push('/dashboard')">
          <template #icon><icon-dashboard /></template>
          查看仪表盘
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const techStack = [
    { name: 'Vue 3.5', desc: 'Composition API + script setup', type: 'Core', color: 'green' },
    { name: 'Arco Design Vue 2', desc: '字节跳动企业级组件库', type: 'UI', color: 'arcoblue' },
    { name: 'Vite 7', desc: '极速构建工具', type: 'Build', color: 'purple' },
    { name: 'TypeScript 5', desc: '类型安全保障', type: 'Lang', color: 'blue' },
    { name: 'Pinia 3', desc: '状态管理 + 持久化', type: 'State', color: 'orangered' },
    { name: 'Vue Router 4', desc: '文件系统路由', type: 'Router', color: 'cyan' },
    { name: 'UnoCSS', desc: '原子化 CSS', type: 'Style', color: 'red' },
    { name: 'Monorepo', desc: 'pnpm + Turbo 工程体系', type: 'Arch', color: 'magenta' },
  ];
</script>
