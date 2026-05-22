<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">欢迎使用 Fast Vue3 · Element Plus</h2>
      <p class="text-gray-500 mt-2">基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板</p>
    </div>

    <el-row :gutter="16" class="mb-6">
      <el-col v-for="item in techStack" :key="item.name" :xs="24" :sm="12" :lg="8" class="mb-4">
        <el-card shadow="hover" class="h-full">
          <div class="flex items-start gap-3">
            <el-tag :type="item.tagType" size="small">{{ item.type }}</el-tag>
            <div>
              <div class="font-semibold text-gray-800">{{ item.name }}</div>
              <div class="text-sm text-gray-500 mt-1">{{ item.desc }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card title="快速导航" shadow="never">
      <template #header>
        <span class="font-semibold">快速导航</span>
      </template>
      <el-space wrap>
        <el-button type="primary" @click="router.push('/dashboard')">
          <el-icon><DataAnalysis /></el-icon>
          查看仪表盘
        </el-button>
      </el-space>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { DataAnalysis } from '@element-plus/icons-vue';

  const router = useRouter();

  const techStack = [
    { name: 'Vue 3.5', desc: 'Composition API + script setup', type: 'Core', tagType: 'success' as const },
    { name: 'Element Plus 2', desc: '企业级 UI 组件库', type: 'UI', tagType: 'primary' as const },
    { name: 'Vite 7', desc: '极速构建工具', type: 'Build', tagType: '' as const },
    { name: 'TypeScript 5', desc: '类型安全保障', type: 'Lang', tagType: 'info' as const },
    { name: 'Pinia 3', desc: '状态管理 + 持久化', type: 'State', tagType: 'warning' as const },
    { name: 'Vue Router 4', desc: '文件系统路由', type: 'Router', tagType: '' as const },
    { name: 'UnoCSS', desc: '原子化 CSS', type: 'Style', tagType: 'danger' as const },
    { name: 'Monorepo', desc: 'pnpm + Turbo 工程体系', type: 'Arch', tagType: 'info' as const },
  ];
</script>
