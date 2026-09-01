import { useResponseSuccess } from '~/utils/response';

const configs = [
  {
    id: 1,
    name: '主框架侧边栏主题',
    key: 'sys.index.sideTheme',
    value: 'theme-dark',
    type: 'built-in',
    remark: '侧边栏主题（dark / light）',
    createdAt: '2024-01-05 09:00:00',
  },
  {
    id: 2,
    name: '账号自助注册开关',
    key: 'sys.account.registerUser',
    value: 'false',
    type: 'built-in',
    remark: '是否开放用户自助注册',
    createdAt: '2024-01-05 09:00:00',
  },
  {
    id: 3,
    name: '用户初始密码',
    key: 'sys.user.initPassword',
    value: '123456',
    type: 'built-in',
    remark: '新用户默认密码',
    createdAt: '2024-01-06 10:00:00',
  },
  {
    id: 4,
    name: '验证码开关',
    key: 'sys.account.captchaEnabled',
    value: 'true',
    type: 'custom',
    remark: '登录验证码是否启用',
    createdAt: '2024-02-10 11:00:00',
  },
  {
    id: 5,
    name: '会话超时时间（分钟）',
    key: 'sys.session.timeout',
    value: '30',
    type: 'custom',
    remark: '无操作自动登出时长',
    createdAt: '2024-03-15 14:00:00',
  },
];

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const keyword = (query.keyword as string) || '';

  let filtered = [...configs];
  if (keyword) {
    filtered = filtered.filter(
      (c) => c.name.includes(keyword) || c.key.includes(keyword),
    );
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return useResponseSuccess({ items, total, page, pageSize });
});
