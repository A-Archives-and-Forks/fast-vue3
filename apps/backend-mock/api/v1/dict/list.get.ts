import { useResponseSuccess } from '~/utils/response';

const dicts = [
  {
    id: 1,
    name: '用户性别',
    type: 'sys_user_sex',
    status: 'active',
    remark: '用户性别列表',
    createdAt: '2024-01-05 09:00:00',
    data: [
      { label: '男', value: '0' },
      { label: '女', value: '1' },
      { label: '未知', value: '2' },
    ],
  },
  {
    id: 2,
    name: '菜单状态',
    type: 'sys_show_hide',
    status: 'active',
    remark: '菜单状态列表',
    createdAt: '2024-01-06 10:00:00',
    data: [
      { label: '显示', value: '0' },
      { label: '隐藏', value: '1' },
    ],
  },
  {
    id: 3,
    name: '系统开关',
    type: 'sys_normal_disable',
    status: 'active',
    remark: '系统开关列表',
    createdAt: '2024-01-07 11:00:00',
    data: [
      { label: '正常', value: '0' },
      { label: '停用', value: '1' },
    ],
  },
  {
    id: 4,
    name: '任务分组',
    type: 'sys_job_group',
    status: 'active',
    remark: '任务分组列表',
    createdAt: '2024-02-01 09:30:00',
    data: [
      { label: '默认', value: 'DEFAULT' },
      { label: '系统', value: 'SYSTEM' },
    ],
  },
  {
    id: 5,
    name: '通知类型',
    type: 'sys_notice_type',
    status: 'active',
    remark: '通知类型列表',
    createdAt: '2024-03-01 15:00:00',
    data: [
      { label: '通知', value: '1' },
      { label: '公告', value: '2' },
    ],
  },
  {
    id: 6,
    name: '缓存状态',
    type: 'sys_cache_status',
    status: 'inactive',
    remark: '缓存状态列表',
    createdAt: '2024-04-01 08:20:00',
    data: [
      { label: '命中', value: '1' },
      { label: '未命中', value: '0' },
    ],
  },
];

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const keyword = (query.keyword as string) || '';

  let filtered = [...dicts];
  if (keyword) {
    filtered = filtered.filter(
      (d) => d.name.includes(keyword) || d.type.includes(keyword),
    );
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return useResponseSuccess({ items, total, page, pageSize });
});
