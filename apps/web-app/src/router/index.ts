import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/index.vue'),
  },
  {
    path: '/features',
    name: 'features',
    component: () => import('../views/features/index.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/blog/index.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/contact/index.vue'),
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
