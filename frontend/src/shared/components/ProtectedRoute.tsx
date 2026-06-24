import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  console.log('[ProtectedRoute]', {
    path: location.pathname,
    isAuthenticated
    });

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}