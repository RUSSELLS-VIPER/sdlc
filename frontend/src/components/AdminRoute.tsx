import { Navigate, Outlet } from "react-router-dom";
import { useAppSeletor } from "../services/helper/reduxstore";

const AdminRoute = () => {
  const { token, role } = useAppSeletor((state) => state.auth);

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Not admin
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;