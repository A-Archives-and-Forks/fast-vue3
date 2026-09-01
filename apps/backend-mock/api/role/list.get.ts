import { useResponseSuccess } from '~/utils/response';

const roles = [
  {
    id: 1,
    name: '超级管理员',
    code: 'super_admin',
    description: '拥有系统所有权限',
    status: 'active',
    permissions: ['*'],
    createdAt: '2024-01-01 08:00:00',
  },
  {
    id: 2,
    name: '管理员',
    code: 'admin',
    description: '拥有大部分管理权限',
    status: 'active',
    permissions: [
      'user:view',
      'user:create',
      'user:edit',
      'role:view',
      'menu:view',
      'log:view',
      'setting:view',
      'setting:edit',
    ],
    createdAt: '2024-01-15 10:00:00',
  },
  {
    id: 3,
    name: '编辑者',
    code: 'editor',
    description: '可编辑内容与数据',
    status: 'active',
    permissions: ['user:view', 'menu:view', 'log:view'],
    createdAt: '2024-02-01 12:00:00',
  },
  {
    id: 4,
    name: '普通用户',
    code: 'user',
    description: '基础访问权限',
    status: 'active',
    permissions: ['user:view'],
    createdAt: '2024-03-01 09:00:00',
  },
  {
    id: 5,
    name: '访客',
    code: 'guest',
    description: '只读权限',
    status: 'active',
    permissions: [],
    createdAt: '2024-04-01 10:00:00',
  },
  {
    id: 6,
    name: '测试角色',
    code: 'tester',
    description: '测试环境专用',
    status: 'inactive',
    permissions: ['user:view', 'log:view'],
    createdAt: '2024-05-01 08:00:00',
  },
];

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const keyword = (query.keyword as string) || '';

  let filtered = [...roles];
  if (keyword) {
    filtered = filtered.filter(
      (r) => r.name.includes(keyword) || r.code.includes(keyword),
    );
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return useResponseSuccess({ items, total, page, pageSize });
});
