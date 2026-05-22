import type { RoleType } from '@fast-vue3/shared';

export interface UserState {
  userId?: string;
  userName?: string;
  avatar?: string;
  email?: string;
  role: RoleType;
  token?: string;
}
