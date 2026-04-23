import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";

// Stub Supabase client so AuthProvider does not attempt real network calls
// during the smoke test. Returning a minimal getSession + onAuthStateChange
// keeps the provider happy in AUTH_BYPASS=false mode (default).
vi.mock("../lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signOut: async () => ({ error: null }),
      signInWithPassword: async () => ({ data: { session: null }, error: null }),
      signInWithOAuth: async () => ({ data: null, error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }),
      }),
    }),
  },
}));

describe("<App /> smoke", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("mounts the app tree without throwing", async () => {
    const { default: App } = await import("../App");
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
