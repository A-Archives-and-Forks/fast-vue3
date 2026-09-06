import { articles, categories } from '~/utils/content';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));
  const article = articles.find((a) => a.id === id);

  if (!article) {
    setResponseStatus(event, 404);
    return useResponseError('文章不存在', 404);
  }

  const body = await readBody<{
    author?: string;
    categoryId?: number;
    content?: string[];
    cover?: string;
    status?: 'draft' | 'published';
    summary?: string;
    tags?: string[];
    title?: string;
  }>(event);

  if (body.title !== undefined) article.title = body.title;
  if (body.author !== undefined) article.author = body.author;
  if (body.summary !== undefined) article.summary = body.summary;
  if (body.content !== undefined) article.content = body.content;
  if (body.tags !== undefined) article.tags = body.tags;
  if (body.cover !== undefined) article.cover = body.cover;
  if (body.status !== undefined) article.status = body.status;
  if (body.categoryId !== undefined) {
    article.categoryId = body.categoryId;
    article.category =
      categories.find((c) => c.id === body.categoryId)?.name ?? '';
  }

  return useResponseSuccess(article);
});
