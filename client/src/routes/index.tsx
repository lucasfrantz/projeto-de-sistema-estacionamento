import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useHref,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";

export const Router = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="login" element={<Login />} />
    </Routes>
  );
};
