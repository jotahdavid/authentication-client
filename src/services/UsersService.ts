import HttpClient from '@services/utils/HttpClient';
import safeString from '@utils/safeString';

// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserCreation extends Omit<User, 'id'> {
  password: string;
}

export interface UserCredential extends Pick<User, 'email'> {
  password: string;
}

export type UserInfo = Omit<User, 'id'>;

export interface UserResponse {
  user: User;
  token: string;
}

export type UserResponseWithoutToken = Omit<UserResponse, 'token'>;

const { VITE_BASE_API_URL } = import.meta.env;

class UsersService {
  private http = new HttpClient(safeString(VITE_BASE_API_URL));

  async createUser(user: UserCreation) {
    const response = await this.http.post<UserResponse, UserCreation>('/users', user);
    return response.data;
  }

  async login(credential: UserCredential) {
    const response = await this.http.post<UserResponse, UserCredential>('/login', credential);
    return response.data;
  }

  async updateInfo(token: string, newInfo: UserInfo) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await this.http.put<UserResponseWithoutToken, UserInfo>('/users/me', newInfo, { headers });
    return response.data;
  }

  async getByToken(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await this.http.get<UserResponseWithoutToken>('/users/me', { headers });
    return response.data;
  }
}

export default new UsersService();
