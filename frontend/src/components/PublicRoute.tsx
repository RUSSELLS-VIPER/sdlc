import { Navigate, Outlet } from "react-router-dom";
import { useAppSeletor } from "../services/helper/reduxstore";

const PublicRoute = () => {
  const { token, role } = useAppSeletor((state) => state.auth);

  // Already logged in
  if (token && (role === "admin" || role === "agent")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (token && role === "user") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;