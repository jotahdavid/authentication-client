import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from '@pages/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
