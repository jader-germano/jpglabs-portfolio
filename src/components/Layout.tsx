import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Download,
  Briefcase,
  LayoutGrid,
  BadgeDollarSign,
  Mic,
  Github,
  Linkedin,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { ROUTES } from '../config/routes';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isPrimeOwner, logout } = useAuth();

  const navItems = [
    { label: 'Home', path: ROUTES.root, icon: LayoutGrid },
    { label: 'Offer', path: ROUTES.offer, icon: BadgeDollarSign },
    { label: 'Services', path: ROUTES.services, icon: Briefcase },
    { label: 'Products', path: ROUTES.downloads, icon: Download },
    { label: 'Portfolio', path: ROUTES.portfolioCanonical, icon: LayoutGrid },
  ];

  const isItemActive = (path: string): boolean => {
    if (path === ROUTES.portfolioCanonical) {
      return location.pathname.startsWith('/portifolio/');
    }

    if (path === ROUTES.downloads) {
      return location.pathname === ROUTES.downloads || location.pathname.startsWith(`${ROUTES.downloads}/`);
    }

    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.root);
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-gray-300 font-sans selection:bg-blue-500/30 selection:text-white flex flex-col">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(0,112,243,0.15),transparent_70%)] pointer-events-none" />

      {/* Main Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#08090a]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link to={ROUTES.root} className="flex items-center gap-3">
            <div className="text-xl font-black tracking-tighter text-white">
              JPG<span className="text-blue-500 font-black italic">LABS</span>
            </div>
          </Link>

          <div className="hidden xl:flex bg-white/5 rounded-full border border-white/10 p-1 overflow-x-auto max-w-full">
            {navItems.map((item) => (
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
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black uppercase text-white tracking-widest">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <span className="text-[7px] font-bold uppercase text-blue-400 tracking-widest">
                    {isPrimeOwner ? 'PRIME OWNER' : user?.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.login}
                className="px-5 py-2 bg-white/5 border border-white/10 text-white rounded-full text-[10px] font-black hover:bg-white/10 transition-all uppercase tracking-widest inline-flex items-center gap-2"
              >
                <UserIcon size={12} />
                Entrar
              </Link>
            )}
            <a
              href="/pi"
              className="px-5 py-2 bg-white text-black rounded-full text-[10px] font-black hover:bg-gray-200 transition-all uppercase tracking-widest inline-flex items-center gap-2"
            >
              <Mic size={12} />
              Pi
            </a>
          </div>
        </div>
      </nav>

      {/* Floating Side Navigation (Socials + Quick Actions) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        <div className="flex flex-col gap-4 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
          <a
            href="https://github.com/jader-germano"
            target="_blank"
            rel="noreferrer"
            className="p-3 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all group relative"
          >
            <Github size={20} />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-[9px] font-black py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">GITHUB</span>
          </a>
          <a
            href="https://www.linkedin.com/in/jader-germano"
            target="_blank"
            rel="noreferrer"
            className="p-3 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all group relative"
          >
            <Linkedin size={20} />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-[9px] font-black py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">LINKEDIN</span>
          </a>
        </div>
      </div>

      <main className="flex-1 relative pt-16 overflow-x-hidden">{children}</main>

      <footer className="border-t border-white/5 py-16 text-center relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-10">
            <div className="text-3xl font-black tracking-tighter text-white mb-2 grayscale opacity-50">
              JPG<span className="text-blue-500 font-black italic">LABS</span>
            </div>
            <p className="text-[9px] font-black uppercase text-gray-600 tracking-[0.4em]">Advanced AI Engineering & Systems</p>
          </div>
          
          <div className="flex justify-center gap-12 mb-10">
            <Link to={ROUTES.legal} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Termos de Uso</Link>
            <Link to={ROUTES.legal} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Política de Privacidade</Link>
            <a href="mailto:jader@jpglabs.com.br" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Contato</a>
          </div>

          <p className="text-gray-700 text-[9px] uppercase tracking-[0.5em] font-black">
            &copy; 2026 JPGLabs • MADE BY JADER GERMANO
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
