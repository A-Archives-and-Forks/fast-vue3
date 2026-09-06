import type { RequestClient } from '@fast-vue3/request';

import type { AnalyticsOverview, DashboardStats, DataOverview } from '../types';

export function createAnalyticsApi(http: RequestClient) {
  return {
    /** 仪表盘聚合统计 */
    dashboardStats: () => http.get<DashboardStats>({ url: '/dashboard/stats' }),

    /** 经营数据（营收流水） */
    dataOverview: () => http.get<DataOverview>({ url: '/data/overview' }),

    /** 数据分析趋势，days 为最近天数 */
    overview: (days = 7) =>
      http.get<AnalyticsOverview>({
        params: { days },
        url: '/analytics/overview',
      }),
  };
}
