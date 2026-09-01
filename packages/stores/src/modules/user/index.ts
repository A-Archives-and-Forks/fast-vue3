import type { UserState } from './types';

import { clearToken, setToken } from '@fast-vue3/utils';

import { defineStore } from 'pinia';

export const useUserStore = defineStore('fast-vue3-user', {
  state: (): UserState => ({
    userId: undefined,
    userName: undefined,
    avatar: undefined,
    email: undefined,
    role: '',
    token: undefined,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
  },
  actions: {
    setUserInfo(info: Partial<UserState>) {
      Object.assign(this, info);
    },
    setToken(token: string) {
      this.token = token;
      setToken(token);
    },
    logout() {
      this.$reset();
      clearToken();
    },
  },
  persist: {
    pick: ['token', 'userName', 'avatar', 'role'],
  },
});
