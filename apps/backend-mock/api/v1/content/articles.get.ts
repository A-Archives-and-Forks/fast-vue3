import { articles } from '~/utils/content';
import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const keyword = (query.keyword as string) || '';
  const status = (query.status as string) || '';
  const categoryId = query.categoryId ? Number(query.categoryId) : 0;

  let filtered = [...articles];

  if (keyword) {
    filtered = filtered.filter(
      (a) => a.title.includes(keyword) || a.summary.includes(keyword),
    );
  }
  if (status) {
    filtered = filtered.filter((a) => a.status === status);
  }
  if (categoryId) {
    filtered = filtered.filter((a) => a.categoryId === categoryId);
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return useResponseSuccess({ items, total, page, pageSize });
});
