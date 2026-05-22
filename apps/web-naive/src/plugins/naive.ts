import type { App } from 'vue';

export function setupNaive(_app: App) {
  // Naive UI 通过 unplugin-vue-components + NaiveUiResolver 自动按需引入
  // 全局消息/通知通过 Layout 中的 n-message-provider / n-notification-provider 提供
}
