import { createApp } from 'vue';

import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/site';
import '@fast-vue3/styles/themes';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from './App.vue';
import { vReveal } from './composables/reveal';
import { router } from './router';

import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.dark' },
  },
});
app.use(ToastService);
app.directive('reveal', vReveal);
app.use(router);
router.isReady().then(() => app.mount('#app'));
