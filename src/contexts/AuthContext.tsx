import {
  createContext, ReactNode, useCallback, useMemo, useState, useEffect,
} from 'react';
import cookies from 'js-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import UsersService, {
  User, UserCreation, UserCredential, UserInfo,
} from '@services/UsersService';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  handleRegister: (newUser: UserCreation) => Promise<void>;
  handleLogin: (credential: UserCredential) => Promise<User>;
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
      } catch {
        cookies.remove('authentication.token', { path: '/' });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isAuthenticated]);

  const handleRegister = useCallback(async (newUser: UserCreation) => {
    try {
      setIsLoading(true);

      const { user: userLogged, token } = await UsersService.createUser(newUser);
      const decodedToken = jwtDecode<JwtPayload>(token);

      if (decodedToken.exp) {
        cookies.set('authentication.token', token, {
          sameSite: 'Strict',
          path: '/',
          expires: new Date(decodedToken.exp * 1000),
        });
      }
      setUser(userLogged);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = useCallback(async (userCredential: UserCredential) => {
    try {
      setIsLoading(true);
      const { user: userLogged, token } = await UsersService.login(userCredential);
      const decodedToken = jwtDecode<JwtPayload>(token);

      if (decodedToken.exp) {
        cookies.set('authentication.token', token, {
          sameSite: 'Strict',
          path: '/',
          expires: new Date(decodedToken.exp * 1000),
        });
      }
      setUser(userLogged);

      return userLogged;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    cookies.remove('authentication.token');
    setUser(null);
  }, []);

  const handleUpdateInfo = useCallback(async (newInfo: UserInfo) => {
    const token = cookies.get('authentication.token');
    if (!token) return;

    try {
      setIsLoading(true);

      const { user: updatedUser } = await UsersService.updateInfo(token, newInfo);

      setUser(updatedUser);
    } finally {
      setIsLoading(false);
    }
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
