import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Chrome, ShieldAlert, LogIn } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../config/routes';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
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
    <div className="min-h-screen bg-[#08090a] flex items-center justify-center px-6 selection:bg-blue-500/30">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#101215]/80 border border-white/8 rounded-[40px] p-10 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 mb-6"
            >
              <LogIn size={32} />
            </motion.div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Acesso Restrito</h1>
            <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">JPG Labs OS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
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
              className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-4 rounded-2xl hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {loading ? 'Validando...' : 'Entrar'}
            </button>
          </form>

          <div className="relative my-10 text-center">
            <span className="bg-[#101215] px-4 text-gray-600 text-[10px] font-black uppercase tracking-widest relative z-10">Ou continue com</span>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-black/40 border border-white/5 py-4 rounded-2xl hover:bg-white/5 transition-all group">
              <Github size={20} className="text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-xs font-black uppercase text-gray-400 group-hover:text-white">GitHub</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-black/40 border border-white/5 py-4 rounded-2xl hover:bg-white/5 transition-all group">
              <Chrome size={20} className="text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-xs font-black uppercase text-gray-400 group-hover:text-white">Google</span>
            </button>
          </div>

          <div className="mt-12 text-center">
            {/* Nova Logo Placeholder */}
            <div className="flex justify-center mb-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-2xl font-black tracking-tighter text-white">
                JPG<span className="text-blue-500">LABS</span>
              </div>
            </div>

            <div className="flex justify-center gap-6">
              <a href="/legal" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Termos</a>
              <a href="/legal" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Privacidade</a>
            </div>
            <p className="mt-6 text-[9px] text-gray-700 uppercase tracking-widest font-medium">© 2026 Jader Philipe Germano. Todos os direitos reservados.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
