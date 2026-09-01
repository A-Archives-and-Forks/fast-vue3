<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = [
  { label: '总用户', value: '12,480', border: '#165DFF' },
  { label: '今日访问', value: '3,256', border: '#00B42A' },
  { label: '活跃应用', value: '5', border: '#722ed1' },
  { label: '系统正常率', value: '99.9%', border: '#FF7D00' },
];

const actions = [
  { label: '仪表盘', emoji: '📊', path: '/dashboard' },
  { label: '用户管理', emoji: '👥', path: '/user' },
  { label: '组件展示', emoji: '🧩', path: '/components' },
  { label: '个人中心', emoji: '👤', path: '/profile' },
  { label: '系统设置', emoji: '⚙️', path: '/settings' },
  { label: '关于项目', emoji: '📖', path: '/about' },
];

const techStack = [
  { name: 'Vue 3.5', color: 'green' },
  { name: 'Arco Design', color: 'arcoblue' },
  { name: 'Vite 8', color: 'purple' },
  { name: 'TypeScript 6', color: 'geekblue' },
  { name: 'Pinia 3', color: 'orange' },
  { name: 'Vue Router 4', color: 'cyan' },
];
</script>

<template>
  <div style="padding: 24px">
    <!-- Welcome Section -->
    <div style="margin-bottom: 24px">
      <a-typography>
        <a-typography-title :heading="2"> 欢迎回来 </a-typography-title>
        <a-typography-paragraph>
          基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板
        </a-typography-paragraph>
      </a-typography>
      <a-divider />
    </div>

    <!-- Quick Stats -->
    <a-row :gutter="16" style="margin-bottom: 24px">
      <a-col v-for="item in stats" :key="item.label" :span="6">
        <a-card
          :bordered="false"
          :style="{ borderLeft: `4px solid ${item.border}` }"
        >
          <div
            style="font-size: 28px; font-weight: 700; line-height: 1.2"
            :style="{ color: item.border }"
          >
            {{ item.value }}
          </div>
          <div style="margin-top: 8px; font-size: 14px; color: #86909c">
            {{ item.label }}
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Quick Actions -->
    <a-card title="快捷操作" :bordered="false" style="margin-bottom: 24px">
      <a-row :gutter="[16, 16]">
        <a-col v-for="action in actions" :key="action.label" :span="4">
          <a-card
            hoverable
            style="text-align: center; cursor: pointer"
            @click="router.push(action.path)"
          >
            <div style="margin-bottom: 8px; font-size: 32px">
              {{ action.emoji }}
            </div>
            <div>{{ action.label }}</div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <!-- Tech Stack -->
    <a-card title="技术栈" :bordered="false">
      <a-space wrap>
        <a-tag
          v-for="tech in techStack"
          :key="tech.name"
          :color="tech.color"
          size="large"
        >
          {{ tech.name }}
        </a-tag>
      </a-space>
    </a-card>
  </div>
</template>
