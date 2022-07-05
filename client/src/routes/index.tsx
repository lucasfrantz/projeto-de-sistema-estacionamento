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
import Placeholder from "../pages/Occupation";
import Vehicles from "../pages/Vehicles";
import Main from "../pages/Main";
import Occupations from "../pages/Occupation";
import ParkingSpots from "../pages/ParkingSpots";
import Vagas from "../pages/AdminDashboard/vagas";

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
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="occupation"
        element={
          <ProtectedRoute user={user}>
            <Occupations />
          </ProtectedRoute>
        }
      />
      <Route
        path="vehicles"
        element={
          <ProtectedRoute user={user}>
            <Vehicles />
          </ProtectedRoute>
        }
      />
      <Route
        path="parkingspots"
        element={
          <ProtectedRoute user={user}>
            <ParkingSpots />
          </ProtectedRoute>
        }
      />

      <Route path="login" element={<Login />} />
    </Routes>
  );
};
