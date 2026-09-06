import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(() => {
  return useResponseSuccess({
    recent: [
      { type: '收入', amount: '+¥12,800', date: '2026-08-30', status: '成功' },
      { type: '支出', amount: '-¥3,200', date: '2026-08-29', status: '成功' },
      { type: '收入', amount: '+¥9,600', date: '2026-08-28', status: '成功' },
      { type: '退款', amount: '-¥1,150', date: '2026-08-27', status: '处理中' },
      { type: '收入', amount: '+¥21,400', date: '2026-08-26', status: '成功' },
    ],
    stats: [
      {
        title: '本月营收',
        value: 284_600,
        suffix: '元',
        border: '#1677ff',
        prefix: '¥',
      },
      { title: '订单总数', value: 1560, suffix: '笔', border: '#52c41a' },
      { title: '活跃用户', value: 8934, suffix: '人', border: '#faad14' },
      { title: '转化率', value: 3.8, suffix: '%', border: '#eb2f96' },
    ],
  });
});
