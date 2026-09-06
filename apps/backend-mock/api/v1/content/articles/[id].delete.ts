import { articles } from '~/utils/content';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const index = articles.findIndex((a) => a.id === id);

  if (index === -1) {
    setResponseStatus(event, 404);
    return useResponseError('文章不存在', 404);
  }

  articles.splice(index, 1);

  return useResponseSuccess(null, '删除成功');
});
