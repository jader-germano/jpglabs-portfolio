/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { Session, Provider } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

// ── Constants ─────────────────────────────────────────────────────────────────
const SESSION_DURATION_MS = 5 * 60 * 1000; // 5-minute activity window
const WARNING_THRESHOLD_MS = 10 * 1000;    // show warning 10s before expiry
const PI_HANDOFF_KEY = 'jpglabs_pi_handoff_token';
const PORTFOLIO_API_BASE = import.meta.env.VITE_PORTFOLIO_API_URL ?? 'http://localhost:8787';
// (kept for legacy handoff use; no longer referenced after OAuth callback migration)
// const AI_FRONTEND_BASE = import.meta.env.VITE_AI_FRONTEND_URL ?? 'http://localhost:3000';

// ── Role helpers ──────────────────────────────────────────────────────────────
const ROOT_ADMIN_EMAIL_ALIASES = ['jader@jpglabs.com.br', 'jader@jpglabs', 'jader.germano@icloud.com'];

function resolveRoleFromProfile(
  profileRole: string | null | undefined,
  email: string | null | undefined,
): User['role'] {
  if (email && ROOT_ADMIN_EMAIL_ALIASES.includes(email.toLowerCase())) return 'ROOT_ADMIN';
  if (!profileRole) return 'USER';
  const map: Record<string, User['role']> = {
    ROOT_ADMIN: 'ROOT_ADMIN',
    SUB_OWNER: 'SUB_OWNER',
    FAMILY: 'FAMILY',
    PI_AGENT: 'PI_AGENT',
    CLAUDE_ORCHESTRATOR: 'CLAUDE_ORCHESTRATOR',
    USER_CONSULTANT: 'USER_CONSULTANT',
    ADMIN: 'ADMIN',
    admin: 'ADMIN',
    user: 'USER',
  };
  return map[profileRole] ?? 'USER';
}


// ── Context type ──────────────────────────────────────────────────────────────
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithOAuth: (provider: 'github' | 'google' | 'apple') => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isRootAdmin: boolean;
  isAdmin: boolean;
  isSubOwner: boolean;
  isFamily: boolean;
  isPiAgent: boolean;
  isClaudeOrchestrator: boolean;
  isConsultant: boolean;
  isPending: boolean;         // OAuth user awaiting ROOT_ADMIN approval
  canMutate: boolean;
  canViewDashboard: boolean;
  sessionTimeRemaining: number;
  showSessionWarning: boolean;
  extendSession: () => void;
  setPiHandoffToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Fetch user profile role from Supabase ─────────────────────────────────────
async function loadUserFromSession(session: Session): Promise<User> {
  const sbUser = session.user;
  const email = sbUser.email ?? '';

  // Fast-path: ROOT_ADMIN never needs a profile row
  if (ROOT_ADMIN_EMAIL_ALIASES.includes(email.toLowerCase())) {
    return {
      id: sbUser.id,
      email,
      name: sbUser.user_metadata?.full_name ?? sbUser.user_metadata?.name ?? 'Jader Germano',
      role: 'ROOT_ADMIN',
    };
  }

  // Load role from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name')
    .eq('id', sbUser.id)
    .maybeSingle();

  const role = resolveRoleFromProfile(profile?.role, email);
  const name =
    profile?.display_name ??
    sbUser.user_metadata?.full_name ??
    sbUser.user_metadata?.name ??
    email.split('@')[0];

  return { id: sbUser.id, email, name, role };
}


// ── Provider ──────────────────────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [expiry, setExpiry] = useState<number | null>(null);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(SESSION_DURATION_MS);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsPending(false);
    setShowSessionWarning(false);
    localStorage.removeItem(PI_HANDOFF_KEY);
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
  }, []);

  const extendSession = useCallback(() => {
    const newExpiry = Date.now() + SESSION_DURATION_MS;
    setExpiry(newExpiry);
    setShowSessionWarning(false);
  }, []);

  const setPiHandoffToken = useCallback((token: string) => {
    localStorage.setItem(PI_HANDOFF_KEY, token);
  }, []);

  // ── Email / password login (Supabase credentials) ─────────────────────────
  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) return false;
    // onAuthStateChange will pick up the session
    extendSession();
    return true;
  };

  // ── OAuth login (GitHub / Google / Apple) ─────────────────────────────────
  const loginWithOAuth = async (provider: 'github' | 'google' | 'apple') => {
    // Remember where the user came from so AuthCallback can return them home
    try {
      const current = window.location.pathname + window.location.search;
      const returnTo = current === '/login' || current.startsWith('/auth/callback') ? '/' : current;
      sessionStorage.setItem('oauth_return_to', returnTo);
    } catch { /* sessionStorage disabled — ignore */ }
    const redirectTo = `${window.location.origin}/auth/callback`;
    await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: { redirectTo },
    });
    // Browser redirects to provider; onAuthStateChange picks up session on callback
  };


  // ── Auth state subscription ───────────────────────────────────────────────
  useEffect(() => {
    // Initial session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        loadUserFromSession(session).then((u) => {
          setUser(u);
          if (u.role === 'USER') {
            // USER with no profile = pending approval
            setIsPending(true);
            // Notify backend to create/confirm PENDING row
            fetch(`${PORTFOLIO_API_BASE}/api/auth/request-access`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: u.email, provider: 'oauth' }),
            }).catch(() => null);
          }
          extendSession();
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session) {
          setUser(null);
          setIsPending(false);
          return;
        }
        const u = await loadUserFromSession(session);
        setUser(u);
        setIsPending(u.role === 'USER');
        extendSession();
      },
    );

    return () => subscription.unsubscribe();
  }, [extendSession]);

  // ── Session countdown timer ───────────────────────────────────────────────
  useEffect(() => {
    if (user && expiry) {
      timerRef.current = window.setInterval(() => {
        const remaining = expiry - Date.now();
        setSessionTimeRemaining(Math.max(0, remaining));
        if (remaining <= 0) {
          logout();
        } else if (remaining <= WARNING_THRESHOLD_MS) {
          setShowSessionWarning(true);
        }
      }, 1000);
    }
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [user, expiry, logout]);


  // ── Derived booleans ──────────────────────────────────────────────────────
  const isAuthenticated = user !== null && !isPending;
  const isRootAdmin = user?.role === 'ROOT_ADMIN';
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'ROOT_ADMIN';
  const isSubOwner = user?.role === 'SUB_OWNER';
  const isFamily = user?.role === 'FAMILY';
  const isPiAgent = user?.role === 'PI_AGENT';
  const isClaudeOrchestrator = user?.role === 'CLAUDE_ORCHESTRATOR';
  const isConsultant = user?.role === 'USER_CONSULTANT';
  const canMutate = isRootAdmin;
  const canViewDashboard =
    isRootAdmin || isSubOwner || isFamily || isPiAgent || isClaudeOrchestrator || isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithOAuth,
        logout,
        isAuthenticated,
        isRootAdmin,
        isAdmin,
        isSubOwner,
        isFamily,
        isPiAgent,
        isClaudeOrchestrator,
        isConsultant,
        isPending,
        canMutate,
        canViewDashboard,
        sessionTimeRemaining,
        showSessionWarning,
        extendSession,
        setPiHandoffToken,
      }}
    >
      {children}
      {showSessionWarning && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-xl z-50 animate-bounce">
          <p className="font-bold">Sua sessão expira em {Math.ceil(sessionTimeRemaining / 1000)}s</p>
          <button
            onClick={extendSession}
            className="mt-2 bg-white text-red-600 px-4 py-1 rounded font-bold hover:bg-gray-100"
          >
            Manter Logado
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
