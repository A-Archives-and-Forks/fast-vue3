import { articles, categories } from '~/utils/content';
import { useResponseSuccess } from '~/utils/response';
import { nextId } from '~/utils/store';

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    author?: string;
    categoryId?: number;
    content?: string[];
    cover?: string;
    status?: 'draft' | 'published';
    summary?: string;
    tags?: string[];
    title: string;
  }>(event);

  const id = nextId();
  const categoryId = body.categoryId ?? 0;
  const category = categories.find((c) => c.id === categoryId)?.name ?? '';

  const article = {
    id,
    title: body.title,
    author: body.author ?? '管理员',
    category,
    categoryId,
    tags: body.tags ?? [],
    cover: body.cover ?? '',
    summary: body.summary ?? '',
    content: body.content ?? [],
    status: body.status ?? 'draft',
    date: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };

  articles.unshift(article);

  return useResponseSuccess(article);
});
