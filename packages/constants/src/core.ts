/** Login page path */
export const LOGIN_PATH = '/login';

/** Home page path */
export const HOME_PATH = '/home';

/** Supported languages */
export const SUPPORT_LANGUAGES = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
] as const;

/** Storage keys */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access-token',
  REFRESH_TOKEN: 'refresh-token',
  USER_INFO: 'user-info',
  LOCALE: 'locale',
} as const;
