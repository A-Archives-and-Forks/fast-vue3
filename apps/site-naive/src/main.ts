import { createApp } from 'vue';

import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/site';
import '@fast-vue3/styles/themes';

import App from './App.vue';
import { vReveal } from './composables/reveal';
import { router } from './router';

const app = createApp(App);

app.directive('reveal', vReveal);
app.use(router);
router.isReady().then(() => app.mount('#app'));
