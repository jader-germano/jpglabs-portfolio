import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If set, only these roles can access. Otherwise any authenticated user. */
  roles?: Role[];
  /** If true, FAMILY / PI_AGENT / CLAUDE_ORCHESTRATOR are blocked (commercial routes). */
  commercialOnly?: boolean;
}

const COMMERCIAL_ROLES: Role[] = ['PRIME_OWNER', 'SUB_OWNER', 'ADMIN', 'USER_CONSULTANT'];
const OWNER_ROLES: Role[] = ['PRIME_OWNER', 'SUB_OWNER', 'ADMIN'];

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles, commercialOnly }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const encoded = encodeURIComponent(`${location.pathname}${location.search}${location.hash}`);
    return <Navigate to={`${ROUTES.login}?callbackUrl=${encoded}`} replace />;
  }

  // Block FAMILY / agent roles from commercial routes
  if (commercialOnly && user && !COMMERCIAL_ROLES.includes(user.role)) {
    return <Navigate to={ROUTES.portfolioCanonical} replace />;
  }

  // Specific role whitelist
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to={ROUTES.portfolioCanonical} replace />;
  }

  return <>{children}</>;
};

export { COMMERCIAL_ROLES, OWNER_ROLES };

export default ProtectedRoute;
