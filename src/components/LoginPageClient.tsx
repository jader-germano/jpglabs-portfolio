import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Globe, Loader2, Mail, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";
import { useAuth } from "../context/AuthContext";
import {
  DEFAULT_AUTHENTICATED_ROUTE,
  PRIVACY_ROUTE,
  TERMS_ROUTE,
} from "../lib/auth-shared";

// Supabase-backed replacements for NextAuth's getProviders(): the Vite SPA
// always exposes the same three auth paths, so the provider list is static.
const OAUTH_PROVIDERS: Array<{ id: "github" | "google"; label: "github" | "google" }> = [
  { id: "github", label: "github" },
  { id: "google", label: "google" },
];
const CAN_USE_EMAIL_LOGIN = true;

export default function LoginPageClient() {
  const { dictionary, locale } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, login, loginWithOAuth } = useAuth();
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingProvider, setPendingProvider] = useState<string | null>(null);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_AUTHENTICATED_ROUTE;
  const isExpiredSession = searchParams.get("reason") === "expired";
  const authError = searchParams.get("error");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(callbackUrl, { replace: true });
    }
  }, [callbackUrl, isAuthenticated, navigate]);

  const handleOAuthSignIn = async (providerId: "github" | "google") => {
    setError("");
    setPendingProvider(providerId);
    try {
      await loginWithOAuth(providerId);
      // loginWithOAuth redirects the browser; no cleanup needed
    } catch {
      setError(dictionary.login.emailError);
      setPendingProvider(null);
    }
  };

  const handleEmailSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmittingEmail(true);

    const ok = await login(email, password);
    if (!ok) {
      setError(dictionary.login.emailError);
      setIsSubmittingEmail(false);
      return;
    }

    navigate(callbackUrl, { replace: true });
  };

  const statusMessage = (() => {
    if (isExpiredSession) {
      return dictionary.login.expired;
    }

    if (authError === "CredentialsSignin") {
      return dictionary.login.credentialsError;
    }

    if (authError === "AccessDenied") {
      return dictionary.login.accessDenied;
    }

    return "";
  })();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-8 relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08),transparent_50%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-12 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-xl relative z-10 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto mb-8">
          <ShieldCheck className="text-red-500" size={32} />
        </div>

        <h1 className="text-3xl font-black tracking-tighter mb-2">{dictionary.login.title}</h1>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-12">
          {dictionary.login.subtitle}
        </p>

        {statusMessage ? (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-left text-xs leading-relaxed text-red-100">
            {statusMessage}
          </div>
        ) : null}

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-left text-xs leading-relaxed text-red-200">
            {error}
          </div>
        ) : null}

        <div className="space-y-4">
          {OAUTH_PROVIDERS.map((provider) => {
            const isGithub = provider.id === "github";
            const isPending = pendingProvider === provider.id;
            const Icon = isGithub ? Github : Globe;

            return (
              <button
                key={provider.id}
                type="button"
                onClick={() => void handleOAuthSignIn(provider.id)}
                disabled={isPending}
                className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all ${
                  isGithub
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {isPending ? <Loader2 size={18} className="animate-spin" /> : <Icon size={18} />}
                {isGithub ? dictionary.login.github : dictionary.login.google}
              </button>
            );
          })}

          {CAN_USE_EMAIL_LOGIN ? (
            <button
              type="button"
              onClick={() => {
                setError("");
                setIsEmailOpen((current) => !current);
              }}
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              <Mail size={18} />
              {dictionary.login.emailToggle}
            </button>
          ) : null}
        </div>

        {isEmailOpen ? (
          <form onSubmit={handleEmailSignIn} className="mt-5 space-y-3 text-left">
            <label className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{dictionary.login.emailLabel}</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-2xl border border-white/10 bg-[#0a0d13] px-4 py-3 text-sm text-white outline-none transition-all focus:border-red-500/40"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{dictionary.login.passwordLabel}</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/10 bg-[#0a0d13] px-4 py-3 text-sm text-white outline-none transition-all focus:border-red-500/40"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmittingEmail}
              className="w-full rounded-2xl bg-red-600 px-4 py-4 text-xs font-black uppercase tracking-[0.28em] text-white transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmittingEmail ? dictionary.login.emailSubmitting : dictionary.login.emailSubmit}
            </button>
          </form>
        ) : null}

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-all hover:border-red-500/30 hover:bg-white/[0.05]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-base font-black italic text-white shadow-[0_0_20px_rgba(220,38,38,0.25)]">
            J
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-gray-500">{dictionary.login.brandTitle}</p>
            <p className="mt-1 text-xs text-gray-400">{dictionary.login.brandSubtitle}</p>
          </div>
        </Link>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex rounded-[24px] border border-white/10 bg-black/30 p-2 transition-all hover:border-red-500/30 hover:bg-white/[0.03]"
          >
            <img
              src="/jpg-labs-wordmark.svg"
              alt={locale === "pt" ? "Logo da JPG Labs" : "JPG Labs logo"}
              width={280}
              height={63}
            />
          </Link>
        </div>

        <p className="mt-8 text-[10px] text-gray-600 font-mono leading-relaxed">
          {dictionary.login.legalPrefix} <br />
          <Link to={TERMS_ROUTE} className="text-gray-400 underline underline-offset-4 transition-colors hover:text-white">
            {dictionary.login.terms}
          </Link>{" "}
          {locale === "pt" ? "e" : "and"}{" "}
          <Link to={PRIVACY_ROUTE} className="text-gray-400 underline underline-offset-4 transition-colors hover:text-white">
            {dictionary.login.privacy}
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}
