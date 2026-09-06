import { permissions } from '~/utils/permissions';
import { useResponseError, useResponseSuccess } from '~/utils/response';
import { roles } from '~/utils/store';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));
  const role = roles.find((r) => r.id === id);

  if (!role) {
    setResponseStatus(event, 404);
    return useResponseError('角色不存在', 404);
  }

  const body = await readBody<{
    description?: string;
    menuIds?: number[];
    name?: string;
    permissionIds?: number[];
  }>(event);

  if (body.name !== undefined) role.name = body.name;
  if (body.description !== undefined) role.description = body.description;
  if (body.menuIds !== undefined) role.menuIds = body.menuIds;
  if (body.permissionIds !== undefined) {
    role.permissions = body.permissionIds.flatMap((permissionId) => {
      const permission = permissions.find(({ id }) => id === permissionId);
      return permission ? [permission.code] : [];
    });
  }
  role.updatedAt = new Date().toISOString().replace('T', ' ').slice(0, 19);

  return useResponseSuccess(role);
});
