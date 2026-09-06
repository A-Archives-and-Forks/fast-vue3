import { useResponseSuccess } from '~/utils/response';
import { blogComments } from '~/utils/site-interactions';

export default defineEventHandler((event) => {
  const articleId = Number(getRouterParam(event, 'id'));
  return useResponseSuccess(
    blogComments.filter((comment) => comment.articleId === articleId),
  );
});
