import { createApp } from 'vue';

import App from './App.vue';
import { setupRouter } from './router';
import { setupAntd } from './plugins/antd';
import { setupStore } from '@fast-vue3/stores';

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
