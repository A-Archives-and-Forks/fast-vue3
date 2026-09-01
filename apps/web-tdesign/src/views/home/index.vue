<script setup lang="ts">
import type { TagProps } from 'tdesign-vue-next';

import { useRouter } from 'vue-router';

const router = useRouter();

const stats = [
  { label: '总用户', value: '12,480', color: '#0052D9' },
  { label: '今日访问', value: '3,256', color: '#00A870' },
  { label: '活跃应用', value: '5', color: '#722ed1' },
  { label: '系统正常率', value: '99.9%', color: '#ED7B2F' },
];

const quickActions = [
  { emoji: '📊', label: '仪表盘', path: '/dashboard' },
  { emoji: '👥', label: '用户管理', path: '/user' },
  { emoji: '🧩', label: '组件展示', path: '/components' },
  { emoji: '👤', label: '个人中心', path: '/profile' },
  { emoji: '⚙️', label: '系统设置', path: '/settings' },
  { emoji: '📖', label: '关于项目', path: '/about' },
];

const techStack: Array<{
  name: string;
  theme: TagProps['theme'];
}> = [
  { name: 'Vue 3.5', theme: 'success' },
  { name: 'TDesign', theme: 'primary' },
  { name: 'Vite 8', theme: 'warning' },
  { name: 'TypeScript 6', theme: 'default' },
  { name: 'Pinia 3', theme: 'default' },
  { name: 'Vue Router 4', theme: 'success' },
];
</script>

<template>
  <div style="padding: 24px; margin-bottom: 24px">
    <!-- Welcome Section -->
    <t-typography>
      <h2>欢迎回来</h2>
      <p>基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板</p>
    </t-typography>
    <t-divider />

    <!-- Quick Stats Row -->
    <t-row :gutter="16">
      <t-col v-for="stat in stats" :key="stat.label" :span="6">
        <t-card :bordered="false">
          <div
            style="
              display: flex;
              flex-direction: column;
              padding-left: 16px;
              border-left: 4px solid;
            "
            :style="{ borderColor: stat.color }"
          >
            <span
              style="font-size: 28px; font-weight: 700; line-height: 1.4"
              :style="{ color: stat.color }"
            >
              {{ stat.value }}
            </span>
            <span style="margin-top: 4px; font-size: 14px; color: #888">
              {{ stat.label }}
            </span>
          </div>
        </t-card>
      </t-col>
    </t-row>

    <!-- Quick Actions -->
    <t-card title="快捷操作" style="margin-top: 24px">
      <t-row :gutter="[16, 16]">
        <t-col v-for="action in quickActions" :key="action.label" :span="4">
          <t-card
            hoverable
            bordered
            style="text-align: center; cursor: pointer"
            @click="router.push(action.path)"
          >
            <div style="margin-bottom: 8px; font-size: 32px">
              {{ action.emoji }}
            </div>
            <div>{{ action.label }}</div>
          </t-card>
        </t-col>
      </t-row>
    </t-card>

    <!-- Tech Stack -->
    <t-card title="技术栈" style="margin-top: 24px">
      <t-space>
        <t-tag
          v-for="tech in techStack"
          :key="tech.name"
          :theme="tech.theme"
          size="large"
        >
          {{ tech.name }}
        </t-tag>
      </t-space>
    </t-card>
  </div>
</template>
