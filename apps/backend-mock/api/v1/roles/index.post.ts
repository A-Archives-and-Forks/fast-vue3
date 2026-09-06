import { useResponseSuccess } from '~/utils/response';
import { nextId, roles } from '~/utils/store';

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    code: string;
    description?: string;
    menuIds?: number[];
    name: string;
    permissionIds?: number[];
  }>(event);

  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const role = {
    id: nextId(),
    name: body.name,
    code: body.code,
    description: body.description ?? '',
    permissions: body.permissionIds?.map(String) ?? [],
    menuIds: body.menuIds ?? [],
    createdAt: now,
    updatedAt: now,
  };

  roles.unshift(role);

  return useResponseSuccess(role);
});
