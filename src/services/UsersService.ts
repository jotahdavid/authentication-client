import HttpClient from '@services/utils/HttpClient';
import safeString from '@utils/safeString';

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse extends User {
  id: string;
}

const { VITE_BASE_API_URL } = import.meta.env;

class UsersService {
  private http = new HttpClient(safeString(VITE_BASE_API_URL));

  async createUser(user: User) {
    const response = await this.http.post<UserResponse, User>('/users', user);
    return response.data;
  }
}

export default new UsersService();
