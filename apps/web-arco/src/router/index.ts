import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import { setupAccessGuard } from '@fast-vue3/access';

export function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
    routes,
  });
  setupAccessGuard(router, { whiteList: ['/login'], loginRoute: '/login' });
  app.use(router);
  return router;
}
