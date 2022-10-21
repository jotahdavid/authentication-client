import {
  createContext, ReactNode, useCallback, useMemo, useState,
} from 'react';
import cookies from 'js-cookie';

import UsersService, {
  User, UserCreation, UserCredential,
} from '@services/UsersService';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  handleRegister: (newUser: UserCreation) => Promise<void>;
  handleLogin: (credential: UserCredential) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = Boolean(user);

  const handleRegister = useCallback(async (newUser: UserCreation) => {
    const { user: userLogged, token } = await UsersService.createUser(newUser);

    cookies.set('authentication.token', token);
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

  const authContextValue = useMemo(() => ({
    user,
    isAuthenticated,
    handleRegister,
    handleLogin,
    handleLogout,
  }), [user, isAuthenticated, handleRegister, handleLogin, handleLogout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
