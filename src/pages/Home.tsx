import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ExternalLink, LayoutGrid, ShieldCheck, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildProductRoute, buildServiceRoute, ROUTES } from '../config/routes';
import { PRODUCT_CATALOG } from '../data/products';
import { formatPublicUsage, SERVICE_CATALOG } from '../data/services';
import { useAuth } from '../context/AuthContext';

type RouteInventoryItem = {
  label: string;
  path: string;
  access: string;
  sourceFile: string;
  sourcePath: string;
  note?: string;
};

const CASE_STUDY_SLUGS = ['ai-toolkit-v3', 'cloud-infra'] as const;

const ROUTE_INVENTORY: RouteInventoryItem[] = [
  {
    label: 'Offer',
    path: ROUTES.offer,
    access: 'Public',
    sourceFile: 'Offer.tsx',
    sourcePath: 'src/pages/Offer.tsx',
  },
  {
    label: 'Services',
    path: ROUTES.services,
    access: 'Public',
    sourceFile: 'Services.tsx',
    sourcePath: 'src/pages/Services.tsx',
  },
  {
    label: 'Portfolio Canonical',
    path: ROUTES.portfolioCanonical,
    access: 'Public',
    sourceFile: 'Portfolio.tsx',
    sourcePath: 'src/pages/Portfolio.tsx',
    note: `Dynamic router also accepts ${ROUTES.portfolioDynamic}`,
  },
  ...CASE_STUDY_SLUGS.map((slug) => ({
    label: `Case Study: ${slug}`,
    path: ROUTES.caseStudy.replace(':slug', slug),
    access: 'Public dynamic',
    sourceFile: 'CaseStudy.tsx',
    sourcePath: 'src/pages/CaseStudy.tsx',
    note: 'Rendered by the case study slug page.',
  })),
  {
    label: 'Legal',
    path: ROUTES.legal,
    access: 'Public',
    sourceFile: 'Legal.tsx',
    sourcePath: 'src/pages/Legal.tsx',
  },
  {
    label: 'Home Dashboard',
    path: ROUTES.home,
    access: 'Authenticated',
    sourceFile: 'Home.tsx',
    sourcePath: 'src/pages/Home.tsx',
  },
  {
    label: 'Downloads Hub',
    path: ROUTES.downloads,
    access: 'Authenticated',
    sourceFile: 'Downloads.tsx',
    sourcePath: 'src/pages/Downloads.tsx',
  },
  ...PRODUCT_CATALOG.map((product) => ({
    label: `Download: ${product.slug}`,
    path: buildProductRoute(product.slug),
    access: `Product detail (${product.accessRoles.join(' / ')})`,
    sourceFile: 'ProductDetail.tsx',
    sourcePath: 'src/pages/ProductDetail.tsx',
    note: product.name,
  })),
  {
    label: 'VPS Overview',
    path: ROUTES.overview,
    access: 'Consultant / Admin',
    sourceFile: 'Overview.tsx',
    sourcePath: 'src/pages/Overview.tsx',
  },
  {
    label: 'Instances Dashboard',
    path: ROUTES.dashboardInstances,
    access: 'Consultant / Admin',
    sourceFile: 'Instances.tsx',
    sourcePath: 'src/pages/Instances.tsx',
  },
  ...SERVICE_CATALOG.map((service) => ({
    label: `Service: ${service.slug}`,
    path: buildServiceRoute(service.slug),
    access: 'Consultant / Admin',
    sourceFile: 'ServiceDetail.tsx',
    sourcePath: 'src/pages/ServiceDetail.tsx',
    note: service.name,
  })),
  {
    label: 'Guardian',
    path: ROUTES.guardian,
    access: 'Admin',
    sourceFile: 'Guardian.tsx',
    sourcePath: 'src/pages/Guardian.tsx',
  },
  {
    label: 'Upsell',
    path: ROUTES.upsell,
    access: 'Admin',
    sourceFile: 'Upsell.tsx',
    sourcePath: 'src/pages/Upsell.tsx',
  },
];

const Home: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">
          Welcome back, <span className="text-blue-500 italic">{user?.name}</span>
        </h1>
        <p className="text-gray-500 font-light text-lg">
          Access profile: <span className="text-green-500 font-bold uppercase tracking-widest text-sm">{user?.role}</span>
        </p>
      </motion.div>

      {isAdmin ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <section className="lg:col-span-8 rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-black text-white uppercase tracking-widest text-sm flex items-center gap-3">
                  <Activity className="text-blue-500" size={18} /> Hostinger VPS Snapshot
                </h2>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">No historical charts</span>
              </div>

              <div className="space-y-4 mb-10">
                {SERVICE_CATALOG.map((service) => (
                  <Link
                    key={service.id}
                    to={buildServiceRoute(service.slug)}
                    className="flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-white/5 transition-all"
                    title={service.tooltip}
                  >
                    <span className="text-xs font-bold text-gray-300 w-40 truncate">{service.name}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${service.cpuPercent}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 w-12 text-right">{service.cpuPercent}%</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Details</span>
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <Link
                  to={ROUTES.overview}
                  className="text-blue-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2"
                >
                  Open VPS /overview <ExternalLink size={12} />
                </Link>
                <Link
                  to={ROUTES.dashboardInstances}
                  className="text-gray-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                >
                  View all instances
                </Link>
              </div>
            </section>

            <section className="lg:col-span-4 flex flex-col gap-6">
              <div className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-7 backdrop-blur-sm">
                <h3 className="font-black text-white uppercase tracking-widest text-sm mb-5 flex items-center gap-2">
                  <ShieldCheck className="text-green-500" size={18} /> Guardian Section
                </h3>
                <div className="space-y-3 mb-5">
                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                    <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">SSL Status</p>
                    <p className="text-xs text-gray-400 mt-1">Certificates valid and auto-renew active.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Backups</p>
                    <p className="text-xs text-gray-400 mt-1">Last backup completed 2 hours ago.</p>
                  </div>
                </div>
                <Link
                  to={ROUTES.guardian}
                  className="block text-center py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest text-gray-500"
                >
                  Open Guardian
                </Link>
              </div>

              <div className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-7 backdrop-blur-sm">
                <h3 className="font-black text-white uppercase tracking-widest text-sm mb-5 flex items-center gap-2">
                  <Terminal className="text-blue-500" size={18} /> Instances Section
                </h3>
                <div className="space-y-3">
                  {SERVICE_CATALOG.slice(0, 3).map((service) => (
                    <Link
                      key={service.id}
                      to={buildServiceRoute(service.slug)}
                      className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                      title={service.tooltip}
                    >
                      <p className="text-xs font-black text-white uppercase tracking-tight">{service.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{service.cpuPercent}% cpu</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="font-black text-white uppercase tracking-widest text-sm flex items-center gap-3">
                  <LayoutGrid className="text-blue-500" size={18} /> Frontend Route Inventory
                </h2>
                <p className="text-xs text-gray-500 mt-2">
                  All React Router entries currently wired in the frontend, listed below the VPS dashboard for quick review.
                </p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                {ROUTE_INVENTORY.length} routes mapped
              </span>
            </div>

            <div className="space-y-3">
              {ROUTE_INVENTORY.map((route) => (
                <div
                  key={`${route.label}-${route.path}`}
                  className="grid gap-3 rounded-2xl border border-white/5 bg-black/30 p-4 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)_auto]"
                >
                  <div>
                    <p className="text-xs font-black text-white uppercase tracking-tight">{route.label}</p>
                    <p className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-600 mt-2">{route.access}</p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-gray-300 break-all">{route.path}</p>
                    <p className="text-[10px] text-gray-400 mt-2">
                      File: <span className="font-mono text-gray-300">{route.sourceFile}</span>
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Root path: <span className="font-mono text-gray-400 break-all">{route.sourcePath}</span>
                    </p>
                    {route.note ? <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">{route.note}</p> : null}
                  </div>

                  <Link
                    to={route.path}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 transition-all hover:border-blue-500/40 hover:text-white"
                  >
                    Open <ExternalLink size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="p-12 text-left border border-white/5 rounded-[32px] bg-white/[0.02]">
          <LayoutGrid className="text-blue-500 mb-6" size={42} />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Member Dashboard</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed mb-8">
            You have consultant-level visibility. Service metrics are sanitized for public-safe operational sharing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICE_CATALOG.map((service) => (
              <Link
                key={service.id}
                to={buildServiceRoute(service.slug)}
                className="p-4 rounded-2xl border border-white/5 bg-black/30 hover:border-blue-500/40 transition-all"
                title={service.tooltip}
              >
                <p className="text-sm font-black text-white uppercase tracking-tight">{service.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                  Usage: {formatPublicUsage(service.cpuPercent)}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
            <Link
              to={ROUTES.dashboardInstances}
              className="text-blue-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2"
            >
              Open Instances
            </Link>
            <Link
              to={ROUTES.overview}
              className="text-gray-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2"
            >
              Open VPS /overview <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
