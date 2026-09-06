import { useResponseError, useResponseSuccess } from '~/utils/response';
import { roles } from '~/utils/store';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const role = roles.find((r) => r.id === id);

  if (!role) {
    setResponseStatus(event, 404);
    return useResponseError('角色不存在', 404);
  }

  return useResponseSuccess(role);
});
