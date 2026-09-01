import { useResponseSuccess } from '~/utils/response';

const users = [
  {
    id: 1,
    username: 'admin',
    realName: '管理员',
    email: 'admin@fast-vue3.com',
    phone: '13800000001',
    roles: ['admin'],
    status: 'active',
    department: '技术部',
    createdAt: '2024-01-01 08:00:00',
  },
  {
    id: 2,
    username: 'zhangsan',
    realName: '张三',
    email: 'zhangsan@fast-vue3.com',
    phone: '13800000002',
    roles: ['editor'],
    status: 'active',
    department: '产品部',
    createdAt: '2024-02-15 10:30:00',
  },
  {
    id: 3,
    username: 'lisi',
    realName: '李四',
    email: 'lisi@fast-vue3.com',
    phone: '13800000003',
    roles: ['user'],
    status: 'active',
    department: '运营部',
    createdAt: '2024-03-20 14:00:00',
  },
  {
    id: 4,
    username: 'wangwu',
    realName: '王五',
    email: 'wangwu@fast-vue3.com',
    phone: '13800000004',
    roles: ['editor'],
    status: 'inactive',
    department: '技术部',
    createdAt: '2024-04-10 09:15:00',
  },
  {
    id: 5,
    username: 'zhaoliu',
    realName: '赵六',
    email: 'zhaoliu@fast-vue3.com',
    phone: '13800000005',
    roles: ['user'],
    status: 'active',
    department: '设计部',
    createdAt: '2024-05-05 11:45:00',
  },
  {
    id: 6,
    username: 'sunqi',
    realName: '孙七',
    email: 'sunqi@fast-vue3.com',
    phone: '13800000006',
    roles: ['user'],
    status: 'active',
    department: '市场部',
    createdAt: '2024-06-01 16:30:00',
  },
  {
    id: 7,
    username: 'zhouba',
    realName: '周八',
    email: 'zhouba@fast-vue3.com',
    phone: '13800000007',
    roles: ['editor'],
    status: 'inactive',
    department: '技术部',
    createdAt: '2024-07-12 08:20:00',
  },
  {
    id: 8,
    username: 'wujiu',
    realName: '吴九',
    email: 'wujiu@fast-vue3.com',
    phone: '13800000008',
    roles: ['user'],
    status: 'active',
    department: '产品部',
    createdAt: '2024-08-22 13:10:00',
  },
  {
    id: 9,
    username: 'zhengshi',
    realName: '郑十',
    email: 'zhengshi@fast-vue3.com',
    phone: '13800000009',
    roles: ['user'],
    status: 'active',
    department: '运营部',
    createdAt: '2024-09-15 15:00:00',
  },
  {
    id: 10,
    username: 'qianyi',
    realName: '钱一',
    email: 'qianyi@fast-vue3.com',
    phone: '13800000010',
    roles: ['admin'],
    status: 'active',
    department: '技术部',
    createdAt: '2024-10-01 10:00:00',
  },
  {
    id: 11,
    username: 'fenger',
    realName: '冯二',
    email: 'fenger@fast-vue3.com',
    phone: '13800000011',
    roles: ['user'],
    status: 'active',
    department: '设计部',
    createdAt: '2024-11-08 09:30:00',
  },
  {
    id: 12,
    username: 'chensan',
    realName: '陈三',
    email: 'chensan@fast-vue3.com',
    phone: '13800000012',
    roles: ['editor'],
    status: 'active',
    department: '市场部',
    createdAt: '2024-12-01 14:20:00',
  },
];

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const keyword = (query.keyword as string) || '';
  const status = (query.status as string) || '';
  const role = (query.role as string) || '';

  let filtered = [...users];

  if (keyword) {
    filtered = filtered.filter(
      (u) =>
        u.username.includes(keyword) ||
        u.realName.includes(keyword) ||
        u.email.includes(keyword),
    );
  }
  if (status) {
    filtered = filtered.filter((u) => u.status === status);
  }
  if (role) {
    filtered = filtered.filter((u) => u.roles.includes(role));
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return useResponseSuccess({ items, total, page, pageSize });
});
