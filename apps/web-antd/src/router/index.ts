import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { setupAccessGuard } from '@fast-vue3/access';

export function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
    routes,
    scrollBehavior: () => ({ top: 0 }),
  });

  // 进度条
  router.beforeEach(() => NProgress.start());
  router.afterEach(() => NProgress.done());

  // 权限守卫
  setupAccessGuard(router, {
    whiteList: ['/login'],
    loginRoute: '/login',
  });

  app.use(router);
  return router;
}
