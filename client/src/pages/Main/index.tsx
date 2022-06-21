import { useAuth } from "../../hooks/auth";
import AdminDashboard from "../AdminDashboard";
import Dashboard from "../Dashboard";

export default function Main() {
  const { user } = useAuth();

  if (user?.isAdmin) {
    return <AdminDashboard />;
  } else {
    return <Dashboard />;
  }
}
