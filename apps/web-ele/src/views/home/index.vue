<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = [
  { label: '总用户', value: '12,480', color: '#409EFF' },
  { label: '今日访问', value: '3,256', color: '#67C23A' },
  { label: '活跃应用', value: '5', color: '#722ed1' },
  { label: '系统正常率', value: '99.9%', color: '#E6A23C' },
];

const actions = [
  { icon: '📊', label: '仪表盘', path: '/dashboard' },
  { icon: '👥', label: '用户管理', path: '/user' },
  { icon: '🧩', label: '组件展示', path: '/components' },
  { icon: '👤', label: '个人中心', path: '/profile' },
  { icon: '⚙️', label: '系统设置', path: '/settings' },
  { icon: '📖', label: '关于项目', path: '/about' },
];

const techStack = [
  { name: 'Vue 3.5', type: 'success' as const },
  { name: 'Element Plus', type: 'primary' as const },
  { name: 'Vite 8', type: 'warning' as const },
  { name: 'TypeScript 6', type: 'info' as const },
  { name: 'Pinia 3', type: 'danger' as const },
  { name: 'Vue Router 4', type: 'success' as const },
];
</script>

<template>
  <div style="padding: 24px">
    <!-- Welcome Section -->
    <div style="margin-bottom: 24px">
      <h2 style="margin: 0 0 8px; font-size: 24px; font-weight: bold">
        欢迎回来
      </h2>
      <p style="margin: 0; color: #909399">
        基于 Monorepo 工程平台，集成多 UI 生态的 Vue3 管理后台模板
      </p>
      <el-divider />
    </div>

    <!-- Quick Stats Row -->
    <el-row :gutter="16" style="margin-bottom: 24px">
      <el-col v-for="stat in stats" :key="stat.label" :span="6">
        <el-card
          shadow="never"
          style="border-left: 4px solid"
          :style="{ borderLeftColor: stat.color }"
        >
          <div style="text-align: center">
            <div
              :style="{
                fontSize: '28px',
                fontWeight: 'bold',
                color: stat.color,
              }"
            >
              {{ stat.value }}
            </div>
            <div style="margin-top: 8px; font-size: 14px; color: #909399">
              {{ stat.label }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Quick Actions Section -->
    <el-card header="快捷操作" shadow="never" style="margin-bottom: 24px">
      <el-row :gutter="16">
        <el-col v-for="action in actions" :key="action.path" :span="4">
          <el-card
            shadow="hover"
            style="text-align: center; cursor: pointer"
            @click="router.push(action.path)"
          >
            <div style="margin-bottom: 8px; font-size: 32px">
              {{ action.icon }}
            </div>
            <div style="font-size: 14px; color: #606266">
              {{ action.label }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <!-- Tech Stack Section -->
    <el-card header="技术栈" shadow="never">
      <el-space wrap>
        <el-tag
          v-for="tech in techStack"
          :key="tech.name"
          :type="tech.type"
          size="large"
          effect="plain"
        >
          {{ tech.name }}
        </el-tag>
      </el-space>
    </el-card>
  </div>
</template>
