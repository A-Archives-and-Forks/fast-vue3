import { createApp } from 'vue';

import { setupStore } from '@fast-vue3/stores';
import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/themes';

import App from './App.vue';
import { setupNaive } from './plugins/naive';
import { setupRouter } from './router';

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  setupNaive(app);
  const router = setupRouter(app);
  await router.isReady();
  app.mount('#app');
}

bootstrap();
