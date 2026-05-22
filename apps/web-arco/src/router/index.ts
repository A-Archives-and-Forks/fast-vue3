import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import { setupAccessGuard } from '@fast-vue3/access';
import Layout from '../layout/index.vue';

const AUTH_ROUTES = new Set(['/login']);

export function setupRouter(app: App) {
  const authRoutes = routes.filter((r) => AUTH_ROUTES.has(r.path as string));
  const appRoutes = routes.filter((r) => !AUTH_ROUTES.has(r.path as string));

  const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
    routes: [
      { path: '/', component: Layout, redirect: '/home', children: appRoutes },
      ...authRoutes,
    ],
    scrollBehavior: () => ({ top: 0 }),
  });

  setupAccessGuard(router, { whiteList: ['/login'], loginRoute: '/login' });
  app.use(router);
  return router;
}
