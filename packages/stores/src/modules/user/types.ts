import type { RoleType } from '@fast-vue3/shared';

export interface UserState {
  avatar?: string;
  email?: string;
  role: RoleType;
  token?: string;
  userId?: string;
  userName?: string;
}
