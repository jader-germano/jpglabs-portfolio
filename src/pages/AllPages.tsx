import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';

type PageEntry = {
  label: string;
  path: string;
  note?: string;
};

const SECTIONS: Array<{ title: string; items: PageEntry[] }> = [
  {
    title: 'Public',
    items: [
      { label: 'Root (redirect → Portfolio)', path: ROUTES.root },
      { label: 'Home', path: ROUTES.home, note: 'Migrated PortfolioHome composition' },
      { label: 'Offer', path: ROUTES.offer },
      { label: 'Services', path: ROUTES.services },
      { label: 'Downloads (Products)', path: ROUTES.downloads },
      { label: 'Docs', path: ROUTES.docs },
      { label: 'Portfolio (canonical)', path: ROUTES.portfolioCanonical },
      { label: 'Legal', path: ROUTES.legal },
      { label: 'Privacy', path: '/privacy', note: 'Migrated from portfolio-backend' },
      { label: 'Terms', path: '/terms', note: 'Migrated from portfolio-backend' },
    ],
  },
  {
    title: 'Auth',
    items: [
      { label: 'Login', path: ROUTES.login },
      { label: 'Auth Callback', path: ROUTES.authCallback, note: 'OAuth return' },
    ],
  },
  {
    title: 'Dashboard (protected)',
    items: [
      { label: 'Instances', path: ROUTES.dashboardInstances },
      { label: 'Guardian Console', path: '/dashboard/guardian' },
      { label: 'Portfolio Manager', path: ROUTES.portfolioManager, note: 'External: AI frontend' },
    ],
  },
  {
    title: 'Overview / Upsell (external redirects)',
    items: [
      { label: 'Overview', path: ROUTES.overview },
      { label: 'Upsell', path: ROUTES.upsell },
      { label: 'Guardian (legacy)', path: ROUTES.guardian },
    ],
  },
];

export default function AllPagesPage() {
  return (
    <div className="min-h-screen bg-bg text-fg px-6 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold">Todas as páginas</h1>
        <p className="mt-3 text-sm text-fg-muted">
          Índice completo das rotas da aplicação. Gerado a partir de <code>src/config/routes.ts</code>.
        </p>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-xs uppercase tracking-[0.22em] text-fg-muted font-semibold">
                {section.title}
              </h2>
              <ul className="mt-4 divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface/40">
                {section.items.map((item) => (
                  <li key={item.path} className="flex items-center justify-between gap-4 px-5 py-3">
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold truncate">{item.label}</span>
                      {item.note && (
                        <span className="text-xs text-fg-muted truncate">{item.note}</span>
                      )}
                    </div>
                    <Link
                      to={item.path}
                      className="shrink-0 rounded-md border border-border-subtle px-3 py-1.5 text-sm font-mono hover:bg-surface transition"
                    >
                      {item.path}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
