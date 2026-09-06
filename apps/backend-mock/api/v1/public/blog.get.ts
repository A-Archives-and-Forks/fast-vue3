import { blogCategories, blogPosts } from '~/utils/blog';
import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const category = (query.category as string) || '';

  let filtered = [...blogPosts];
  if (category && category !== '全部') {
    filtered = filtered.filter((p) => p.category === category);
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return useResponseSuccess({ items, total, page, pageSize, categories: blogCategories });
});
