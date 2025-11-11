import App from './App.vue';
import router from './router';
import piniaStore from './store';

// 支持SVG
import 'virtual:svg-icons-register';
import '@arco-design/web-vue/dist/arco.css';

// unocss
import 'virtual:uno.css';

// DevUI
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';

import { ThemeServiceInit, infinityTheme } from 'devui-theme';

ThemeServiceInit({ infinityTheme }, 'infinityTheme');

// TDesign
import 'tdesign-vue-next/es/style/index.css';

// idux
import Idux from '../build/idux';

//vue3的挂载方式
const app = createApp(App);

app.use(Idux);
app.use(router);
app.use(piniaStore);
app.mount('#app');
