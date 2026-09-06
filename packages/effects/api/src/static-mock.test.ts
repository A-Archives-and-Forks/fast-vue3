import { describe, expect, it } from 'vitest';

import { createStaticMockApi } from './static-mock';

describe('static mock api', () => {
  it('supports the documented preview login', async () => {
    const api = createStaticMockApi();

    await expect(
      api.auth.login({ username: 'admin', password: '123456' }),
    ).resolves.toMatchObject({
      accessToken: 'mock-access-token-admin',
      refreshToken: 'mock-refresh-token-admin',
    });
    await expect(
      api.auth.login({ username: 'admin', password: 'wrong' }),
    ).rejects.toThrow('用户名或密码错误');
  });

  it('keeps mutations in the current mock instance', async () => {
    const api = createStaticMockApi();
    const isolatedApi = createStaticMockApi();

    await api.user.create({
      username: 'preview-user',
      password: '123456',
      realName: '预览用户',
    });

    await expect(
      api.user.list({ keyword: 'preview-user' }),
    ).resolves.toMatchObject({ total: 1 });
    await expect(
      isolatedApi.user.list({ keyword: 'preview-user' }),
    ).resolves.toMatchObject({ total: 0 });
  });

  it('provides content required by both preview applications', async () => {
    const api = createStaticMockApi();

    await expect(api.analytics.dashboardStats()).resolves.toMatchObject({
      todayVisits: 3256,
    });
    await expect(api.portal.blogList()).resolves.toMatchObject({
      total: 3,
    });
    await expect(api.system.deptList()).resolves.toHaveLength(1);
  });
});
