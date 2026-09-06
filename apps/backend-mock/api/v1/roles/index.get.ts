import { useResponseSuccess } from '~/utils/response';
import { roles } from '~/utils/store';

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
