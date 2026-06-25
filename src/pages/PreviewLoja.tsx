import React, { useState } from 'react';
import { ShoppingCart, Star, Search, Filter, ArrowRight, Heart } from 'lucide-react';
import { lojaProducts } from '@/data/lojaEletricaMock';

export default function PreviewLoja() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = lojaProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      {/* Header Temporário */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center">
          <div className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6">
            Preview Temporário
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-tighter mb-4">
            CATÁLOGO <span className="text-blue-500">IMPORTADO</span>
          </h1>
          <p className="text-white/70 font-medium max-w-xl mx-auto mb-8">
            Visualização dos produtos extraídos do arquivo HTML (Loja Elétrica) aplicando a identidade visual e o design system da nova loja HLT.
          </p>

          <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Buscar produtos importados..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium backdrop-blur-md transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 mt-6 sm:mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            Produtos ({filteredProducts.length})
          </h2>
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Filter className="h-4 w-4" /> Filtros
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((p, idx) => (
            <div key={idx} className="group flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/* Imagem do Produto */}
              <div className="relative aspect-square bg-white p-3 sm:p-6 overflow-hidden flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                {p.oldPrice > p.price && (
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded sm:rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm">
                    -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                  </div>
                )}
                <button className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-white/80 backdrop-blur text-gray-400 hover:text-red-500 hover:bg-white shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Detalhes */}
              <div className="p-3 sm:p-5 flex flex-col flex-1 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-yellow-400 mb-2 sm:mb-3">
                  <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
                  <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
                  <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
                  <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
                  <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current text-slate-200 dark:text-slate-600" />
                  <span className="text-slate-500 dark:text-slate-400 font-bold ml-1 text-[9px] sm:text-[10px]">(0)</span>
                </div>
                
                <h3 className="font-sans font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug mb-3 sm:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {p.name}
                </h3>
                
                <div className="mt-auto">
                  {p.oldPrice > p.price && (
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 line-through font-bold mb-0.5 sm:mb-1">
                      R$ {p.oldPrice.toFixed(2).replace('.', ',')}
                    </div>
                  )}
                  <div className="flex items-end justify-between gap-1">
                    <div className="font-display font-black text-lg sm:text-2xl text-slate-900 dark:text-white tracking-tighter">
                      R$ {p.price.toFixed(2).replace('.', ',')}
                    </div>
                    <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
