import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { items, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center bg-[var(--c-light)]">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-lg mx-4">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="font-display text-3xl font-black mb-4 uppercase tracking-tighter text-[var(--c-text)]">Carrinho Vazio</h2>
          <p className="text-gray-500 font-medium mb-8">Você ainda não adicionou nenhum produto ao carrinho.</p>
          <Link 
            to="/produtos"
            className="bg-[var(--c-primary)] hover:bg-[var(--c-hover)] text-white font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-widest text-sm shadow-xl"
          >
            VER PRODUTOS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--c-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl md:text-5xl font-black text-[var(--c-text)] uppercase tracking-tighter mb-12">Seu Carrinho</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={item.product.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-black/5 flex flex-col sm:flex-row gap-6 items-center">
                <Link to={`/produtos/${item.product.id}`} className="w-32 h-32 rounded-xl bg-gray-50 flex items-center justify-center p-2 shrink-0 group">
                  <img src={item.product.images[0]} alt={item.product.name} className="max-w-full max-h-full mix-blend-multiply group-hover:scale-110 transition-transform" />
                </Link>
                
                <div className="flex-1 text-center sm:text-left">
                  <Link to={`/produtos/${item.product.id}`} className="font-black text-xl text-[var(--c-text)] hover:text-[var(--c-primary)] transition-colors mb-2 block line-clamp-2">
                    {item.product.name}
                  </Link>
                  <div className="text-gray-500 font-bold text-sm tracking-widest mb-4">SKU: {item.product.sku}</div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="font-display font-black text-2xl text-[var(--c-text)]">
                      R$ {(item.product.promotionalPrice || item.product.price).toFixed(2).replace('.', ',')}
                    </div>
                    
                    <div className="flex items-center gap-4 justify-center sm:justify-start">
                      <div className="flex items-center border-2 border-gray-100 rounded-xl px-4 py-2 bg-gray-50 gap-4">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-gray-500 font-black text-xl hover:text-[var(--c-primary)]">-</button>
                        <span className="font-black text-lg select-none w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-gray-500 font-black text-xl hover:text-[var(--c-primary)]">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-black/5 sticky top-32">
              <h3 className="font-display text-2xl font-black mb-8 uppercase tracking-widest text-[var(--c-text)] border-b-2 border-gray-100 pb-4">Sumário</h3>
              
              <div className="space-y-4 font-bold text-gray-500 mb-8">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[var(--c-text)]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete (Manhuaçu-MG)</span>
                  <span className="text-green-500">Grátis</span>
                </div>
              </div>
              
              <div className="border-t-2 border-gray-100 pt-6 mb-8 flex justify-between items-end">
                <span className="font-bold text-gray-500 uppercase tracking-widest text-sm">Total</span>
                <span className="font-display font-black text-4xl text-[var(--c-text)] tracking-tighter">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-[var(--c-primary)] hover:bg-[var(--c-hover)] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl uppercase tracking-widest text-sm"
              >
                FINALIZAR PEDIDO <ArrowRight className="h-5 w-5" />
              </button>
              
              <div className="text-center mt-6">
                <Link to="/produtos" className="text-sm font-bold text-gray-500 hover:text-[var(--c-text)] uppercase tracking-widest transition-colors">
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
