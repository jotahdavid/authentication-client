import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from '@pages/Login';
import { Register } from '@pages/Register';
import { ProfileSettings } from '@pages/ProfileSettings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProfileSettings />} />
    </Routes>
  );
}
