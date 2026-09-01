export function useResponseSuccess<T = any>(data: T, message = 'success') {
  return {
    code: 200,
    result: data,
    message,
    status: 'ok',
  };
}

export function useResponseError(message: string) {
  return {
    code: -1,
    result: null,
    message,
    status: 'fail',
  };
}
