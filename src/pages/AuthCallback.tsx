import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const [timedOut, setTimedOut] = useState(false);

  // Supabase puts errors on both query and hash fragment — check both.
  const queryError = searchParams.get('error_description') ?? searchParams.get('error');
  const hash = window.location.hash.replace(/^#/, '');
  const hashParams = new URLSearchParams(hash);
  const hashError = hashParams.get('error_description') ?? hashParams.get('error');
  const oauthError = queryError ?? hashError;

  useEffect(() => {
    if (oauthError) return;
    if (isAuthenticated && user) {
      const returnTo = sessionStorage.getItem('oauth_return_to') ?? ROUTES.root;
      sessionStorage.removeItem('oauth_return_to');
      navigate(returnTo, { replace: true });
    }
  }, [isAuthenticated, user, navigate, oauthError]);

  useEffect(() => {
    if (oauthError || (isAuthenticated && user)) return;
    const t = window.setTimeout(() => setTimedOut(true), 8000);
    return () => window.clearTimeout(t);
  }, [oauthError, isAuthenticated, user]);

  if (oauthError || timedOut) {
    const message = oauthError ?? 'Tempo esgotado ao conectar — tente novamente.';
    return (
      <div className="min-h-screen bg-[#08090a] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="inline-block w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 text-xl font-black">!</div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            Falha na autenticação
          </p>
          <p className="text-sm text-gray-300 leading-relaxed break-words">
            {decodeURIComponent(message.replace(/\+/g, ' '))}
          </p>
          <button
            onClick={() => navigate(ROUTES.login, { replace: true })}
            className="mt-4 bg-white text-black px-6 py-2 rounded font-bold text-xs tracking-wider uppercase hover:bg-gray-200 transition-colors"
          >
            Voltar ao login
          </button>
        </div>
      </div>
    );
  }

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
