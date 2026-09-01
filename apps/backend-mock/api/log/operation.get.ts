import { useResponseSuccess } from '~/utils/response';

const modules = ['用户管理', '角色管理', '菜单管理', '系统设置', '日志管理'];
const actions = ['新增', '编辑', '删除', '查询', '导出', '导入'];
const usernames = ['admin', 'zhangsan', 'lisi', 'wangwu'];

function getMethod(action: string) {
  if (action === '查询') return 'GET';
  if (action === '删除') return 'DELETE';
  return 'POST';
}

const operationLogs = Array.from({ length: 80 }, (_, i) => {
  const module = modules[Math.floor(Math.random() * modules.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  return {
    id: i + 1,
    username: usernames[Math.floor(Math.random() * usernames.length)],
    module,
    action,
    description: `${action}了${module}的数据`,
    ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
    method: getMethod(action),
    status: Math.random() > 0.05 ? 'success' : 'fail',
    duration: Math.floor(Math.random() * 500) + 10,
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 15 * 86_400_000),
    )
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19),
  };
});

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const keyword = (query.keyword as string) || '';
  const module = (query.module as string) || '';

  let filtered = [...operationLogs];
  if (keyword) {
    filtered = filtered.filter(
      (l) => l.username.includes(keyword) || l.description.includes(keyword),
    );
  }
  if (module) {
    filtered = filtered.filter((l) => l.module === module);
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return useResponseSuccess({ items, total, page, pageSize });
});
