import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(() => {
  return useResponseSuccess({
    todayVisits: 3256,
    totalUsers: 12_480,
    activeUsers: 8934,
    todayOrders: 156,
    weeklyGrowth: 12.5,
    monthlyRevenue: 284_600,
    conversionRate: 3.8,
    systemUptime: 99.9,
    recentActivities: [
      { id: 1, user: '张三', action: '创建了新用户', time: '2 分钟前' },
      { id: 2, user: '李四', action: '修改了角色权限', time: '15 分钟前' },
      { id: 3, user: '管理员', action: '更新了系统配置', time: '1 小时前' },
      { id: 4, user: '王五', action: '导出了数据报表', time: '2 小时前' },
      { id: 5, user: '赵六', action: '删除了过期日志', time: '3 小时前' },
    ],
    roleDistribution: [
      { name: '管理员', value: 3 },
      { name: '编辑者', value: 21 },
      { name: '普通用户', value: 860 },
      { name: '访客', value: 45 },
    ],
    weeklyTrend: {
      days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      visits: [1200, 1380, 1520, 1290, 1680, 890, 720],
      users: [320, 380, 420, 350, 460, 210, 180],
    },
    topPages: [
      { path: '/dashboard', title: '仪表盘', visits: 4520 },
      { path: '/user', title: '用户管理', visits: 3180 },
      { path: '/analytics', title: '数据分析', visits: 2860 },
      { path: '/settings', title: '系统设置', visits: 1420 },
      { path: '/role', title: '角色管理', visits: 980 },
    ],
  });
});
