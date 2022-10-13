import { setDefaultPageTitle } from '@hooks/usePageTitle';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '../../Routes';

export function App() {
  setDefaultPageTitle('Auth');

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
