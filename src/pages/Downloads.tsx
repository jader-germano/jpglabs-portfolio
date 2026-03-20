import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, FileText, Lock, CheckCircle, Package,
  Upload, Loader2, Sparkles, AlertTriangle, X,
  User, Briefcase, Code2, ChevronDown, ChevronUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildProductRoute } from '../config/routes';
import { canDownloadProduct, PRODUCT_CATALOG } from '../data/products';
import { useAuth } from '../context/AuthContext';

/* ─── CV Analyser ─────────────────────────────────────────────────────────── */

type AnalysisStatus = 'idle' | 'uploading' | 'done' | 'error';

interface CVResult {
  summary?: string;
  skills?: string[];
  experiences?: { title: string; company: string; period: string }[];
  projects?: { name: string; description: string }[];
  fitScore?: number;
  recommendations?: string[];
}

function CVAnalyser() {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<CVResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const reset = () => {
    setStatus('idle');
    setFileName(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFile = useCallback(async (file: File) => {
    if (!file) return;
    const validTypes = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError('Formato inválido. Envie PDF ou DOCX.');
      setStatus('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Arquivo muito grande. Limite: 10MB.');
      setStatus('error');
      return;
    }

    setFileName(file.name);
    setStatus('uploading');
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      form.append('file', file);

      // Calls the existing Next.js BFF endpoint
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000'}/api/resume/parse`,
        { method: 'POST', body: form }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `HTTP ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
      setStatus('done');
      setExpanded(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Falha ao processar CV. Tente novamente.');
      setStatus('error');
    }
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="rounded-[32px] border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm p-8 mb-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">
              AI-Powered — Beta
            </span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            CV <span className="text-blue-500 italic">Analysis</span>
          </h2>
          <p className="text-gray-500 text-[11px] mt-1 font-bold uppercase tracking-widest">
            Envie seu currículo · Receba análise de skills, experiências e fit score
          </p>
        </div>
        {user?.role && (
          <span className="text-[9px] font-black uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
            Acesso liberado
          </span>
        )}
      </div>

      {/* Drop Zone */}
      {status === 'idle' || status === 'error' ? (
        <div
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-white/10 hover:border-blue-500/40 rounded-2xl p-10 flex flex-col items-center gap-4 cursor-pointer transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-blue-500/10 flex items-center justify-center transition-all">
            <Upload size={24} className="text-gray-500 group-hover:text-blue-400 transition-all" />
          </div>
          <div className="text-center">
            <p className="text-white font-black text-sm uppercase tracking-widest">
              Arraste seu CV ou clique para selecionar
            </p>
            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-1">
              PDF ou DOCX · Máximo 10MB
            </p>
          </div>
          {status === 'error' && error && (
            <div className="flex items-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-widest">
              <AlertTriangle size={12} /> {error}
            </div>
          )}
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={onInputChange}
      />

      {/* Uploading State */}
      {status === 'uploading' && (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col items-center gap-4">
          <Loader2 size={32} className="animate-spin text-blue-400" />
          <div className="text-center">
            <p className="text-white font-black text-sm uppercase tracking-widest">
              Analisando com IA local...
            </p>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              {fileName} · Ollama processando
            </p>
          </div>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {status === 'done' && result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-white font-black text-sm uppercase tracking-widest">
                  Análise Concluída
                </span>
                <span className="text-gray-500 text-[10px] font-bold">— {fileName}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpanded(v => !v)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                >
                  {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <button
                  onClick={reset}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Fit Score */}
            {result.fitScore !== undefined && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex items-center gap-6">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <circle
                      cx="30" cy="30" r="25" fill="none"
                      stroke={result.fitScore >= 70 ? '#22c55e' : result.fitScore >= 40 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="6"
                      strokeDasharray={`${(result.fitScore / 100) * 157} 157`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-white font-black text-sm">
                    {result.fitScore}
                  </span>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Fit Score</p>
                  <p className="text-white font-black text-lg uppercase tracking-tight">
                    {result.fitScore >= 70 ? 'Strong Match' : result.fitScore >= 40 ? 'Partial Match' : 'Needs Work'}
                  </p>
                  <p className="text-gray-500 text-[10px] font-bold mt-0.5 uppercase tracking-widest">
                    vs. perfil JPGLabs · Java · Spring · Angular · AI
                  </p>
                </div>
              </div>
            )}

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  {/* Summary */}
                  {result.summary && (
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3">Resumo</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Skills */}
                    {result.skills && result.skills.length > 0 && (
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Code2 size={12} className="text-blue-400" />
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Skills Detectadas</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {result.skills.map(s => (
                            <span key={s} className="px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experiences */}
                    {result.experiences && result.experiences.length > 0 && (
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase size={12} className="text-purple-400" />
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Experiências</p>
                        </div>
                        <div className="space-y-2">
                          {result.experiences.slice(0, 3).map((e, i) => (
                            <div key={i} className="text-xs">
                              <p className="text-white font-black uppercase tracking-tight">{e.title}</p>
                              <p className="text-gray-500 font-bold">{e.company} · {e.period}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recommendations */}
                  {result.recommendations && result.recommendations.length > 0 && (
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <User size={12} className="text-green-400" />
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Recomendações</p>
                      </div>
                      <ul className="space-y-2">
                        {result.recommendations.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                            <span className="text-green-400 mt-0.5 flex-shrink-0">→</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer note */}
      {status === 'idle' && (
        <p className="text-gray-700 text-[9px] font-black uppercase tracking-[0.3em] mt-4 text-center">
          Processado localmente via Ollama · Dados não armazenados permanentemente
        </p>
      )}
    </div>
  );
}

/* ─── Main Downloads Page ─────────────────────────────────────────────────── */

const Downloads: React.FC = () => {
  const { user, isPrimeOwner, isSubOwner } = useAuth();
  const isCommercial = isPrimeOwner || isSubOwner ||
    user?.role === 'ADMIN' || user?.role === 'USER_CONSULTANT';

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          Product <span className="text-blue-500 italic">Library</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">
          Controlled access by purchase with consultation and PDF download
        </p>
      </div>

      {/* CV Analyser — always show for commercial users */}
      {isCommercial && <CVAnalyser />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCT_CATALOG.map((product) => {
          const hasDownloadAccess = canDownloadProduct(product, user?.role);

          return (
            <motion.article
              key={product.id}
              whileHover={{ y: -5 }}
              className={`rounded-[32px] border ${
                hasDownloadAccess ? 'border-white/10 bg-[#111214]/50' : 'border-white/5 bg-black/20'
              } p-8 backdrop-blur-sm relative overflow-hidden flex flex-col`}
            >
              {!hasDownloadAccess && (
                <div className="absolute top-4 right-4 bg-black/60 border border-white/10 text-white px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest flex items-center gap-1">
                  <Lock size={10} /> Restricted
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl ${
                    hasDownloadAccess ? 'bg-blue-600' : 'bg-white/5'
                  } flex items-center justify-center text-white`}
                >
                  <Package size={24} />
                </div>
                {hasDownloadAccess && <CheckCircle size={20} className="text-green-500" />}
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">{product.headline}</p>
              <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-6 font-light leading-relaxed">{product.summary}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black text-gray-400 uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto space-y-3">
                <Link
                  to={buildProductRoute(product.slug)}
                  className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                >
                  <FileText size={14} /> Consult Product
                </Link>

                {hasDownloadAccess ? (
                  <a
                    href={product.pdfUrl}
                    className="w-full py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                  >
                    <Download size={14} /> Download PDF
                  </a>
                ) : (
                  <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-500 transition-all">
                    Upgrade Access — R$ {product.price},00
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};

export default Downloads;
