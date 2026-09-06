import { categories } from '~/utils/content';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const index = categories.findIndex((c) => c.id === id);

  if (index === -1) {
    setResponseStatus(event, 404);
    return useResponseError('分类不存在', 404);
  }

  categories.splice(index, 1);

  return useResponseSuccess(null, '删除成功');
});
