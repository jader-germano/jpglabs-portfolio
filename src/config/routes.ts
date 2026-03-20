export const ROUTES = {
  // ── Public ──────────────────────────────────────────────────────────────
  root: '/',
  login: '/login',
  portfolioCanonical: '/portifolio/jader-germano',
  portfolioDynamic: '/portifolio/:userSlug',
  portfolioLegacy: '/portfolio',

  // ── Authenticated (any role) ─────────────────────────────────────────────
  hub: '/hub',
  legal: '/legal',

  // ── Commercial (PRIME_OWNER | SUB_OWNER | USER_CONSULTANT) ───────────────
  offer: '/offer',
  services: '/services',
  downloads: '/downloads',
  docs: '/docs',
  caseStudy: '/case-study/:slug',
  upsell: '/upsell',

  // ── Owner-only (PRIME_OWNER | SUB_OWNER) ────────────────────────────────
  portfolioManager: '/dashboard/portfolio-manager',
  dashboardInstances: '/dashboard/instances',
  overview: '/overview',
  guardian: '/guardian',

  // ── Legacy redirects ─────────────────────────────────────────────────────
  home: '/home',
  assetsLegacy: '/assets',
  guardianLegacy: '/gardian',
  hubLegacy: '/hub-legacy',
} as const;

export const buildProductRoute = (slug: string): string => `${ROUTES.downloads}/${slug}`;

export const buildPortfolioRoute = (slug: string): string => `/portifolio/${slug}`;

export const buildServiceRoute = (slug: string): string => `${ROUTES.dashboardInstances}/${slug}`;

export const routerBasename = (() => {
  const base = import.meta.env.BASE_URL || '/';
  const normalized = base.endsWith('/') ? base.slice(0, -1) : base;
  return normalized || '/';
})();
