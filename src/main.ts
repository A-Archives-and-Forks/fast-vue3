// SVG 图标注册
import 'virtual:svg-icons-register';
// UnoCSS
import 'virtual:uno.css';

import { createApp } from 'vue';

import App from './App.vue';
import { setupUIPlugins } from './plugins/setup';
import router from './router';
import piniaStore from './store';

const app = createApp(App);

setupUIPlugins(app);
app.use(router);
app.use(piniaStore);
app.mount('#app');
