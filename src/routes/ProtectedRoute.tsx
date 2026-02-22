import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../features/auth/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
