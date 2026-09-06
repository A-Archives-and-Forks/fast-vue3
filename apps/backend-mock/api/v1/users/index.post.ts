import { useResponseSuccess } from '~/utils/response';
import { nextId, users } from '~/utils/store';

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email?: string;
    nickname?: string;
    password: string;
    phone?: string;
    realName?: string;
    roleIds?: number[];
    status?: 'active' | 'disabled';
    username: string;
  }>(event);

  const id = nextId();
  const user = {
    id,
    username: body.username,
    realName: body.realName ?? body.username,
    nickname: body.nickname ?? body.realName ?? body.username,
    email: body.email ?? '',
    phone: body.phone ?? '',
    roles: body.roleIds?.map(String) ?? [],
    status: body.status ?? 'active',
    createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };

  users.unshift(user);

  return useResponseSuccess(user);
});
