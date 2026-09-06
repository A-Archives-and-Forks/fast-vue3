import { menus } from '~/api/v1/menus.get';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const index = menus.findIndex((item) => item.id === id);
  if (index === -1) {
    setResponseStatus(event, 404);
    return useResponseError('菜单不存在', 404);
  }
  menus.splice(index, 1);
  for (let childIndex = menus.length - 1; childIndex >= 0; childIndex -= 1) {
    if (menus[childIndex]?.parentId === id) menus.splice(childIndex, 1);
  }
  return useResponseSuccess(null);
});
