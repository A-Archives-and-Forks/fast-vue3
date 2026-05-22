export function getHttpStatusMessage(status: number): string {
  const map: Record<number, string> = {
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
  return map[status] ?? `连接出错(${status})`;
}

/** 深度合并对象（浅合并优先级：source > target） */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key of Object.keys(source) as (keyof T)[]) {
    const sourceVal = source[key];
    const targetVal = target[key];
    if (
      sourceVal !== null &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      typeof targetVal === 'object'
    ) {
      result[key] = deepMerge(targetVal, sourceVal as any);
    } else if (sourceVal !== undefined) {
      result[key] = sourceVal as T[keyof T];
    }
  }
  return result;
}

/** 节流 */
export function throttle<T extends (...args: any[]) => any>(fn: T, delay = 300): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  } as T;
}

/** 防抖 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as T;
}
