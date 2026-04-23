import { Link, useLocation, useNavigate } from "react-router-dom";
import { Linkedin, Github, LogOut } from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";
import { useAuth } from "../context/AuthContext";
import { LOGIN_ROUTE } from "../lib/auth-shared";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "login", href: LOGIN_ROUTE, guestOnly: true },
  { key: "assistant", href: "/dashboard/assistant" },
  { key: "instances", href: "/dashboard/instances" },
  { key: "guardian", href: "/dashboard/guardian" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { locale, setLocale, dictionary } = useLanguage();
  const visibleItems = NAV_ITEMS.filter((item) => !item.guestOnly || !isAuthenticated);
  const accessName = user?.name || user?.email || dictionary.nav.authenticatedUser;

  const handleLogout = async () => {
    await logout();
    navigate(LOGIN_ROUTE);
  };

  const activeStyle = {
    borderColor: "var(--accent-deep)",
    background: "var(--accent-soft)",
    color: "#fff",
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-4 pt-4 md:px-6 md:pt-6 pointer-events-none">
      <div
        className="pointer-events-auto max-w-7xl mx-auto rounded-[28px] px-4 py-4 backdrop-blur-xl"
        style={{
          border: "1px solid var(--border-strong)",
          background: "rgba(13,13,13,0.72)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{ background: "var(--bg-elev-2)", border: "1px solid var(--border-strong)" }}
            >
              <span className="font-display font-bold italic text-white text-lg">J</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] transition-colors"
              style={{ color: "var(--text-faint)" }}>
              JPG<em className="not-italic" style={{ color: "var(--accent)" }}>LABS</em>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center justify-center gap-2 flex-1 px-6">
            {visibleItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-full px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] transition-all"
                  style={isActive ? activeStyle : {
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-dim)",
                  }}
                >
                  {dictionary.nav.items[item.key as keyof typeof dictionary.nav.items]}
                </Link>
              );
            })}
          </div>

          {/* Right — auth + social + locale */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {isAuthenticated ? (
              <div
                className="hidden items-center gap-3 rounded-full px-3 py-2 md:flex"
                style={{ border: "1px solid var(--border)", background: "var(--bg-elev-1)" }}
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.24em]" style={{ color: "var(--text-dim)" }}>
                  {accessName}
                </span>
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] transition-all"
                  style={{ border: "1px solid var(--border)", color: "var(--text-dim)" }}
                >
                  <LogOut size={12} />
                  {dictionary.nav.logout}
                </button>
              </div>
            ) : null}

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/jader-phelipe/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full transition-all"
                style={{ background: "var(--bg-elev-2)", border: "1px solid var(--border-strong)" }}
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com/jader-germano"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full transition-all"
                style={{ background: "var(--bg-elev-2)", border: "1px solid var(--border-strong)" }}
              >
                <Github size={16} />
              </a>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[8px] font-mono uppercase tracking-[0.28em]" style={{ color: "var(--text-faint)" }}>
                {dictionary.nav.language}
              </span>
              <div className="flex items-center gap-2">
                {(["en", "pt"] as const).map((option) => {
                  const isActive = locale === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setLocale(option)}
                      aria-pressed={isActive}
                      aria-label={dictionary.nav.localeOptions[option]}
                      className="rounded-full px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.2em] transition-all"
                      style={isActive ? activeStyle : {
                        border: "1px solid var(--border)",
                        background: "transparent",
                        color: "var(--text-dim)",
                      }}
                    >
                      {dictionary.nav.localeOptions[option]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile nav row */}
        <div className="mt-4 overflow-x-auto lg:hidden">
          <div className="flex min-w-max gap-2 pr-1">
            {visibleItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={`${item.href}-mobile`}
                  to={item.href}
                  className="rounded-full px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] transition-all whitespace-nowrap"
                  style={isActive ? activeStyle : {
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-dim)",
                  }}
                >
                  {dictionary.nav.items[item.key as keyof typeof dictionary.nav.items]}
                </Link>
              );
            })}
          </div>
        </div>

        {isAuthenticated ? (
          <div
            className="mt-4 flex items-center justify-between gap-3 pt-4 md:hidden"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.24em]" style={{ color: "var(--text-dim)" }}>
              {accessName}
            </span>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] transition-all"
              style={{ border: "1px solid var(--border)", color: "var(--text-dim)" }}
            >
              <LogOut size={12} />
              {dictionary.nav.logout}
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
