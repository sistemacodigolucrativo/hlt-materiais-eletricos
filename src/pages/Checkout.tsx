import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle2, ShieldCheck, ArrowLeft, CreditCard, Banknote, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');

  if (items.length === 0 && !success) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center bg-[var(--c-light)]">
        <div className="text-center">
          <div className="font-black text-2xl uppercase tracking-widest mb-4">Sem Produtos no Checkout</div>
          <Link to="/produtos" className="text-[var(--c-primary)] font-bold hover:underline">Voltar à Loja</Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="pt-32 pb-24 min-h-[80vh] flex items-center justify-center bg-[var(--c-light)]">
        <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-xl text-center max-w-2xl mx-4">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter text-[var(--c-text)]">
            Pedido Realizado!
          </h2>
          <p className="text-gray-500 font-medium text-lg mb-8 leading-relaxed">
            Seu pedido <strong className="text-[var(--c-text)]">#HLT-{Math.floor(10000 + Math.random() * 90000)}</strong> foi confirmado. 
            Nossa equipe já está separando seus produtos em Manhuaçu.
          </p>
          <div className="bg-gray-50 p-6 rounded-2xl mb-10 w-full inline-block border border-gray-100">
            <strong className="block text-sm uppercase tracking-widest font-black text-gray-500 mb-2">Resumo da Entrega</strong>
            <div className="font-bold text-[var(--c-text)]">Envio Expresso Local (Grátis)</div>
            <div className="text-gray-500">Estimativa: 1 dia útil</div>
          </div>
          
          <Link 
            to="/"
            className="w-full bg-[var(--c-primary)] hover:bg-[var(--c-hover)] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl uppercase tracking-widest"
          >
            VOLTAR PARA HOME
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    clearCart();
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--c-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 flex items-center gap-4">
          <button onClick={() => navigate('/carrinho')} className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors shadow-sm">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-4xl font-black text-[var(--c-text)] uppercase tracking-tighter">Checkout Seguro</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-black/5">
              <h2 className="font-display text-2xl font-black mb-8 uppercase tracking-widest border-b-2 border-gray-100 pb-4">Dados de Entrega</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest ml-2">Nome Completo</label>
                    <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-bold text-[var(--c-text)] focus:outline-none focus:border-[var(--c-primary)] transition-colors" placeholder="João da Silva" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest ml-2">CPF / CNPJ</label>
                    <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-bold text-[var(--c-text)] focus:outline-none focus:border-[var(--c-primary)] transition-colors" placeholder="000.000.000-00" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest ml-2">CEP</label>
                    <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-bold text-[var(--c-text)] focus:outline-none focus:border-[var(--c-primary)] transition-colors" placeholder="36900-000" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest ml-2">Endereço</label>
                    <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-bold text-[var(--c-text)] focus:outline-none focus:border-[var(--c-primary)] transition-colors" placeholder="Rua, Número, Bairro" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-black/5">
              <h2 className="font-display text-2xl font-black mb-8 uppercase tracking-widest border-b-2 border-gray-100 pb-4">Pagamento</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={cn("p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all border-2", paymentMethod === 'pix' ? 'border-[var(--c-primary)] bg-[var(--c-primary)]/5 text-[var(--c-primary)]' : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100')}
                >
                  <QrCode className="h-8 w-8" />
                  <span className="font-black text-sm uppercase tracking-widest">PIX</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={cn("p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all border-2", paymentMethod === 'card' ? 'border-[var(--c-primary)] bg-[var(--c-primary)]/5 text-[var(--c-primary)]' : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100')}
                >
                  <CreditCard className="h-8 w-8" />
                  <span className="font-black text-sm uppercase tracking-widest">Cartão</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={cn("p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all border-2", paymentMethod === 'boleto' ? 'border-[var(--c-primary)] bg-[var(--c-primary)]/5 text-[var(--c-primary)]' : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100')}
                >
                  <Banknote className="h-8 w-8" />
                  <span className="font-black text-sm uppercase tracking-widest">Boleto</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <label className="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest ml-2">Número do Cartão</label>
                    <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-bold text-[var(--c-text)] focus:outline-none focus:border-[var(--c-primary)] transition-colors" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest ml-2">Validade</label>
                      <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-bold text-[var(--c-text)] focus:outline-none focus:border-[var(--c-primary)] transition-colors" placeholder="MM/AA" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest ml-2">CVV</label>
                      <input required type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-bold text-[var(--c-text)] focus:outline-none focus:border-[var(--c-primary)] transition-colors" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'pix' && (
                 <div className="bg-green-50 text-green-800 p-6 rounded-2xl flex items-center justify-center font-bold animate-in fade-in slide-in-from-top-2">
                   O QRCode será gerado após a finalização do pedido.
                 </div>
              )}
            </div>
          </form>

          {/* Checkout Summary */}
          <div>
            <div className="bg-[var(--c-dark)] rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-white sticky top-32">
              <h3 className="font-display text-2xl font-black mb-8 uppercase tracking-widest text-white border-b-2 border-white/10 pb-4">Resumo da Compra</h3>
              
              <div className="space-y-6 max-h-60 overflow-y-auto mb-8 pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-4">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 rounded-xl bg-white/10 object-cover" />
                    <div className="flex-1">
                      <div className="font-bold text-sm tracking-wide leading-tight line-clamp-2">{item.product.name}</div>
                      <div className="text-white/50 text-xs font-black uppercase mt-1">QTD: {item.quantity}</div>
                    </div>
                    <div className="font-black text-right shrink-0">
                      R$ {((item.product.promotionalPrice || item.product.price) * item.quantity).toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 font-bold text-white/70 mb-8 border-t-2 border-white/10 pt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete Local</span>
                  <span className="text-green-400">Grátis</span>
                </div>
              </div>
              
              <div className="border-t-2 border-white/10 pt-6 mb-8 flex justify-between items-end">
                <span className="font-bold text-white/50 uppercase tracking-widest text-sm">Total a Pagar</span>
                <span className="font-display font-black text-4xl text-white tracking-tighter">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <button 
                type="submit"
                form="checkout-form"
                className="w-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-black py-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-green-500/20 uppercase tracking-widest text-xl"
              >
                CONFIRMAR PEDIDO
              </button>

              <div className="mt-8 flex items-center justify-center gap-3 text-white/40 text-xs font-black uppercase tracking-widest">
                <ShieldCheck className="h-5 w-5" />
                Ambiente 100% Seguro
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
