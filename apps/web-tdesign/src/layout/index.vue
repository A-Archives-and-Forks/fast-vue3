<template>
  <t-layout class="wh-full">
    <t-aside :width="collapsed ? '64px' : '200px'" class="bg-gray-900 transition-all">
      <div class="flex-center h-16 text-white font-bold truncate px-2">
        {{ collapsed ? 'FV3' : 'Fast Vue3 · TDesign' }}
      </div>
      <t-menu
        :value="$route.path"
        theme="dark"
        :collapsed="collapsed"
        @change="router.push($event as string)"
      >
        <t-menu-item value="/home">
          <template #icon><t-icon name="home" /></template>
          首页
        </t-menu-item>
        <t-menu-item value="/dashboard">
          <template #icon><t-icon name="chart" /></template>
          仪表盘
        </t-menu-item>
      </t-menu>
    </t-aside>

    <t-layout>
      <t-header class="flex-between bg-white shadow-sm px-4">
        <t-button variant="text" @click="collapsed = !collapsed">
          <template #icon>
            <t-icon :name="collapsed ? 'view-list' : 'view-module'" />
          </template>
        </t-button>
        <t-dropdown :options="userOptions" @click="handleDropdown">
          <t-button variant="text">{{ userStore.userName }}</t-button>
        </t-dropdown>
      </t-header>
      <t-content class="p-4 bg-gray-50 overflow-auto">
        <RouterView />
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { MessagePlugin } from 'tdesign-vue-next';
  import { useUserStore } from '@fast-vue3/stores';

  const router = useRouter();
  const userStore = useUserStore();
  const collapsed = ref(false);

  const userOptions = [{ content: '退出登录', value: 'logout' }];

  async function handleDropdown(data: { value: string }) {
    if (data.value === 'logout') {
      userStore.logout();
      await MessagePlugin.success('已退出登录');
      await router.push('/login');
    }
  }
</script>
