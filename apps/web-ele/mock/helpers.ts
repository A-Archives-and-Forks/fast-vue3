export function successResult<T = any>(result: T, options: { message?: string } = {}) {
  return { code: 200, result, message: options.message ?? 'success', status: 'ok' };
}
