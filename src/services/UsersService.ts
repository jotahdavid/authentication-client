import HttpClient from '@services/utils/HttpClient';
import safeString from '@utils/safeString';

// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface User {
  name: string;
  email: string;
  password: string;
}

export type UserCredential = Omit<User, 'name'>;

export interface UserResponse extends User {
  id: string;
}

export interface LoginResponse {
  token: string;
}

const { VITE_BASE_API_URL } = import.meta.env;

class UsersService {
  private http = new HttpClient(safeString(VITE_BASE_API_URL));

  async createUser(user: User) {
    const response = await this.http.post<UserResponse, User>('/users', user);
    return response.data;
  }

  async login(credential: UserCredential) {
    const response = await this.http.post<LoginResponse, UserCredential>('/login', credential);
    return response.data;
  }
}

export default new UsersService();
