/**
 * @file setup.ts
 * @description UI 库插件初始化入口
 *
 * 说明：
 * 当前 Polyrepo 阶段，所有 UI 库共存于同一应用中作为"UI 生态展示平台"。
 * 在 Monorepo 阶段，每个 UI 库将拆分到独立的 app 中，此文件届时不再需要。
 */

// ---- Arco Design Vue ----
import '@arco-design/web-vue/dist/arco.css';
// ---- DevUI ----
import '@devui-design/icons/icomoon/devui-icon.css';
import 'vue-devui/style.css';
// ---- TDesign ----
import 'tdesign-vue-next/es/style/index.css';

import { infinityTheme, ThemeServiceInit } from 'devui-theme';
import type { App } from 'vue';

// ---- iDux ----
import Idux from '../../build/idux';

export function setupUIPlugins(app: App): void {
  // DevUI 主题初始化（无需 app.use）
  ThemeServiceInit({ infinityTheme }, 'infinityTheme');

  // iDux 全局配置
  app.use(Idux);
}
