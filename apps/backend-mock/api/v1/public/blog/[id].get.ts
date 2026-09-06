import { blogPosts } from '~/utils/blog';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    setResponseStatus(event, 404);
    return useResponseError('文章不存在', 404);
  }

  return useResponseSuccess(post);
});
