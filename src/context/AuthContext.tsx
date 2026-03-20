/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isPrimeOwner: boolean;
  isAdmin: boolean;
  isSubOwner: boolean;
  isFamily: boolean;
  isPiAgent: boolean;
  isClaudeOrchestrator: boolean;
  isConsultant: boolean;
  // Capability shortcuts
  canMutate: boolean;     // PRIME_OWNER only
  canViewDashboard: boolean; // PRIME_OWNER | SUB_OWNER | FAMILY | agents
  sessionTimeRemaining: number;
  showSessionWarning: boolean;
  extendSession: () => void;
}

const SESSION_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const WARNING_THRESHOLD_MS = 10 * 1000; // 10 seconds

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * SHA-256 hash helper (Web Crypto API).
 */
async function sha256(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value);
  const buffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ── Mock users — temporary until Supabase Auth is fully wired ──────────────
// Passwords hashed with SHA-256. Roles mirror portal_users in Supabase.
// Add daughters here when they need access (use sha256(password) via DevTools).
const MOCK_USERS: Array<User & { passwordHash: string }> = [
  {
    id: '1',
    email: 'jader@jpglabs.com.br',
    passwordHash: 'd3438446d908a65ee9cade2a99dc56907915419e1cf579d526577920e8a12046',
    name: 'Jader Germano',
    role: 'PRIME_OWNER',
  },
  {
    id: '3',
    email: 'ayumi@jpglabs.com.br',
    passwordHash: '4099d061083a20cc98c3dece259332f370193740d7d28a1b893397fd814aa640',
    name: 'Ayumi Germano',
    role: 'SUB_OWNER',
  },
  // FAMILY role — daughters: add email + sha256(password) when ready
  // { id: '4', email: 'daughter1@jpglabs.com.br', passwordHash: 'HASH', name: 'Name', role: 'FAMILY' },
  {
    id: '5',
    email: 'pi@jpglabs.com.br',
    passwordHash: 'e86a93896595a7b07287d5dd0a2d67621d61dfb1a35b10dadf4c1e24ab077c48', // PI_API_KEY as password
    name: 'Pi Agent',
    role: 'PI_AGENT',
  },
  {
    id: '6',
    email: 'claw@jpglabs.com.br',
    passwordHash: 'e86a93896595a7b07287d5dd0a2d67621d61dfb1a35b10dadf4c1e24ab077c48',
    name: 'Claude Orchestrator',
    role: 'CLAUDE_ORCHESTRATOR',
  },
  {
    id: '2',
    email: 'consultant@jpglabs.com.br',
    passwordHash: '89e639e0dc3f38dc653b303eb6066d789c21ce21ea0f3d422a287494b8b7267c',
    name: 'Consultant User',
    role: 'USER_CONSULTANT',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('jpglabs_user');
      return saved ? (JSON.parse(saved) as User) : null;
    } catch {
      return null;
    }
  });

  const [expiry, setExpiry] = useState<number | null>(() => {
    const saved = localStorage.getItem('jpglabs_session_expiry');
    return saved ? parseInt(saved, 10) : null;
  });

  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(SESSION_DURATION_MS);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const logout = useCallback(() => {
    setUser(null);
    setExpiry(null);
    setShowSessionWarning(false);
    localStorage.removeItem('jpglabs_user');
    localStorage.removeItem('jpglabs_session_expiry');
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
  }, []);

  const extendSession = useCallback(() => {
    const newExpiry = Date.now() + SESSION_DURATION_MS;
    setExpiry(newExpiry);
    localStorage.setItem('jpglabs_session_expiry', newExpiry.toString());
    setShowSessionWarning(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const hash = await sha256(password);
    const matchedUser = MOCK_USERS.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.toLowerCase() &&
        candidate.passwordHash === hash,
    );

    if (!matchedUser) return false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _hash, ...safeUser } = matchedUser;
    setUser(safeUser as User);
    localStorage.setItem('jpglabs_user', JSON.stringify(safeUser));
    extendSession();
    return true;
  };

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

  const isAuthenticated = user !== null;
  const isPrimeOwner = user?.role === 'PRIME_OWNER';
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'PRIME_OWNER';
  const isSubOwner = user?.role === 'SUB_OWNER';
  const isFamily = user?.role === 'FAMILY';
  const isPiAgent = user?.role === 'PI_AGENT';
  const isClaudeOrchestrator = user?.role === 'CLAUDE_ORCHESTRATOR';
  const isConsultant = user?.role === 'USER_CONSULTANT';
  const canMutate = isPrimeOwner;
  const canViewDashboard = isPrimeOwner || isSubOwner || isFamily || isPiAgent || isClaudeOrchestrator || isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isPrimeOwner,
        isAdmin,
        isSubOwner,
        isFamily,
        isPiAgent,
        isClaudeOrchestrator,
        isConsultant,
        canMutate,
        canViewDashboard,
        sessionTimeRemaining,
        showSessionWarning,
        extendSession,
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
