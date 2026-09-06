export function useResponseSuccess<T = any>(data: T, message = 'success') {
  return {
    code: 0,
    data,
    message,
  };
}

export function useResponseError(message: string, code = -1) {
  return {
    code,
    data: null,
    message,
  };
}
