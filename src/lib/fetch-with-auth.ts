import { supabase } from "./supabase";

/**
 * fetchWithAuth: drop-in fetch wrapper that attaches the current Supabase
 * access token as a Bearer Authorization header. Intended to replace
 * `fetch(...)` calls that previously relied on NextAuth session cookies.
 */
export async function fetchWithAuth(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(init.headers);
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  return fetch(input, { ...init, headers });
}
