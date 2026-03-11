import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Lock, Package, ShieldCheck } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { canDownloadProduct, getProductBySlug, PRODUCT_CATALOG } from '../data/products';
import { useAuth } from '../context/AuthContext';

interface ProductDetailProps {
  slug: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ slug }) => {
  const { user } = useAuth();
  const product = getProductBySlug(slug);

  if (!product) {
    return <Navigate to={ROUTES.downloads} replace />;
  }

  const hasDownloadAccess = canDownloadProduct(product, user?.role);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        to={ROUTES.downloads}
        className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all"
      >
        Back to Downloads
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-6">
            <Package size={24} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3">{product.headline}</p>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">{product.name}</h1>
          <p className="text-gray-500 leading-relaxed mb-6">{product.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-gray-400 uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="rounded-2xl border border-white/5 bg-black/30 p-5">
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-3">Consultation Notes</p>
            <ul className="space-y-2">
              {product.detailHighlights.map((highlight) => (
                <li key={highlight} className="text-sm text-gray-300 flex items-start gap-2">
                  <ShieldCheck size={14} className="text-blue-500 mt-0.5" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-[32px] border border-white/5 bg-[#111214]/50 p-8 backdrop-blur-sm flex flex-col"
        >
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-6">Access and Deliverables</h2>

          <div className="space-y-3 mb-8">
            {product.features.map((feature) => (
              <div key={feature} className="px-4 py-3 rounded-xl bg-black/40 border border-white/5 text-sm text-gray-300">
                {feature}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/5 bg-black/30 p-5 mb-8">
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">Current Access Level</p>
            <p className="text-sm text-gray-300 mt-2">
              {hasDownloadAccess
                ? 'Download and consultation enabled for your role.'
                : 'Consultation enabled. PDF download is restricted to purchased access.'}
            </p>
          </div>

          <div className="mt-auto space-y-3">
            <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <FileText size={14} /> Consult Product
            </button>

            {hasDownloadAccess ? (
              <a
                href={product.pdfUrl}
                className="w-full py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
              >
                <Download size={14} /> Download PDF
              </a>
            ) : (
              <button
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                type="button"
              >
                <Lock size={14} /> Upgrade Access - R$ {product.price},00
              </button>
            )}
          </div>
        </motion.section>
      </div>

      <section className="mt-12">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4">Other Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCT_CATALOG.filter((item) => item.slug !== slug).map((item) => (
            <Link
              key={item.id}
              to={`${ROUTES.downloads}/${item.slug}`}
              className="rounded-2xl border border-white/5 bg-black/30 p-4 hover:border-blue-500/40 transition-all"
            >
              <p className="text-sm font-black text-white uppercase tracking-tight">{item.name}</p>
              <p className="text-xs text-gray-500 mt-1">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
