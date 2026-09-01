import { useResponseSuccess } from '~/utils/response';

const notices = [
  {
    id: 1,
    title: '系统 v2.1.0 版本发布',
    type: '公告',
    status: 'active',
    author: '管理员',
    createdAt: '2026-08-20 09:00:00',
    content:
      '本次版本新增部门管理、字典管理等系统模块，并统一了门户站点的设计系统。',
  },
  {
    id: 2,
    title: '8 月 30 日晚停机维护通知',
    type: '通知',
    status: 'active',
    author: '运维组',
    createdAt: '2026-08-28 14:00:00',
    content: '计划于 8 月 30 日 23:00 - 24:00 进行数据库升级，期间服务不可用。',
  },
  {
    id: 3,
    title: '新员工入职培训安排',
    type: '通知',
    status: 'active',
    author: '人事部',
    createdAt: '2026-08-25 10:30:00',
    content: '新同事请于下周一上午 9:30 参加入职培训，地点：3 号会议室。',
  },
  {
    id: 4,
    title: '中秋节放假安排',
    type: '公告',
    status: 'inactive',
    author: '行政部',
    createdAt: '2026-08-22 16:00:00',
    content: '中秋节放假 3 天，请各部门提前做好值班安排。',
  },
  {
    id: 5,
    title: '代码规范更新说明',
    type: '通知',
    status: 'active',
    author: '技术委员会',
    createdAt: '2026-08-18 11:00:00',
    content: '仓库已切换至 OxLint + OxFmt 工具链，请更新本地依赖后提交代码。',
  },
];

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const keyword = (query.keyword as string) || '';
  const type = (query.type as string) || '';

  let filtered = [...notices];
  if (keyword) {
    filtered = filtered.filter((n) => n.title.includes(keyword));
  }
  if (type) {
    filtered = filtered.filter((n) => n.type === type);
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return useResponseSuccess({ items, total, page, pageSize });
});
