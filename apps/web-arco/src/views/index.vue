<template>
  <a-layout class="wh-full">
    <a-layout-sider
      :collapsed="collapsed"
      :collapsed-width="64"
      collapsible
      breakpoint="lg"
      class="bg-gray-900"
    >
      <div class="flex-center h-16 text-white font-bold truncate px-2">
        {{ collapsed ? 'FV3' : 'Fast Vue3 · Arco' }}
      </div>
      <a-menu
        :selected-keys="[$route.path]"
        theme="dark"
        @menu-item-click="router.push($event)"
      >
        <a-menu-item key="/">
          <template #icon><icon-home /></template>
          首页
        </a-menu-item>
        <a-menu-item key="/dashboard">
          <template #icon><icon-dashboard /></template>
          仪表盘
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="flex-between bg-white shadow-sm px-4">
        <a-button type="text" @click="collapsed = !collapsed">
          <template #icon>
            <icon-menu-fold v-if="!collapsed" />
            <icon-menu-unfold v-else />
          </template>
        </a-button>
        <a-dropdown>
          <a-button type="text">{{ userStore.userName }}</a-button>
          <template #content>
            <a-doption @click="handleLogout">退出登录</a-doption>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content class="p-4 bg-gray-50 overflow-auto">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { useUserStore } from '@fast-vue3/stores';

  const router = useRouter();
  const userStore = useUserStore();
  const collapsed = ref(false);

  async function handleLogout() {
    userStore.logout();
    Message.success('已退出登录');
    await router.push('/login');
  }
</script>
