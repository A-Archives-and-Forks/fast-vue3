import { articles } from '~/utils/content';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const article = articles.find((a) => a.id === id);

  if (!article) {
    setResponseStatus(event, 404);
    return useResponseError('文章不存在', 404);
  }

  return useResponseSuccess(article);
});
