import { createApp } from 'vue';

import { setupStore } from '@fast-vue3/stores';
import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/themes';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import App from './App.vue';
import { setupRouter } from './router';

import 'primeicons/primeicons.css';

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: { darkModeSelector: '.dark' },
    },
  });
  app.use(ToastService);
  app.use(ConfirmationService);

  const router = setupRouter(app);
  await router.isReady();

  app.mount('#app');
}

bootstrap();
