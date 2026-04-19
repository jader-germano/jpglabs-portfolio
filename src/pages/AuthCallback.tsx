import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../config/routes';

/**
 * OAuth callback destination for Supabase.
 *
 * The Supabase client finishes the OAuth flow on page load
 * (detectSessionInUrl=true). AuthContext watches onAuthStateChange and calls
 * the hub /auth/exchange to create the hub-session. Once authenticated, we
 * redirect to the return URL or root.
 */
const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const returnTo = sessionStorage.getItem('oauth_return_to') ?? ROUTES.root;
      sessionStorage.removeItem('oauth_return_to');
      navigate(returnTo, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-[#08090a] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="inline-block w-10 h-10 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
          Conectando sua sessão…
        </p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
