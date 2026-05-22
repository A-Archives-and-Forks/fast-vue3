import type { App } from 'vue';
import type { Pinia } from 'pinia';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

let _pinia: Pinia;

export function setupStore(app: App): Pinia {
  _pinia = createPinia();
  _pinia.use(piniaPluginPersistedstate);
  app.use(_pinia);
  return _pinia;
}

export function getPinia(): Pinia {
  return _pinia;
}
