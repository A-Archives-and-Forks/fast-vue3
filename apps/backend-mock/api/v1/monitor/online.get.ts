import { useResponseSuccess } from '~/utils/response';

const onlineUsers = [
  {
    id: 1,
    username: 'admin',
    realName: '管理员',
    department: '技术部',
    ip: '192.168.1.10',
    browser: 'Chrome 128',
    os: 'macOS 15',
    loginAt: '2026-08-30 08:55:12',
  },
  {
    id: 2,
    username: 'zhangsan',
    realName: '张三',
    department: '产品部',
    ip: '192.168.1.23',
    browser: 'Edge 127',
    os: 'Windows 11',
    loginAt: '2026-08-30 09:02:40',
  },
  {
    id: 3,
    username: 'lisi',
    realName: '李四',
    department: '运营部',
    ip: '192.168.1.31',
    browser: 'Chrome 128',
    os: 'Windows 11',
    loginAt: '2026-08-30 09:10:05',
  },
  {
    id: 4,
    username: 'wangwu',
    realName: '王五',
    department: '技术部',
    ip: '192.168.1.42',
    browser: 'Firefox 129',
    os: 'Ubuntu 24.04',
    loginAt: '2026-08-30 09:21:33',
  },
  {
    id: 5,
    username: 'zhaoliu',
    realName: '赵六',
    department: '设计部',
    ip: '192.168.1.55',
    browser: 'Safari 18',
    os: 'macOS 15',
    loginAt: '2026-08-30 09:36:58',
  },
];

export default defineEventHandler(() => {
  return useResponseSuccess({ items: onlineUsers, total: onlineUsers.length });
});
