import {
  createContext, ReactNode, useCallback, useMemo, useState,
  useEffect,
} from 'react';
import cookies from 'js-cookie';

import UsersService, {
  User, UserCreation, UserCredential, UserInfo,
} from '@services/UsersService';
import axios from 'axios';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  handleRegister: (newUser: UserCreation) => Promise<void>;
  handleLogin: (credential: UserCredential) => Promise<void>;
  handleLogout: () => void;
  handleUpdateInfo: (newInfo: UserInfo) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextValue);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const token = cookies.get('authentication.token');
        if (isAuthenticated || !token) return;

        const { user: userData } = await UsersService.getByToken(token);

        setUser(userData);
      } catch (err) {
        if (err instanceof axios.AxiosError) {
          console.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isAuthenticated]);

  const handleRegister = useCallback(async (newUser: UserCreation) => {
    const { user: userLogged, token } = await UsersService.createUser(newUser);

    const domain = window.location.host;
    cookies.set('authentication.token', token, { domain });
    setUser(userLogged);
  }, []);

  const handleLogin = useCallback(async (userCredential: UserCredential) => {
    const { user: userLogged, token } = await UsersService.login(userCredential);

    cookies.set('authentication.token', token);
    setUser(userLogged);
  }, []);

  const handleLogout = useCallback(() => {
    cookies.remove('authentication.token');
    setUser(null);
  }, []);

  const handleUpdateInfo = useCallback(async (newInfo: UserInfo) => {
    const token = cookies.get('authentication.token');
    if (!token) return;

    const { user: updatedUser } = await UsersService.updateInfo(token, newInfo);

    setUser(updatedUser);
  }, []);

  const authContextValue = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      handleRegister,
      handleLogin,
      handleLogout,
      handleUpdateInfo,
    }),
    [
      user,
      isLoading,
      isAuthenticated,
      handleRegister,
      handleLogin,
      handleLogout,
      handleUpdateInfo,
    ],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
