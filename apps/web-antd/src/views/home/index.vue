<template>
  <div class="p-6">
    <div class="mb-6">
      <a-typography-title :level="2">欢迎使用 Fast Vue3 · Ant Design</a-typography-title>
      <a-typography-paragraph class="text-gray-500">
        基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板
      </a-typography-paragraph>
    </div>

    <a-row :gutter="[16, 16]" class="mb-6">
      <a-col v-for="item in techStack" :key="item.name" :xs="24" :sm="12" :lg="8">
        <a-card hoverable class="h-full">
          <a-card-meta :title="item.name" :description="item.desc">
            <template #avatar>
              <a-tag :color="item.color">{{ item.type }}</a-tag>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <a-card title="快速导航" :bordered="false" class="shadow-sm">
      <a-space wrap>
        <a-button type="primary" @click="router.push('/dashboard')">
          <template #icon><DashboardOutlined /></template>
          查看仪表盘
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { DashboardOutlined } from '@ant-design/icons-vue';

  const router = useRouter();

  const techStack = [
    { name: 'Vue 3.5', desc: 'Composition API + script setup', type: 'Core', color: 'green' },
    { name: 'Ant Design Vue 4', desc: '企业级 UI 组件库', type: 'UI', color: 'blue' },
    { name: 'Vite 7', desc: '极速构建工具', type: 'Build', color: 'purple' },
    { name: 'TypeScript 5', desc: '类型安全保障', type: 'Lang', color: 'geekblue' },
    { name: 'Pinia 3', desc: '状态管理 + 持久化', type: 'State', color: 'orange' },
    { name: 'Vue Router 4', desc: '文件系统路由', type: 'Router', color: 'cyan' },
    { name: 'UnoCSS', desc: '原子化 CSS', type: 'Style', color: 'volcano' },
    { name: 'Monorepo', desc: 'pnpm + Turbo 工程体系', type: 'Arch', color: 'magenta' },
  ];
</script>
