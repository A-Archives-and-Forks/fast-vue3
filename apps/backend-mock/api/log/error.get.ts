import { useResponseSuccess } from '~/utils/response';

const errorTypes = [
  'TypeError',
  'ReferenceError',
  'NetworkError',
  'TimeoutError',
  'SyntaxError',
];
const pages = [
  '/dashboard',
  '/user',
  '/role',
  '/settings',
  '/analytics',
  '/log/operation',
];
const messages = [
  'Cannot read properties of undefined',
  'Network request failed',
  'Request timeout after 30000ms',
  'Unexpected token in JSON',
  'Permission denied',
  'Failed to fetch resource',
  'Maximum call stack size exceeded',
];

const errorLogs = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  type: errorTypes[Math.floor(Math.random() * errorTypes.length)],
  message: messages[Math.floor(Math.random() * messages.length)],
  page: pages[Math.floor(Math.random() * pages.length)],
  stack: `Error: ${messages[Math.floor(Math.random() * messages.length)]}\n    at Component.setup (src/views/xxx/index.vue:42)\n    at callWithErrorHandling (runtime-core.esm.js:155)`,
  browser: 'Chrome 120',
  os: 'Windows 11',
  status: Math.random() > 0.4 ? 'resolved' : 'pending',
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 86_400_000))
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19),
}));

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const status = (query.status as string) || '';

  let filtered = [...errorLogs];
  if (status) {
    filtered = filtered.filter((l) => l.status === status);
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return useResponseSuccess({ items, total, page, pageSize });
});
