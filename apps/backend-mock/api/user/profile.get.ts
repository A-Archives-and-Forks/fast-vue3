import { MOCK_USERS } from '~/utils/mock-data';
import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(() => {
  const user = MOCK_USERS[0];
  const { password: _pwd, ...userInfo } = user;
  return useResponseSuccess({
    avatar: userInfo.avatar,
    role: userInfo.roles[0] ?? 'admin',
    userName: userInfo.realName,
  });
});
