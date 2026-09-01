import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useUserStore } from '@fast-vue3/stores';

import { ROUTE_TITLES } from './routeTitles';

export interface TabItem {
  path: string;
  title: string;
}

export function useLayout() {
  const router = useRouter();
  const route = useRoute();
  const userStore = useUserStore();

  const collapsed = ref(false);
  const tabs = ref<TabItem[]>([{ path: '/home', title: '首页' }]);

  const selectedKeys = computed(() => [route.path]);

  const breadcrumbs = computed(() => {
    if (route.path === '/home') return [];
    const title = ROUTE_TITLES[route.path] ?? route.path;
    return [{ path: route.path, title }];
  });

  watch(
    () => route.path,
    (path) => {
      if (path === '/login') return;
      const title = ROUTE_TITLES[path] ?? path;
      if (!tabs.value.some((t) => t.path === path)) {
        tabs.value.push({ path, title });
      }
    },
    { immediate: true },
  );

  function closeTab(path: string) {
    if (path === '/home') return;
    const idx = tabs.value.findIndex((t) => t.path === path);
    if (idx === -1) return;
    tabs.value.splice(idx, 1);
    if (route.path === path) {
      router.push(tabs.value[Math.max(0, idx - 1)]?.path ?? '/home');
    }
  }

  async function handleLogout() {
    await userStore.logout();
    router.push('/login');
  }

  return {
    collapsed,
    tabs,
    selectedKeys,
    breadcrumbs,
    closeTab,
    handleLogout,
    userStore,
    router,
    route,
    ROUTE_TITLES,
  };
}
