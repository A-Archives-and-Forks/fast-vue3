import { categories } from '~/utils/content';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));
  const category = categories.find((c) => c.id === id);

  if (!category) {
    setResponseStatus(event, 404);
    return useResponseError('分类不存在', 404);
  }

  const body = await readBody<{
    description?: string;
    name?: string;
    slug?: string;
    status?: 'active' | 'inactive';
  }>(event);

  if (body.name !== undefined) category.name = body.name;
  if (body.slug !== undefined) category.slug = body.slug;
  if (body.description !== undefined) category.description = body.description;
  if (body.status !== undefined) category.status = body.status;

  return useResponseSuccess(category);
});
