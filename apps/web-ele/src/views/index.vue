<template>
  <el-container class="wh-full">
    <el-aside :width="collapsed ? '64px' : '200px'" class="bg-gray-900 transition-all">
      <div class="flex-center h-16 text-white font-bold truncate px-2">
        {{ collapsed ? 'FV3' : 'Fast Vue3 · ELE' }}
      </div>
      <el-menu
        :default-active="$route.path"
        background-color="#111827"
        text-color="#fff"
        active-text-color="#409eff"
        :collapse="collapsed"
        router
      >
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/dashboard">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container direction="vertical">
      <el-header class="flex-between bg-white shadow-sm px-4">
        <el-icon class="cursor-pointer text-lg" @click="collapsed = !collapsed">
          <Fold v-if="!collapsed" /><Expand v-else />
        </el-icon>
        <el-dropdown @command="handleCommand">
          <div class="flex items-center gap-2 cursor-pointer">
            <el-avatar :size="32">{{ userStore.userName?.charAt(0)?.toUpperCase() }}</el-avatar>
            <span>{{ userStore.userName }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="bg-gray-50 overflow-auto">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { HomeFilled, DataAnalysis, Fold, Expand } from '@element-plus/icons-vue';
  import { useUserStore } from '@fast-vue3/stores';

  const router = useRouter();
  const userStore = useUserStore();
  const collapsed = ref(false);

  async function handleCommand(command: string) {
    if (command === 'logout') {
      userStore.logout();
      ElMessage.success('已退出登录');
      await router.push('/login');
    }
  }
</script>
