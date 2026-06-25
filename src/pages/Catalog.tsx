import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Filter, Search } from 'lucide-react';
import { mockCategories, mockBrands } from '@/data/mock';
import { getProducts } from '@/stores/productStore';
import { useCart } from '@/contexts/CartContext';

export default function Catalog() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const products = getProducts();
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--bg-page)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Breadcrumb */}
        <div className="mb-10 lg:mb-16">
          <div className="text-sm font-bold tracking-widest text-[var(--text-disabled)] uppercase mb-4">
            <Link to="/" className="text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors">Home</Link>
            <span className="mx-2 text-[var(--text-disabled)]">&gt;</span>
            <span className="text-[var(--text-primary)]">Catálogo Completo</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Nosso Catálogo</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-[var(--bg-surface)] rounded-[2rem] p-8 shadow-[var(--shadow-card)] border border-[var(--border-default)]">
              <div className="flex items-center gap-3 font-bold text-xl mb-8 uppercase tracking-widest text-[#1E293B] border-b border-[var(--border-default)] pb-4">
                <Filter className="h-6 w-6" /> Filtros
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-[#1E293B] mb-4 uppercase tracking-widest text-sm">Categorias</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className={`font-medium transition-colors ${!selectedCategory ? 'text-[var(--brand-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--brand-primary)]'}`}
                    >
                      Todas as Categorias
                    </button>
                  </li>
                  {mockCategories.map(cat => (
                    <li key={cat.id}>
                      <button 
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`font-medium transition-colors ${selectedCategory === cat.id ? 'text-[var(--brand-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--brand-primary)]'}`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-4 uppercase tracking-widest text-sm">Marcas Top</h3>
                <ul className="space-y-3">
                  {mockBrands.map(brand => (
                    <li key={brand.id}>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-[var(--border-default)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)] cursor-pointer" />
                        <span className="font-medium text-[var(--text-secondary)] group-hover:text-[var(--brand-primary)] transition-colors">{brand.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--bg-surface)] p-4 rounded-2xl shadow-sm border border-[var(--border-default)]">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-5 w-5" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar produtos, SKU..." 
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[#CBD5E1] font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all"
                />
              </div>
              <div className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-sm">
                Mostrando {filteredProducts.length} produtos
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-[var(--bg-surface)] rounded-[2rem] overflow-hidden shadow-[var(--shadow-card)] border border-[var(--border-default)] hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] transition-all duration-300 flex flex-col">
                  <Link to={`/produtos/${p.id}`} className="block relative h-64 overflow-hidden group">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {p.promotionalPrice && (
                      <div className="absolute top-4 left-4 bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[10px] font-black px-3 py-1.5 rounded-lg tracking-widest shadow-sm uppercase">
                        OFERTA
                      </div>
                    )}
                  </Link>
                  <div className="p-8 flex flex-col flex-grow">
                    <Link to={`/produtos/${p.id}`} className="font-bold text-xl mb-4 text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors leading-tight">
                      {p.name}
                    </Link>
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-6">
                        <div className="font-display font-black text-3xl text-[var(--text-primary)] tracking-tighter">
                          R$ {(p.promotionalPrice || p.price).toFixed(2).replace('.', ',')}
                        </div>
                        {p.promotionalPrice && (
                          <div className="text-[var(--text-muted)] text-sm line-through font-bold">
                            R$ {p.price.toFixed(2).replace('.', ',')}
                          </div>
                        )}
                      </div>
                      <button onClick={() => addToCart(p, 1)} className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md uppercase tracking-widest text-sm">
                        <ShoppingCart className="h-5 w-5" /> ADICIONAR
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500 font-bold text-xl">
                  Nenhum produto encontrado.
                </div>
              )}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
