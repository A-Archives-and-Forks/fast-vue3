import { useResponseSuccess } from '~/utils/response';
import { users } from '~/utils/store';

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
