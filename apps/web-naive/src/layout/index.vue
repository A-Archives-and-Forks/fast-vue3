<template>
  <n-config-provider :theme="null">
    <n-message-provider>
      <n-layout has-sider class="wh-full">
        <n-layout-sider
          bordered
          :collapsed="collapsed"
          :collapsed-width="64"
          :width="200"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <div class="flex-center h-16 font-bold text-gray-800 truncate px-2">
            {{ collapsed ? 'FV3' : 'Fast Vue3 · Naive' }}
          </div>
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :value="$route.path"
            :options="menuOptions"
            @update:value="router.push($event)"
          />
        </n-layout-sider>

        <n-layout>
          <n-layout-header class="flex-between px-4 bg-white shadow-sm" bordered>
            <div />
            <n-dropdown :options="userOptions" @select="handleSelect">
              <n-button text>{{ userStore.userName }}</n-button>
            </n-dropdown>
          </n-layout-header>
          <n-layout-content class="p-4 bg-gray-50 overflow-auto">
            <RouterView />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { ref, h } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMessage } from 'naive-ui';
  import { useUserStore } from '@fast-vue3/stores';

  const router = useRouter();
  const userStore = useUserStore();
  const collapsed = ref(false);
  const message = useMessage();

  const menuOptions = [
    { label: '首页', key: '/home' },
    { label: '仪表盘', key: '/dashboard' },
  ];

  const userOptions = [{ label: '退出登录', key: 'logout' }];

  async function handleSelect(key: string) {
    if (key === 'logout') {
      userStore.logout();
      message.success('已退出登录');
      await router.push('/login');
    }
  }
</script>
