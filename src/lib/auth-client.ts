/**
 * Auth client for the JPGLabs Hub realm.
 *
 * Calls the hub's session exchange endpoints. Supabase access tokens are
 * exchanged for hub access tokens via `/auth/exchange`; `/auth/me` returns the
 * current hub user; `/auth/logout` revokes the refresh cookie on the hub.
 */

const HUB_URL = import.meta.env.VITE_HUB_URL ?? '';

export interface HubUser {
  id: string;
  email: string;
  role: string;
  roleVersion: number;
}

export interface ExchangeResponse {
  accessToken: string;
  user: HubUser;
}

function csrfTokenFromCookie(): string {
  return document.cookie.match(/csrf_token=([^;]+)/)?.[1] ?? '';
}

export async function exchange(
  supabaseAccessToken: string,
): Promise<ExchangeResponse | null> {
  const res = await fetch(`${HUB_URL}/auth/exchange`, {
    method: 'POST',
    credentials: 'include',
    headers: { Authorization: `Bearer ${supabaseAccessToken}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as ExchangeResponse;
}

export async function me(accessToken: string): Promise<HubUser | null> {
  const res = await fetch(`${HUB_URL}/auth/me`, {
    credentials: 'include',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return null;
  const body = (await res.json()) as { user?: HubUser };
  return body.user ?? null;
}

export async function logout(accessToken: string | null): Promise<void> {
  const csrfToken = csrfTokenFromCookie();
  const headers: Record<string, string> = {
    'X-CSRF-Token': csrfToken,
  };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  await fetch(`${HUB_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers,
  });
}
