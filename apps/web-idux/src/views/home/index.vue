<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = [
  { label: '总用户', value: '12,480', borderColor: '#3B82F6' },
  { label: '今日访问', value: '3,256', borderColor: '#22C55E' },
  { label: '活跃应用', value: '5', borderColor: '#722ed1' },
  { label: '系统正常率', value: '99.9%', borderColor: '#F59E0B' },
];

const quickActions = [
  { emoji: '📊', label: '仪表盘', path: '/dashboard' },
  { emoji: '👥', label: '用户管理', path: '/user' },
  { emoji: '🧩', label: '组件展示', path: '/components' },
  { emoji: '👤', label: '个人中心', path: '/profile' },
  { emoji: '⚙️', label: '系统设置', path: '/settings' },
  { emoji: '📖', label: '关于项目', path: '/about' },
];

const techTags = [
  { label: 'Vue 3.5', color: 'green' },
  { label: 'iDux', color: 'blue' },
  { label: 'Vite 8', color: 'purple' },
  { label: 'TypeScript 6', color: 'geekblue' },
  { label: 'Pinia 3', color: 'orange' },
  { label: 'Vue Router 4', color: 'cyan' },
];
</script>

<template>
  <div style="padding: 24px; margin-bottom: 24px">
    <h2>欢迎回来</h2>
    <p class="text-gray-500">
      基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板
    </p>
    <IxDivider />

    <IxRow :gutter="16" style="margin-bottom: 24px">
      <IxCol v-for="stat in stats" :key="stat.label" :span="6">
        <IxCard :style="{ borderLeft: `4px solid ${stat.borderColor}` }">
          <div
            style="font-size: 28px; font-weight: bold"
            :style="{ color: stat.borderColor }"
          >
            {{ stat.value }}
          </div>
          <div class="text-gray-500" style="margin-top: 4px">
            {{ stat.label }}
          </div>
        </IxCard>
      </IxCol>
    </IxRow>

    <IxCard title="快捷操作" style="margin-bottom: 24px">
      <IxRow :gutter="16">
        <IxCol v-for="action in quickActions" :key="action.label" :span="4">
          <IxCard
            hoverable
            style="text-align: center; cursor: pointer"
            @click="router.push(action.path)"
          >
            <div style="font-size: 28px">{{ action.emoji }}</div>
            <div style="margin-top: 8px">{{ action.label }}</div>
          </IxCard>
        </IxCol>
      </IxRow>
    </IxCard>

    <IxCard title="技术栈">
      <div style="display: flex; flex-wrap: wrap; gap: 8px">
        <IxTag v-for="tag in techTags" :key="tag.label" :color="tag.color">
          {{ tag.label }}
        </IxTag>
      </div>
    </IxCard>
  </div>
</template>
