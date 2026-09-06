// 管理后台共享数据（用户 / 角色），供 REST 路由读写同一份内存状态。

export interface UserRecord {
  id: number;
  username: string;
  realName: string;
  nickname: string;
  email: string;
  phone: string;
  roles: string[];
  status: 'active' | 'disabled';
  createdAt: string;
}

export const users: UserRecord[] = [
  {
    id: 1,
    username: 'admin',
    realName: '管理员',
    nickname: '管理员',
    email: 'admin@fast-vue3.com',
    phone: '13800000001',
    roles: ['admin'],
    status: 'active',
    createdAt: '2024-01-01 08:00:00',
  },
  {
    id: 2,
    username: 'zhangsan',
    realName: '张三',
    nickname: '张三',
    email: 'zhangsan@fast-vue3.com',
    phone: '13800000002',
    roles: ['editor'],
    status: 'active',
    createdAt: '2024-02-15 10:30:00',
  },
  {
    id: 3,
    username: 'lisi',
    realName: '李四',
    nickname: '李四',
    email: 'lisi@fast-vue3.com',
    phone: '13800000003',
    roles: ['user'],
    status: 'active',
    createdAt: '2024-03-20 14:00:00',
  },
  {
    id: 4,
    username: 'wangwu',
    realName: '王五',
    nickname: '王五',
    email: 'wangwu@fast-vue3.com',
    phone: '13800000004',
    roles: ['editor'],
    status: 'disabled',
    createdAt: '2024-04-10 09:15:00',
  },
  {
    id: 5,
    username: 'zhaoliu',
    realName: '赵六',
    nickname: '赵六',
    email: 'zhaoliu@fast-vue3.com',
    phone: '13800000005',
    roles: ['user'],
    status: 'active',
    createdAt: '2024-05-05 11:45:00',
  },
  {
    id: 6,
    username: 'sunqi',
    realName: '孙七',
    nickname: '孙七',
    email: 'sunqi@fast-vue3.com',
    phone: '13800000006',
    roles: ['user'],
    status: 'active',
    createdAt: '2024-06-01 16:30:00',
  },
  {
    id: 7,
    username: 'zhouba',
    realName: '周八',
    nickname: '周八',
    email: 'zhouba@fast-vue3.com',
    phone: '13800000007',
    roles: ['editor'],
    status: 'disabled',
    createdAt: '2024-07-12 08:20:00',
  },
  {
    id: 8,
    username: 'wujiu',
    realName: '吴九',
    nickname: '吴九',
    email: 'wujiu@fast-vue3.com',
    phone: '13800000008',
    roles: ['user'],
    status: 'active',
    createdAt: '2024-08-22 13:10:00',
  },
  {
    id: 9,
    username: 'zhengshi',
    realName: '郑十',
    nickname: '郑十',
    email: 'zhengshi@fast-vue3.com',
    phone: '13800000009',
    roles: ['user'],
    status: 'active',
    createdAt: '2024-09-15 15:00:00',
  },
  {
    id: 10,
    username: 'qianyi',
    realName: '钱一',
    nickname: '钱一',
    email: 'qianyi@fast-vue3.com',
    phone: '13800000010',
    roles: ['admin'],
    status: 'active',
    createdAt: '2024-10-01 10:00:00',
  },
  {
    id: 11,
    username: 'fenger',
    realName: '冯二',
    nickname: '冯二',
    email: 'fenger@fast-vue3.com',
    phone: '13800000011',
    roles: ['user'],
    status: 'active',
    createdAt: '2024-11-08 09:30:00',
  },
  {
    id: 12,
    username: 'chensan',
    realName: '陈三',
    nickname: '陈三',
    email: 'chensan@fast-vue3.com',
    phone: '13800000012',
    roles: ['editor'],
    status: 'active',
    createdAt: '2024-12-01 14:20:00',
  },
];

export interface RoleRecord {
  id: number;
  name: string;
  code: string;
  description: string;
  permissions: string[];
  menuIds: number[];
  createdAt: string;
  updatedAt: string;
}

export const roles: RoleRecord[] = [
  {
    id: 1,
    name: '超级管理员',
    code: 'super_admin',
    description: '拥有系统所有权限',
    permissions: ['*'],
    menuIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    createdAt: '2024-01-01 08:00:00',
    updatedAt: '2024-01-01 08:00:00',
  },
  {
    id: 2,
    name: '管理员',
    code: 'admin',
    description: '拥有大部分管理权限',
    permissions: [
      'user:list',
      'user:create',
      'user:update',
      'role:list',
      'menu:list',
    ],
    menuIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12],
    createdAt: '2024-01-15 10:00:00',
    updatedAt: '2024-06-01 10:00:00',
  },
  {
    id: 3,
    name: '编辑者',
    code: 'editor',
    description: '可编辑内容与数据',
    permissions: ['user:list', 'menu:list', 'content:list', 'content:update'],
    menuIds: [1, 2, 12],
    createdAt: '2024-02-01 12:00:00',
    updatedAt: '2024-06-01 12:00:00',
  },
  {
    id: 4,
    name: '普通用户',
    code: 'user',
    description: '基础访问权限',
    permissions: ['user:list'],
    menuIds: [1, 2],
    createdAt: '2024-03-01 09:00:00',
    updatedAt: '2024-06-01 09:00:00',
  },
  {
    id: 5,
    name: '访客',
    code: 'guest',
    description: '只读权限',
    permissions: [],
    menuIds: [1],
    createdAt: '2024-04-01 10:00:00',
    updatedAt: '2024-06-01 10:00:00',
  },
  {
    id: 6,
    name: '测试角色',
    code: 'tester',
    description: '测试环境专用',
    permissions: ['user:view', 'log:view'],
    menuIds: [1, 2, 8, 9],
    createdAt: '2024-05-01 08:00:00',
    updatedAt: '2024-06-01 08:00:00',
  },
];

let idSeq = 10_000;
export function nextId() {
  return ++idSeq;
}
