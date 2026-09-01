export interface UserInfo {
  id: number;
  password: string;
  realName: string;
  avatar: string;
  roles: string[];
  username: string;
}

export const MOCK_USERS: UserInfo[] = [
  {
    id: 1,
    password: '123456',
    realName: '管理员',
    avatar: '',
    roles: ['admin'],
    username: 'admin',
  },
  {
    id: 2,
    password: '123456',
    realName: '测试用户',
    avatar: '',
    roles: ['user'],
    username: 'user',
  },
];
