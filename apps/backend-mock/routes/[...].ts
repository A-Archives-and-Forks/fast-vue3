import { useResponseError } from '~/utils/response';

export default defineEventHandler((event) => {
  const path = event.path || '/';

  // 所有 /api 开头的未匹配路径，返回 JSON 404，避免前端 JSON 解析报错
  if (path.startsWith('/api')) {
    event.node.res.statusCode = 404;
    return useResponseError(`接口不存在: ${path}`, 404);
  }

  // 其余路径（如 /）返回简短 HTML 索引页，方便调试
  setResponseStatus(event, 200);
  return `
<h1>Fast Vue3 Mock Server</h1>
<h2>Mock service is running</h2>
<p>已迁移到 <code>/api/v1</code> 前缀，可用接口分组：</p>
<ul>
  <li><a href="/api/v1/dashboard/stats">/api/v1/dashboard/stats</a></li>
  <li><a href="/api/v1/analytics/overview">/api/v1/analytics/overview</a></li>
  <li><a href="/api/v1/data/overview">/api/v1/data/overview</a></li>
  <li><a href="/api/v1/users">/api/v1/users</a></li>
  <li><a href="/api/v1/roles">/api/v1/roles</a></li>
  <li><a href="/api/v1/menus">/api/v1/menus</a></li>
  <li><a href="/api/v1/permissions">/api/v1/permissions</a></li>
  <li><a href="/api/v1/content/articles">/api/v1/content/articles</a></li>
  <li><a href="/api/v1/notice/list">/api/v1/notice/list</a></li>
  <li><a href="/api/v1/log/login">/api/v1/log/login</a></li>
  <li><a href="/api/v1/monitor/online">/api/v1/monitor/online</a></li>
  <li><a href="/api/v1/public/home">/api/v1/public/home</a></li>
  <li><a href="/api/v1/public/blog">/api/v1/public/blog</a></li>
  <li><a href="/api/v1/auth/login">/api/v1/auth/login (POST)</a></li>
</ul>
`;
});
