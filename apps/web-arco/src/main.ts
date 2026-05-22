import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from '@fast-vue3/stores';
import { setupArco } from './plugins/arco';

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  setupArco(app);
  const router = setupRouter(app);
  await router.isReady();
  app.mount('#app');
}

bootstrap();
