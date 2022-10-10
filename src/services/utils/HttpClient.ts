import axios from 'axios';

type Default = unknown;

class HttpClient {
  private makeRequest;

  constructor(baseURL: string) {
    this.makeRequest = axios.create({ baseURL });
  }

  get<TResponse = Default>(path: string) {
    return this.makeRequest.get<TResponse>(path);
  }

  post<TResponse = Default, TData = Default>(path: string, data?: TData) {
    return this.makeRequest.post<TResponse>(path, data);
  }

  put<TResponse = Default, TData = Default>(path: string, data?: TData) {
    return this.makeRequest.put<TResponse>(path, data);
  }

  delete<TResponse = Default>(path: string) {
    return this.makeRequest.delete<TResponse>(path);
  }
}

export default HttpClient;
