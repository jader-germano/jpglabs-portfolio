import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Lock, CheckCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildProductRoute } from '../config/routes';
import { canDownloadProduct, PRODUCT_CATALOG } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { CartesianBackground } from '../components/CartesianBackground';

const Downloads: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <CartesianBackground intensity="ambient" />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="font-display text-4xl font-black text-white uppercase tracking-tighter">
              Product <span className="text-accent italic">Library</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">
              Controlled access by purchase with consultation and PDF download
            </p>
          </div>

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
                        hasDownloadAccess ? 'bg-accent' : 'bg-white/5'
                      } flex items-center justify-center text-white`}
                    >
                      <Package size={24} />
                    </div>
                    {hasDownloadAccess && <CheckCircle size={20} className="text-green-500" />}
                  </div>

                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-2">{product.headline}</p>
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
                      <button className="w-full py-4 bg-accent text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-accent/80 transition-all">
                        Upgrade Access - R$ {product.price},00
                      </button>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Downloads;
