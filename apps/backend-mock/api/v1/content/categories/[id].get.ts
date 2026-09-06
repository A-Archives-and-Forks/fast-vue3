import { categories } from '~/utils/content';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const category = categories.find((c) => c.id === id);

  if (!category) {
    setResponseStatus(event, 404);
    return useResponseError('分类不存在', 404);
  }

  return useResponseSuccess(category);
});
