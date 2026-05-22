import { successResult } from './helpers';

export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }: { body: { username: string; password: string } }) => {
      if (body.username === 'admin' && body.password === '123456') {
        return successResult({ token: 'mock-token-web-tdesign-2024' });
      }
      return { code: 401, result: null, message: '用户名或密码错误', status: 'fail' };
    },
  },
  {
    url: '/api/user/profile',
    method: 'get',
    response: () => successResult({ userName: 'Admin', avatar: '', role: 'admin' }),
  },
  {
    url: '/api/user/logout',
    method: 'post',
    response: () => successResult(null, { message: '退出成功' }),
  },
];
