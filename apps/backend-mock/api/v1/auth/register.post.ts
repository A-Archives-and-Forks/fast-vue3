import { useResponseError, useResponseSuccess } from '~/utils/response';
import { nextId, users } from '~/utils/store';

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email?: string;
    password?: string;
    username?: string;
  }>(event);

  const username = body.username?.trim();
  const email = body.email?.trim();
  if (!username || !email || !body.password || body.password.length < 6) {
    setResponseStatus(event, 400);
    return useResponseError('用户名、邮箱不能为空，密码至少 6 位');
  }

  if (users.some((user) => user.username === username)) {
    setResponseStatus(event, 409);
    return useResponseError('用户名已存在');
  }

  const user = {
    id: nextId(),
    username,
    realName: username,
    nickname: username,
    email,
    phone: '',
    roles: ['user'],
    status: 'active' as const,
    createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
  users.unshift(user);

  return useResponseSuccess({
    id: user.id,
    username: user.username,
    email: user.email,
    status: user.status,
  });
});
