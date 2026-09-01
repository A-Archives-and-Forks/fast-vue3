import { createApp } from 'vue';

import { setupStore } from '@fast-vue3/stores';
import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/themes';

import App from './App.vue';
import { setupEle } from './plugins/ele';
import { setupRouter } from './router';

import 'element-plus/dist/index.css';
// Element Plus 暗色模式：导入暗色 css 变量，配合 <html class="dark"> 生效
import 'element-plus/theme-chalk/dark/css-vars.css';

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  setupEle(app);
  const router = setupRouter(app);
  await router.isReady();
  app.mount('#app');
}

bootstrap();
