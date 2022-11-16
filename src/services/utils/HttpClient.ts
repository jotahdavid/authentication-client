import axios, { AxiosResponse } from 'axios';

import delay from '@utils/delay';

type Default = unknown;

interface RequestConfig {
  headers?: Record<string, string>
}

class HttpClient {
  private makeRequest;

  constructor(baseURL: string) {
    this.makeRequest = axios.create({ baseURL });
    this.makeRequest.interceptors.response.use(async (data) => {
      await delay(500);
      return data;
    });
  }

  get<TResponse = Default>(path: string, config?: RequestConfig) {
    return this.makeRequest.get<TResponse>(path, config);
  }

  post<TResponse = Default, TData = Default>(path: string, data?: TData, config?: RequestConfig) {
    return this.makeRequest
      .post<TResponse, AxiosResponse<TResponse, TData>, TData>(path, data, config);
  }

  put<TResponse = Default, TData = Default>(path: string, data?: TData, config?: RequestConfig) {
    return this.makeRequest
      .put<TResponse, AxiosResponse<TResponse, TData>, TData>(path, data, config);
  }

  delete<TResponse = Default>(path: string, config?: RequestConfig) {
    return this.makeRequest.delete<TResponse>(path, config);
  }
}

export default HttpClient;
