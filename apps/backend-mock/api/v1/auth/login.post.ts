import { MOCK_USERS } from '~/utils/mock-data';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const { password, username } = await readBody<{
    password: string;
    username: string;
  }>(event);

  const user = MOCK_USERS.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    setResponseStatus(event, 401);
    return useResponseError('用户名或密码错误');
  }

  return useResponseSuccess({
    accessToken: `mock-access-token-${user.username}`,
    refreshToken: `mock-refresh-token-${user.username}`,
    expiresIn: 7200,
  });
});
