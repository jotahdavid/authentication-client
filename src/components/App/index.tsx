import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '../../Routes';

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
