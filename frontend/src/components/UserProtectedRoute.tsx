
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSeletor } from '../services/helper/reduxstore';

export default function UserProtectedRoute() {
  const { token, role } = useAppSeletor((state) => state.auth);
  const isAuthenticated = token && role === "user"; 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}