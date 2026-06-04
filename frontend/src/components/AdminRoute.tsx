import { Navigate, Outlet } from "react-router-dom";
import { useAppSeletor } from "../services/helper/reduxstore";

const AdminRoute = () => {
  // const { token, role } = useAppSeletor((state) => state.auth);
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }
  // if (role !== "admin") {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default AdminRoute;