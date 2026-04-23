import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, Clock3, LogOut } from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import {
  SESSION_TIMEOUT_SECONDS,
  SESSION_WARNING_SECONDS,
  buildLoginRedirectUrl,
  getSessionTimeoutState,
} from "../lib/auth-shared";

const ACTIVITY_EVENTS = ["click", "keydown", "mousemove", "scroll", "touchstart"] as const;
const SESSION_REFRESH_MS = 60_000;

export default function SessionTimeoutManager() {
  const { dictionary } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [countdownSeconds, setCountdownSeconds] = useState(SESSION_WARNING_SECONDS);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const lastActivityRef = useRef(Date.now());
  const lastRefreshRef = useRef(Date.now());
  const logoutInFlightRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsWarningVisible(false);
      setCountdownSeconds(SESSION_WARNING_SECONDS);
      logoutInFlightRef.current = false;
      return;
    }

    const refreshSession = async () => {
      const now = Date.now();

      if (now - lastRefreshRef.current < SESSION_REFRESH_MS) {
        return;
      }

      lastRefreshRef.current = now;
      // Touch the Supabase client so it can refresh the JWT if needed
      await supabase.auth.getSession();
    };

    const markActivity = () => {
      lastActivityRef.current = Date.now();
      setIsWarningVisible(false);
      void refreshSession();
    };

    lastActivityRef.current = Date.now();
    lastRefreshRef.current = Date.now();
    logoutInFlightRef.current = false;

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, markActivity, { passive: true });
    });

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        markActivity();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    const interval = window.setInterval(() => {
      const snapshot = getSessionTimeoutState(lastActivityRef.current, Date.now());

      if (snapshot.isExpired && !logoutInFlightRef.current) {
        logoutInFlightRef.current = true;
        void logout().then(() => {
          navigate(buildLoginRedirectUrl(pathname, "expired"), { replace: true });
        });
        return;
      }

      setCountdownSeconds(snapshot.countdownSeconds);
      setIsWarningVisible(snapshot.shouldWarn);
    }, 1_000);

    return () => {
      window.clearInterval(interval);
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, markActivity);
      });
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isAuthenticated, logout, navigate, pathname]);

  if (!isAuthenticated || !isWarningVisible) {
    return null;
  }

  const handleStaySignedIn = () => {
    lastActivityRef.current = Date.now();
    setIsWarningVisible(false);
    void supabase.auth.getSession();
  };

  const handleSignOut = () => {
    if (logoutInFlightRef.current) {
      return;
    }

    logoutInFlightRef.current = true;
    void logout().then(() => {
      navigate(buildLoginRedirectUrl(pathname), { replace: true });
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-6 backdrop-blur-md">
      <div className="w-full max-w-md rounded-[32px] border border-red-500/20 bg-[#0a0d13] p-8 text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-red-400">{dictionary.sessionWarning.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              {dictionary.sessionWarning.title.replace("{seconds}", String(countdownSeconds))}
            </h2>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-gray-400">
          {dictionary.sessionWarning.body.replace("5", String(SESSION_TIMEOUT_SECONDS / 60))}
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs uppercase tracking-[0.24em] text-gray-500">
          <div className="flex items-center gap-2">
            <Clock3 size={14} className="text-red-400" />
            {dictionary.sessionWarning.badge}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleStaySignedIn}
            className="flex-1 rounded-2xl bg-white px-5 py-4 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:bg-gray-200"
          >
            {dictionary.sessionWarning.stay}
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-xs font-black uppercase tracking-[0.26em] text-gray-300 transition-all hover:border-red-500/40 hover:text-red-400"
          >
            <LogOut size={14} />
            {dictionary.sessionWarning.logout}
          </button>
        </div>
      </div>
    </div>
  );
}
