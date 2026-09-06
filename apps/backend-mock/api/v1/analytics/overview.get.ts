import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const days = Number(query.days) || 7;

  const dates: string[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86_400_000);
    dates.push(d.toISOString().slice(0, 10));
  }

  const trend = dates.map((date) => {
    const seed = Number(date.slice(-2)) || 1;
    return {
      date,
      visits: 800 + seed * 40,
      users: 200 + seed * 12,
      orders: 30 + seed * 3,
      revenue: 5000 + seed * 200,
    };
  });

  return useResponseSuccess({
    stats: [
      { title: '总访问量', value: 86_420, suffix: '', color: '#1677ff' },
      { title: '独立用户', value: 23_150, suffix: '', color: '#52c41a' },
      { title: '订单数', value: 4820, suffix: '', color: '#faad14' },
      { title: '营收（元）', value: 1_286_400, suffix: '', color: '#eb2f96' },
    ],
    topPages: [
      { page: '/dashboard', title: '仪表盘', visits: 4520, avgTime: '2m 18s' },
      { page: '/user', title: '用户管理', visits: 3180, avgTime: '3m 05s' },
      {
        page: '/analytics',
        title: '数据分析',
        visits: 2860,
        avgTime: '4m 42s',
      },
      { page: '/settings', title: '系统设置', visits: 1420, avgTime: '1m 30s' },
      { page: '/role', title: '角色管理', visits: 980, avgTime: '2m 50s' },
    ],
    trend,
  });
});
