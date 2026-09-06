import type { RequestClient } from '@fast-vue3/request';

import type {
  ConfigItem,
  DeptItem,
  DictItem,
  NoticeItem,
  NoticeQuery,
  PageQuery,
  PageResult,
} from '../types';

export function createSystemApi(http: RequestClient) {
  return {
    /** 参数配置 */
    configList: (params: PageQuery = {}) =>
      http.get<PageResult<ConfigItem>>({ params, url: '/config/list' }),

    /** 部门树 */
    deptList: () => http.get<DeptItem[]>({ url: '/dept/list' }),

    /** 数据字典 */
    dictList: (params: PageQuery = {}) =>
      http.get<PageResult<DictItem>>({ params, url: '/dict/list' }),

    /** 通知公告 */
    noticeList: (params: NoticeQuery = {}) =>
      http.get<PageResult<NoticeItem>>({ params, url: '/notice/list' }),
  };
}
