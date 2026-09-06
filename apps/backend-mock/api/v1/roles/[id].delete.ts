import { useResponseError, useResponseSuccess } from '~/utils/response';
import { roles } from '~/utils/store';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const index = roles.findIndex((r) => r.id === id);

  if (index === -1) {
    setResponseStatus(event, 404);
    return useResponseError('角色不存在', 404);
  }

  roles.splice(index, 1);

  return useResponseSuccess(null, '删除成功');
});
