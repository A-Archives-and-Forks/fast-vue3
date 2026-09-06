import { categories } from '~/utils/content';
import { useResponseSuccess } from '~/utils/response';
import { nextId } from '~/utils/store';

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    description?: string;
    name: string;
    slug: string;
    status?: 'active' | 'inactive';
  }>(event);

  const category = {
    id: nextId(),
    name: body.name,
    slug: body.slug,
    description: body.description ?? '',
    status: body.status ?? 'active',
  };

  categories.unshift(category);

  return useResponseSuccess(category);
});
