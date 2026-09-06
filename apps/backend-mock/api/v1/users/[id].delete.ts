import { useResponseError, useResponseSuccess } from '~/utils/response';
import { users } from '~/utils/store';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    setResponseStatus(event, 404);
    return useResponseError('用户不存在', 404);
  }

  users.splice(index, 1);

  return useResponseSuccess(null, '删除成功');
});
