import type { App } from 'vue';

import { message, notification } from 'ant-design-vue';

export function setupAntd(app: App): void {
  // 全局消息最大显示数量
  message.config({ maxCount: 3 });
  // 全局通知默认位置
  notification.config({ placement: 'topRight' });

  // 可在此注册全局 antd 组件（按需，通常由 unplugin-vue-components 自动处理）
  void app;
}
