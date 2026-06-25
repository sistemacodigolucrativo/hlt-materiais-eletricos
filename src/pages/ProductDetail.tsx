import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockBrands, mockCategories } from '@/data/mock';
import { getProducts } from '@/stores/productStore';
import { ShoppingCart, CheckCircle2, ChevronRight, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const products = getProducts();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center text-2xl font-black uppercase">
        <div className="text-center">
          <div className="mb-4">Produto não encontrado</div>
          <Link to="/produtos" className="text-[var(--c-primary)] hover:underline flex items-center justify-center gap-2 text-lg">
            <ArrowLeft className="h-5 w-5" /> Voltar ao Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const brand = mockBrands.find(b => b.id === product.brandId);
  const category = mockCategories.find(c => c.id === product.categoryId);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--c-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-xs font-black tracking-widest text-gray-400 uppercase mb-12 flex-wrap">
          <Link to="/" className="hover:text-[var(--c-primary)] transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/produtos" className="hover:text-[var(--c-primary)] transition-colors">Catálogo</Link>
          {category && (
            <>
              <ChevronRight className="h-4 w-4" />
              <Link to={`/produtos?cat=${category.id}`} className="hover:text-[var(--c-primary)] transition-colors">{category.name}</Link>
            </>
          )}
          <ChevronRight className="h-4 w-4" />
          <span className="text-[var(--c-text)] truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          
          {/* Images */}
          <div className="space-y-6">
            <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-black/5 aspect-square relative overflow-hidden group">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="inline-block bg-[var(--c-primary)]/10 text-[var(--c-primary)] px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-6">
              {brand?.name || 'Marca Desconhecida'}
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-black text-[var(--c-text)] leading-tight mb-6">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <span>SKU: {product.sku}</span>
              <span className="flex items-center gap-2 text-[#22C55E]">
                <CheckCircle2 className="h-5 w-5" /> Em Estoque ({product.stock})
              </span>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-black/5 mb-10">
              <div className="flex items-end gap-4 mb-8">
                <div className="font-display font-black text-6xl text-[var(--c-text)] tracking-tighter">
                  R$ {(product.promotionalPrice || product.price).toFixed(2).replace('.', ',')}
                </div>
                {product.promotionalPrice && (
                  <div className="text-gray-400 text-2xl line-through font-bold pb-2">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center justify-between border-2 border-gray-200 rounded-2xl px-6 py-4 w-full sm:w-48 bg-gray-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[var(--c-text)] font-black text-2xl hover:text-[var(--c-primary)]"
                  >-</button>
                  <span className="font-black text-xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[var(--c-text)] font-black text-2xl hover:text-[var(--c-primary)]"
                  >+</button>
                </div>
                
                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-[var(--c-primary)] hover:bg-[var(--c-hover)] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl uppercase tracking-widest text-lg"
                >
                  <ShoppingCart className="h-6 w-6" /> COMPRAR AGORA
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-blue-50 text-blue-900 p-6 rounded-2xl flex items-start gap-4">
                <Truck className="h-8 w-8 shrink-0 text-blue-600" />
                <div>
                  <div className="font-black text-sm uppercase tracking-widest mb-1">Entrega Rápida</div>
                  <div className="text-sm font-medium">Calcule o prazo no checkout.</div>
                </div>
              </div>
              <div className="bg-green-50 text-green-900 p-6 rounded-2xl flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 shrink-0 text-green-600" />
                <div>
                  <div className="font-black text-sm uppercase tracking-widest mb-1">Garantia</div>
                  <div className="text-sm font-medium">Produto original de fábrica.</div>
                </div>
              </div>
            </div>

            {/* Description & Attributes */}
            <div>
              <h2 className="font-display text-2xl font-black mb-6 uppercase tracking-widest border-b-2 border-gray-100 pb-4">Descrição do Produto</h2>
              <p className="text-gray-600 text-lg leading-relaxed font-medium mb-10">
                {product.description}
              </p>

              {product.attributes && Object.keys(product.attributes).length > 0 && (
                <>
                  <h2 className="font-display text-2xl font-black mb-6 uppercase tracking-widest border-b-2 border-gray-100 pb-4">Especificações</h2>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {Object.entries(product.attributes).map(([key, value], idx) => (
                      <div key={key} className={cn("flex flex-col sm:flex-row sm:items-center p-4", idx % 2 === 0 ? 'bg-gray-50' : 'bg-white')}>
                        <div className="w-1/3 font-black text-sm uppercase tracking-widest text-gray-500 mb-1 sm:mb-0">{key}</div>
                        <div className="w-2/3 font-bold text-[var(--c-text)]">{value}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
