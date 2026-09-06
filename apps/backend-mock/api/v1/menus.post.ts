import { menus } from '~/api/v1/menus.get';
import { useResponseSuccess } from '~/utils/response';
import { nextId } from '~/utils/store';

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    component?: string;
    icon?: string;
    name: string;
    parentId?: number;
    path?: string;
    permission?: string;
    sort?: number;
    type?: 'button' | 'directory' | 'menu';
    visible?: boolean;
  }>(event);
  const menu = {
    id: nextId(),
    parentId: body.parentId ?? 0,
    name: body.name,
    path: body.path ?? '',
    component: body.component ?? '',
    icon: body.icon ?? '',
    sort: body.sort ?? 0,
    visible: body.visible ?? true,
    type: body.type ?? 'menu',
    permission: body.permission ?? '',
  };
  menus.push(menu);
  return useResponseSuccess(menu);
});
