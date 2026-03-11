import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Download,
  Home,
  Server,
  LogOut,
  Briefcase,
  LayoutGrid,
  HandCoins,
  BadgeDollarSign,
} from 'lucide-react';
import { ROUTES } from '../config/routes';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, isAdmin, isConsultant, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.offer);
  };

  const navItems = [
    { label: 'Offer', path: ROUTES.offer, icon: BadgeDollarSign, show: true },
    { label: 'Portfolio', path: ROUTES.portfolioCanonical, icon: LayoutGrid, show: true },
    { label: 'Services', path: ROUTES.services, icon: Briefcase, show: true },
    { label: 'Home', path: ROUTES.home, icon: Home, show: isAuthenticated },
    { label: 'Downloads', path: ROUTES.downloads, icon: Download, show: isAuthenticated },
    { label: 'Instances', path: ROUTES.dashboardInstances, icon: Server, show: isConsultant },
    { label: 'Guardian', path: ROUTES.guardian, icon: ShieldCheck, show: isAdmin },
    { label: 'Upsell', path: ROUTES.upsell, icon: HandCoins, show: isAdmin },
  ];

  const isItemActive = (path: string): boolean => {
    if (path === ROUTES.portfolioCanonical) {
      return location.pathname.startsWith('/portifolio/');
    }

    if (path === ROUTES.downloads) {
      return location.pathname === ROUTES.downloads || location.pathname.startsWith(`${ROUTES.downloads}/`);
    }

    if (path === ROUTES.dashboardInstances) {
      return (
        location.pathname === ROUTES.dashboardInstances ||
        location.pathname.startsWith(`${ROUTES.dashboardInstances}/`) ||
        location.pathname === ROUTES.overview
      );
    }

    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-gray-300 font-sans selection:bg-blue-500/30 selection:text-white flex flex-col">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(0,112,243,0.15),transparent_70%)] pointer-events-none" />

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#08090a]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link to={ROUTES.offer} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(0,112,243,0.3)] italic uppercase text-sm">
              J
            </div>
            <span className="font-bold text-white tracking-widest text-lg uppercase italic hidden sm:block">JPG Labs</span>
          </Link>

          <div className="hidden xl:flex bg-white/5 rounded-full border border-white/10 p-1 overflow-x-auto max-w-full">
            {navItems
              .filter((item) => item.show)
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all uppercase tracking-widest flex items-center gap-2 whitespace-nowrap ${
                    isItemActive(item.path)
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <item.icon size={12} />
                  {item.label}
                </Link>
              ))}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 hidden sm:block">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/10 hover:text-red-500 transition-all text-gray-500"
                  title="Sair"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.offer}
                className="px-5 py-2 bg-white text-black rounded-full text-[10px] font-black hover:bg-gray-200 transition-all uppercase tracking-widest"
              >
                CHECKOUT
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 relative pt-16">{children}</main>

      <footer className="border-t border-white/5 py-10 text-center relative z-10">
        <div className="flex justify-center gap-8 mb-6">
          <a
            href="https://instagram.com/jpglabs"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/jader-germano"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-gray-700 text-[10px] uppercase tracking-[0.5em] font-black italic">
          &copy; 2026 JPGLabs • GLOBAL HUB
        </p>
      </footer>
    </div>
  );
};

export default Layout;
