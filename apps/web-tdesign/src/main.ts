import { createApp } from 'vue';

import { setupStore } from '@fast-vue3/stores';
import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/themes';

import App from './App.vue';
import { setupTDesign } from './plugins/tdesign';
import { setupRouter } from './router';

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  setupTDesign(app);
  const router = setupRouter(app);
  await router.isReady();
  app.mount('#app');
}

bootstrap();
