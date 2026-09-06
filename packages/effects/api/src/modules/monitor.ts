import type { RequestClient } from '@fast-vue3/request';

import type { OnlineUserItem, ServerInfo } from '../types';

export function createMonitorApi(http: RequestClient) {
  return {
    /** 在线用户 */
    online: () =>
      http.get<{ items: OnlineUserItem[]; total: number }>({
        url: '/monitor/online',
      }),

    /** 服务运行信息（CPU / 内存 / 磁盘 / 运行时） */
    server: () => http.get<ServerInfo>({ url: '/monitor/server' }),
  };
}
