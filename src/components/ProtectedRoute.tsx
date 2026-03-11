import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.offer} replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
