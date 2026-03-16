export const ROUTES = {
  root: '/',
  login: '/login',
  offer: '/offer',
  home: '/home',
  overview: '/overview',
  services: '/services',
  downloads: '/downloads',
  docs: '/docs',
  assetsLegacy: '/assets',
  dashboardInstances: '/dashboard/instances',
  guardian: '/guardian',
  guardianLegacy: '/gardian',
  upsell: '/upsell',
  legal: '/legal',
  portfolioManager: '/dashboard/portfolio-manager',
  caseStudy: '/case-study/:slug',
  portfolioCanonical: '/portifolio/jader-germano',
  portfolioDynamic: '/portifolio/:userSlug',
  portfolioLegacy: '/portfolio',
  hubLegacy: '/hub',
} as const;

export const buildProductRoute = (slug: string): string => `${ROUTES.downloads}/${slug}`;

export const buildPortfolioRoute = (slug: string): string => `/portifolio/${slug}`;

export const buildServiceRoute = (slug: string): string => `${ROUTES.dashboardInstances}/${slug}`;

export const routerBasename = (() => {
  const base = import.meta.env.BASE_URL || '/';
  const normalized = base.endsWith('/') ? base.slice(0, -1) : base;
  return normalized || '/';
})();
