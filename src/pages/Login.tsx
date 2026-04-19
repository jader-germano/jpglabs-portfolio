import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Chrome, Apple, ShieldAlert, LogIn } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../config/routes';
import { CartesianBackground } from '../components/CartesianBackground';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'github' | 'google' | 'apple' | null>(null);

  const { login, loginWithOAuth } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || ROUTES.root;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate(callbackUrl);
      } else {
        setError('Credenciais inválidas ou acesso pendente de aprovação.');
      }
    } catch {
      setError('Ocorreu um erro ao tentar entrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CartesianBackground intensity="accent" />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 selection:bg-accent/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-surface/80 border border-border-subtle rounded-[40px] p-10 backdrop-blur-xl shadow-2xl">
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6"
              >
                <LogIn size={32} />
              </motion.div>
              <h1 className="text-3xl font-display font-black uppercase tracking-tight text-text">Acesso Restrito</h1>
              <p className="text-text-faint text-sm mt-2 uppercase tracking-widest font-bold">JPG Labs OS</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-2xl px-6 py-4 text-text placeholder:text-text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-2xl px-6 py-4 text-text placeholder:text-text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-center gap-3 text-sm"
                >
                  <ShieldAlert size={18} />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl hover:bg-accent-deep transition-colors disabled:opacity-50"
              >
                {loading ? 'Validando...' : 'Entrar'}
              </button>
            </form>

            <div className="relative my-10 text-center">
              <span className="bg-surface px-4 text-text-faint text-[10px] font-black uppercase tracking-widest relative z-10">Ou continue com</span>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border-subtle"></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                disabled={oauthLoading !== null}
                onClick={async () => {
                  setError('');
                  setOauthLoading('github');
                  try { await loginWithOAuth('github'); } catch { setError('Falha ao iniciar login com GitHub.'); setOauthLoading(null); }
                }}
                className="flex items-center justify-center gap-2 bg-surface border border-border-subtle py-4 rounded-2xl hover:border-accent/50 hover:text-accent text-text-dim transition-colors group disabled:opacity-50"
              >
                <Github size={18} className="group-hover:text-accent transition-colors" />
                <span className="text-[10px] font-black uppercase group-hover:text-accent">{oauthLoading === 'github' ? '...' : 'GitHub'}</span>
              </button>
              <button
                type="button"
                disabled={oauthLoading !== null}
                onClick={async () => {
                  setError('');
                  setOauthLoading('google');
                  try { await loginWithOAuth('google'); } catch { setError('Falha ao iniciar login com Google.'); setOauthLoading(null); }
                }}
                className="flex items-center justify-center gap-2 bg-surface border border-border-subtle py-4 rounded-2xl hover:border-accent/50 hover:text-accent text-text-dim transition-colors group disabled:opacity-50"
              >
                <Chrome size={18} className="group-hover:text-accent transition-colors" />
                <span className="text-[10px] font-black uppercase group-hover:text-accent">{oauthLoading === 'google' ? '...' : 'Google'}</span>
              </button>
              <button
                type="button"
                disabled={oauthLoading !== null}
                onClick={async () => {
                  setError('');
                  setOauthLoading('apple');
                  try { await loginWithOAuth('apple'); } catch { setError('Falha ao iniciar login com Apple.'); setOauthLoading(null); }
                }}
                className="flex items-center justify-center gap-2 bg-surface border border-border-subtle py-4 rounded-2xl hover:border-accent/50 hover:text-accent text-text-dim transition-colors group disabled:opacity-50"
              >
                <Apple size={18} className="group-hover:text-accent transition-colors" />
                <span className="text-[10px] font-black uppercase group-hover:text-accent">{oauthLoading === 'apple' ? '...' : 'Apple'}</span>
              </button>
            </div>

            <div className="mt-12 text-center">
              {/* Nova Logo Placeholder */}
              <div className="flex justify-center mb-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="text-2xl font-black tracking-tighter text-text">
                  JPG<span className="text-accent">LABS</span>
                </div>
              </div>

              <div className="flex justify-center gap-6">
                <a href="/legal" className="text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-text transition-colors">Termos</a>
                <a href="/legal" className="text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-text transition-colors">Privacidade</a>
              </div>
              <p className="mt-6 text-[9px] text-text-faint uppercase tracking-widest font-medium">© 2026 Jader Philipe Germano. Todos os direitos reservados.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
