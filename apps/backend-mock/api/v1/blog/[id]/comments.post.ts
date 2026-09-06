import { useResponseError, useResponseSuccess } from '~/utils/response';
import {
  blogComments,
  createCommentId,
  getMockUsername,
} from '~/utils/site-interactions';

export default defineEventHandler(async (event) => {
  const articleId = Number(getRouterParam(event, 'id'));
  const body = await readBody<{ content?: string }>(event);
  const content = body.content?.trim();
  if (!content || content.length > 1000) {
    setResponseStatus(event, 400);
    return useResponseError('评论内容长度须为 1-1000 个字符', 400);
  }

  const comment = {
    articleId,
    content,
    createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    id: createCommentId(),
    username: getMockUsername(getHeader(event, 'authorization')),
  };
  blogComments.unshift(comment);
  return useResponseSuccess(comment);
});
