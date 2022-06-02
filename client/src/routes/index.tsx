import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useHref,
  useNavigate,
} from "react-router-dom";
import { Login } from "../pages/Login";
import  Dashboard  from "../pages/Dashboard";

export const Router = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("@sistema-estacionamento:token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      {/* <Route path="register"><Users /></Route> */}
      {/* <Route path="dashboard"><Home /></Route> */}
    </Routes>
  );
};
