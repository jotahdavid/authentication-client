import { BrowserRouter } from 'react-router-dom';

import { setDefaultPageTitle } from '@hooks/usePageTitle';
import { AuthContextProvider } from '@contexts/AuthContext';

import AppRoutes from '../../Routes';

export function App() {
  setDefaultPageTitle('Auth');

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContextProvider>
  );
}
