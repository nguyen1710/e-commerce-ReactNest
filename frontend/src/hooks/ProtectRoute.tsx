import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Loading from "../components/Loading";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { accessTokenState, isCheckingAuth } = useAuth();

  if (isCheckingAuth) return <Loading />;

  return accessTokenState ? <>{children}</> : <Navigate to="/login" replace />;
}
