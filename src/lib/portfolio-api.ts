const normalizeBaseUrl = (value: string): string => value.replace(/\/+$/, "");

const viteEnv = (import.meta as ImportMeta).env as Record<string, string | undefined>;

export const portfolioApiBaseUrl = normalizeBaseUrl(
  viteEnv.VITE_PORTFOLIO_API_URL || viteEnv.NEXT_PUBLIC_PORTFOLIO_API_URL || "http://localhost:8787",
);
