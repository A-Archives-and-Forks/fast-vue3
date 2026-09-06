import { categories } from '~/utils/content';
import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(() => {
  return useResponseSuccess(categories);
});
