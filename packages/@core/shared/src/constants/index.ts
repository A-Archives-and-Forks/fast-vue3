/** 全局常量 */

/** Token 存储键（各 app 通过 VITE_APP_NAMESPACE 区分） */
export const TOKEN_KEY = 'fast-vue3:token';

/** Refresh Token 存储键 */
export const REFRESH_TOKEN_KEY = 'fast-vue3:refresh-token';

/** Token 前缀 */
export const TOKEN_PREFIX = 'Bearer ';

/** 语言存储键 */
export const LOCALE_KEY = 'fast-vue3:locale';

/** 主题存储键 */
export const THEME_KEY = 'fast-vue3:theme';

/** 默认语言 */
export const DEFAULT_LOCALE = 'zh-CN';

/** 支持的语言列表 */
export const SUPPORT_LOCALES = ['zh-CN', 'en-US'] as const;

export type SupportLocale = (typeof SUPPORT_LOCALES)[number];

/** HTTP 状态码消息映射 */
export const HTTP_STATUS_MAP: Record<number, string> = {
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
  505: 'HTTP版本不受支持(505)',
};
