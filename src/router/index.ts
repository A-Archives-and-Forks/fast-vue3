import 'nprogress/nprogress.css';

import NProgress from 'nprogress';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';

const baseURL = import.meta.env.VITE_BASE_URL;

//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(baseURL),
  routes,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
