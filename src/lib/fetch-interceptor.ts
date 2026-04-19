/**
 * Auth-aware fetch wrapper with silent refresh on 401.
 *
 * Shared singleton promise ensures concurrent requests that hit 401 at the
 * same time collapse into a single refresh. CSRF token is attached for
 * mutating verbs when present in cookies.
 */

import { exchange } from './auth-client';

let refreshPromise: Promise<string | null> | null = null;

export async function refreshAccess(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      const sb = (await import('./supabase')).supabase;
      const { data } = await sb.auth.getSession();
      if (!data.session?.access_token) return null;
      const res = await exchange(data.session.access_token);
      return res?.accessToken ?? null;
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

function csrfTokenFromCookie(): string | undefined {
  return document.cookie.match(/csrf_token=([^;]+)/)?.[1];
}

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function makeAuthFetch(
  getAccess: () => string | null,
  setAccess: (t: string | null) => void,
) {
  return async function authFetch(
    input: RequestInfo | URL,
    init: RequestInit = {},
  ): Promise<Response> {
    const access = getAccess();
    const headers = new Headers(init.headers);
    if (access) headers.set('Authorization', `Bearer ${access}`);

    const csrfToken = csrfTokenFromCookie();
    const method = init.method?.toUpperCase();
    if (csrfToken && method && MUTATING_METHODS.has(method)) {
      headers.set('X-CSRF-Token', csrfToken);
    }

    let res = await fetch(input, { ...init, credentials: 'include', headers });

    if (res.status === 401) {
      const newAccess = await refreshAccess();
      if (newAccess) {
        setAccess(newAccess);
        const retryHeaders = new Headers(init.headers);
        retryHeaders.set('Authorization', `Bearer ${newAccess}`);
        if (csrfToken && method && MUTATING_METHODS.has(method)) {
          retryHeaders.set('X-CSRF-Token', csrfToken);
        }
        res = await fetch(input, {
          ...init,
          credentials: 'include',
          headers: retryHeaders,
        });
      }
    }

    return res;
  };
}

/**
 * Test-only reset. Clears the in-flight refresh promise so each test starts
 * from a clean state.
 */
export function __resetRefreshPromiseForTests(): void {
  refreshPromise = null;
}
