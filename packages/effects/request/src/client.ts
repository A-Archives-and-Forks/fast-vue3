import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import axios from 'axios';
import { getAuthHeader, getHttpStatusMessage } from '@fast-vue3/utils';

export interface IResponse<T = any> {
  code: number | string;
  result: T;
  message: string;
  status: string | number;
}

export interface RequestOptions {
  /** 是否处理响应结果，默认 true */
  isTransformResponse?: boolean;
}

/**
 * 创建 axios 实例
 * 各 app 调用此函数，传入 baseURL 创建专属 http 客户端
 */
export function createHttpClient(baseURL: string, timeout = 10_000): AxiosInstance {
  const service = axios.create({ baseURL, timeout });

  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const authHeader = getAuthHeader();
      if (authHeader) {
        config.headers.authorization = authHeader;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  service.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status === 200) return response;
      return Promise.reject(new Error(getHttpStatusMessage(response.status)));
    },
    (error: AxiosError) => {
      const { response } = error;
      if (response) {
        return Promise.reject(new Error(getHttpStatusMessage(response.status)));
      }
      return Promise.reject(new Error('网络连接异常，请稍后再试！'));
    },
  );

  return service;
}

/**
 * 基于 axios 实例创建类型安全的请求方法集合
 */
export function createRequest(client: AxiosInstance) {
  function request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      client
        .request<any, AxiosResponse<IResponse<T>>>(config)
        .then((res) => resolve(res.data.result))
        .catch(reject);
    });
  }

  return {
    get: <T = any>(config: AxiosRequestConfig) => request<T>({ ...config, method: 'GET' }),
    post: <T = any>(config: AxiosRequestConfig) => request<T>({ ...config, method: 'POST' }),
    put: <T = any>(config: AxiosRequestConfig) => request<T>({ ...config, method: 'PUT' }),
    del: <T = any>(config: AxiosRequestConfig) => request<T>({ ...config, method: 'DELETE' }),
    request,
  };
}
