import { Navigate, Outlet } from "react-router-dom";
import { useAppSeletor } from "../services/helper/reduxstore";

const AgentRoute = () => {
  const { token, role } = useAppSeletor((state) => state.auth);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (role !== "agent") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AgentRoute;