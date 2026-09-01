import { createApp } from 'vue';

import { setupStore } from '@fast-vue3/stores';
import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/themes';

import App from './App.vue';
import { setupAntd } from './plugins/antd';
import { setupRouter } from './router';

import 'ant-design-vue/dist/reset.css';

async function bootstrap() {
  const app = createApp(App);

  // 1. Pinia
  setupStore(app);

  // 2. Ant Design Vue 全局配置
  setupAntd(app);

  // 3. Vue Router（含权限守卫）
  const router = setupRouter(app);
  await router.isReady();

  app.mount('#app');
}

bootstrap();
