import { useResponseSuccess } from '~/utils/response';

function randomIp() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

const browsers = ['Chrome 120', 'Firefox 121', 'Safari 17', 'Edge 120'];
const oses = ['Windows 11', 'macOS 14', 'Ubuntu 22.04', 'iOS 17'];
const usernames = ['admin', 'zhangsan', 'lisi', 'wangwu', 'zhaoliu', 'sunqi'];

const loginLogs = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  username: usernames[Math.floor(Math.random() * usernames.length)],
  ip: randomIp(),
  browser: browsers[Math.floor(Math.random() * browsers.length)],
  os: oses[Math.floor(Math.random() * oses.length)],
  status: Math.random() > 0.15 ? 'success' : 'fail',
  message: Math.random() > 0.15 ? '登录成功' : '密码错误',
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 86_400_000))
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19),
}));

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const keyword = (query.keyword as string) || '';

  let filtered = [...loginLogs];
  if (keyword) {
    filtered = filtered.filter((l) => l.username.includes(keyword));
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return useResponseSuccess({ items, total, page, pageSize });
});
