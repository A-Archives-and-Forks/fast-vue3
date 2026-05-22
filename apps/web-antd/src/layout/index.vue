<template>
  <ALayout class="wh-full">
    <ALayoutSider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="bg-gray-900"
    >
      <div class="flex-center h-16 text-white font-bold text-lg truncate px-4">
        {{ collapsed ? 'FV3' : 'Fast Vue3' }}
      </div>
      <AMenu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        @click="handleMenuClick"
      >
        <AMenuItem key="/home">
          <template #icon><HomeOutlined /></template>
          首页
        </AMenuItem>
        <AMenuItem key="/dashboard">
          <template #icon><DashboardOutlined /></template>
          仪表盘
        </AMenuItem>
      </AMenu>
    </ALayoutSider>

    <ALayout>
      <ALayoutHeader class="bg-white px-4 flex-between shadow-sm">
        <MenuFoldOutlined
          v-if="!collapsed"
          class="text-lg cursor-pointer"
          @click="collapsed = true"
        />
        <MenuUnfoldOutlined
          v-else
          class="text-lg cursor-pointer"
          @click="collapsed = false"
        />
        <ADropdown>
          <div class="flex items-center gap-2 cursor-pointer">
            <AAvatar :src="userStore.avatar" :size="32">
              {{ userStore.userName?.charAt(0)?.toUpperCase() }}
            </AAvatar>
            <span>{{ userStore.userName }}</span>
          </div>
          <template #overlay>
            <AMenu>
              <AMenuItem key="logout" @click="handleLogout">退出登录</AMenuItem>
            </AMenu>
          </template>
        </ADropdown>
      </ALayoutHeader>

      <ALayoutContent class="m-4 p-4 bg-white rounded overflow-auto">
        <RouterView />
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { message } from 'ant-design-vue';
  import {
    HomeOutlined,
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons-vue';
  import { useUserStore } from '@fast-vue3/stores';

  const router = useRouter();
  const route = useRoute();
  const userStore = useUserStore();
  const collapsed = ref(false);
  const selectedKeys = computed(() => [route.path]);

  function handleMenuClick({ key }: { key: string }) {
    router.push(key);
  }

  async function handleLogout() {
    userStore.logout();
    message.success('已退出登录');
    await router.push('/login');
  }
</script>
