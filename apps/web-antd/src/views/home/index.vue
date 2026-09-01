<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = [
  { title: '总用户', value: 12_480, border: '#1890ff' },
  { title: '今日访问', value: 3256, border: '#52c41a' },
  { title: '活跃应用', value: 5, border: '#722ed1' },
  { title: '系统正常率', value: 99.9, suffix: '%', border: '#fa8c16' },
];

const actions = [
  { label: '仪表盘', icon: '📊', path: '/dashboard' },
  { label: '用户管理', icon: '👥', path: '/system/user' },
  { label: '角色管理', icon: '🔐', path: '/system/role' },
  { label: '菜单管理', icon: '📋', path: '/system/menu' },
  { label: '系统设置', icon: '⚙️', path: '/settings' },
  { label: '日志中心', icon: '📝', path: '/log/operation' },
];

const techTags = [
  { name: 'Vue 3.5', color: 'green' },
  { name: 'Ant Design Vue 4', color: 'blue' },
  { name: 'Vite 8', color: 'purple' },
  { name: 'TypeScript 6', color: 'geekblue' },
  { name: 'Pinia 3', color: 'orange' },
  { name: 'Vue Router 4', color: 'cyan' },
];

function navigate(path: string) {
  router.push(path);
}
</script>

<template>
  <div style="padding: 24px">
    <!-- Welcome Section -->
    <div style="margin-bottom: 24px">
      <a-typography-title :level="2"> 欢迎回来 </a-typography-title>
      <a-typography-paragraph type="secondary">
        Fast Vue3 管理平台 —— 基于 Monorepo 工程体系，集成 Ant Design Vue
        的企业级后台解决方案
      </a-typography-paragraph>
    </div>

    <!-- Quick Stats Row -->
    <a-row :gutter="16" style="margin-bottom: 24px">
      <a-col v-for="stat in stats" :key="stat.title" :span="6">
        <a-card
          :bordered="false"
          :style="{ borderLeft: `4px solid ${stat.border}` }"
        >
          <a-statistic
            :title="stat.title"
            :value="stat.value"
            :suffix="stat.suffix"
          />
        </a-card>
      </a-col>
    </a-row>

    <!-- Quick Actions Section -->
    <a-card title="快捷操作" :bordered="false" style="margin-bottom: 24px">
      <a-row :gutter="[16, 16]">
        <a-col v-for="action in actions" :key="action.label" :span="4">
          <a-card
            hoverable
            style="text-align: center"
            @click="navigate(action.path)"
          >
            <div style="margin-bottom: 8px; font-size: 28px">
              {{ action.icon }}
            </div>
            <div>{{ action.label }}</div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <!-- Tech Stack Section -->
    <a-card title="技术栈" :bordered="false">
      <a-row :gutter="[12, 12]">
        <a-col v-for="tag in techTags" :key="tag.name">
          <a-tag :color="tag.color">
            {{ tag.name }}
          </a-tag>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
