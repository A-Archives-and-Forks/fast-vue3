import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { getToken, TokenPrefix } from '@/utils/auth';

import { showMessage } from './status';
import type { IResponse } from './type';

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 10000,
});

// axios实例拦截请求
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.authorization = `${TokenPrefix}${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// axios实例拦截响应
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response;
    }
    showMessage(response.status);
    return Promise.reject(new Error(showMessage(response.status)));
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在 2xx 的范围
      const msg = showMessage(response.status);
      return Promise.reject(new Error(msg));
    }
    if (!error.response) {
      return Promise.reject(new Error('网络连接异常，请稍后再试！'));
    }
    return Promise.reject(error);
  },
);

const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    service
      .request<any, AxiosResponse<IResponse>>(config)
      .then((res: AxiosResponse<IResponse>) => {
        const {
          data: { result },
        } = res;
        resolve(result as T);
      })
      .catch(reject);
  });
};

export function get<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' });
}

export function post<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'POST' });
}

export function put<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'PUT' });
}

export function del<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'DELETE' });
}

export default request;
