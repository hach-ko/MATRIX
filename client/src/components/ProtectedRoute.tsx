import { Redirect } from "wouter";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userStr = localStorage.getItem("user");
  
  if (!userStr) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
}
