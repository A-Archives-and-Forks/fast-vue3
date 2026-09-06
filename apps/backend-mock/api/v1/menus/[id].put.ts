import { menus } from '~/api/v1/menus.get';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));
  const menu = menus.find((item) => item.id === id);
  if (!menu) {
    setResponseStatus(event, 404);
    return useResponseError('菜单不存在', 404);
  }
  const body = await readBody<Partial<typeof menu>>(event);
  Object.assign(menu, body, { id });
  return useResponseSuccess(menu);
});
