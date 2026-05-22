import AgentDashboard from "../../components/Dashboard/AgentDashboard"
import SuperAdminDashboard from "../../components/Dashboard/SuperAdminDashboard"
import { useAppSeletor } from "../../services/helper/reduxstore"


const Dashboard = () => {

    const {role, token} = useAppSeletor((state)=> state.auth)
  return token && role === "admin" ? <SuperAdminDashboard /> : <AgentDashboard />
}

export default Dashboard