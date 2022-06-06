import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  user: object | null;
  redirectPath?: string;
}

export const ProtectedRoute = ({
  user,
  redirectPath = "/login",
  children,
}: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
