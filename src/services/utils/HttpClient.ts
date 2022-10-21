import axios, { AxiosResponse } from 'axios';

type Default = unknown;

interface RequestConfig {
  headers?: Record<string, string>
}

class HttpClient {
  private makeRequest;

  constructor(baseURL: string) {
    this.makeRequest = axios.create({ baseURL });
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
