<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = [
  { label: '总用户', value: 12_480, type: 'info' as const },
  { label: '今日访问', value: 3256, type: 'success' as const },
  { label: '活跃应用', value: 5, type: 'warning' as const },
  { label: '系统正常率', value: '99.9%', type: 'error' as const },
];

const quickActions = [
  { emoji: '📊', label: '仪表盘', path: '/dashboard' },
  { emoji: '👥', label: '用户管理', path: '/user' },
  { emoji: '🧩', label: '组件展示', path: '/components' },
  { emoji: '👤', label: '个人中心', path: '/profile' },
  { emoji: '⚙️', label: '系统设置', path: '/settings' },
  { emoji: '📖', label: '关于项目', path: '/about' },
];

const techStack = [
  { name: 'Vue 3.5', type: 'success' as const },
  { name: 'Naive UI', type: 'info' as const },
  { name: 'Vite 8', type: 'warning' as const },
  { name: 'TypeScript 6', type: 'default' as const },
  { name: 'Pinia 3', type: 'error' as const },
  { name: 'Vue Router 4', type: 'success' as const },
];
</script>

<template>
  <div style="padding: 24px">
    <!-- Welcome Section -->
    <div style="margin-bottom: 24px">
      <n-h2>欢迎回来</n-h2>
      <n-p depth="3">
        基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板
      </n-p>
      <n-divider />
    </div>

    <!-- Quick Stats Row -->
    <n-grid :cols="4" :x-gap="16" :y-gap="16" style="margin-bottom: 24px">
      <n-grid-item v-for="stat in stats" :key="stat.label">
        <n-card
          embedded
          :bordered="false"
          style="padding-left: 8px; border-left: 4px solid"
          :style="{
            borderLeftColor:
              stat.type === 'info'
                ? '#2080f0'
                : stat.type === 'success'
                  ? '#18a058'
                  : stat.type === 'warning'
                    ? '#f0a020'
                    : '#d03050',
          }"
        >
          <n-statistic :label="stat.label">
            <template #default>
              <span
                :style="{
                  color:
                    stat.type === 'info'
                      ? '#2080f0'
                      : stat.type === 'success'
                        ? '#18a058'
                        : stat.type === 'warning'
                          ? '#f0a020'
                          : '#d03050',
                  fontSize: '28px',
                  fontWeight: 600,
                }"
              >
                {{ stat.value }}
              </span>
            </template>
          </n-statistic>
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- Quick Actions Section -->
    <n-card title="快捷操作" style="margin-bottom: 24px">
      <n-grid :cols="3" :x-gap="16" :y-gap="16">
        <n-grid-item v-for="action in quickActions" :key="action.path">
          <n-card
            hoverable
            style="text-align: center; cursor: pointer"
            @click="router.push(action.path)"
          >
            <div style="margin-bottom: 8px; font-size: 32px">
              {{ action.emoji }}
            </div>
            <n-text>{{ action.label }}</n-text>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-card>

    <!-- Tech Stack Section -->
    <n-card title="技术栈">
      <n-space wrap>
        <n-tag
          v-for="tech in techStack"
          :key="tech.name"
          :type="tech.type"
          size="medium"
        >
          {{ tech.name }}
        </n-tag>
      </n-space>
    </n-card>
  </div>
</template>
