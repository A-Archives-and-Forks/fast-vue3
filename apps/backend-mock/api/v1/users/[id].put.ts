import { useResponseError, useResponseSuccess } from '~/utils/response';
import { users } from '~/utils/store';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));
  const user = users.find((u) => u.id === id);

  if (!user) {
    setResponseStatus(event, 404);
    return useResponseError('用户不存在', 404);
  }

  const body = await readBody<{
    email?: string;
    nickname?: string;
    password?: string;
    phone?: string;
    realName?: string;
    roleIds?: number[];
    status?: 'active' | 'disabled';
  }>(event);

  if (body.realName !== undefined) user.realName = body.realName;
  if (body.nickname !== undefined) user.nickname = body.nickname;
  if (body.email !== undefined) user.email = body.email;
  if (body.phone !== undefined) user.phone = body.phone;
  if (body.status !== undefined) user.status = body.status;
  if (body.roleIds !== undefined) user.roles = body.roleIds.map(String);

  return useResponseSuccess(user);
});
