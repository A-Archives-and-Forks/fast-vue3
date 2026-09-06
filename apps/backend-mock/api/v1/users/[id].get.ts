import { useResponseError, useResponseSuccess } from '~/utils/response';
import { users } from '~/utils/store';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const user = users.find((u) => u.id === id);

  if (!user) {
    setResponseStatus(event, 404);
    return useResponseError('用户不存在', 404);
  }

  return useResponseSuccess(user);
});
