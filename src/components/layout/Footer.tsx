import React from 'react';
import { Zap, Phone, Instagram, Facebook, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_LINK } from '@/constants';
import { useLocation, useNavigate } from 'react-router-dom';

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth'});
  };

  return (
    <footer className="bg-[var(--c-dark)] py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={scrollToTop}>
              <div className="bg-[var(--c-primary)] p-2 rounded-xl shadow-lg ring-4 ring-white/5">
                <Zap className="h-10 w-10 text-white fill-white" />
              </div>
              <span className="font-display font-black text-3xl sm:text-5xl text-white shadow-text-light tracking-tighter">HLT <span className="text-slate-300 text-outline-contrast">Materiais Elétricos</span></span>
            </div>
            <p className="text-white/70 shadow-text-light text-2xl max-w-lg leading-relaxed mb-12 font-medium">
              Sua parceira de energia e segurança. Materiais elétricos com a qualidade que Manhuaçu merece.
            </p>
            <div className="flex gap-6">
              <a href={WHATSAPP_LINK} className="bg-white/5 hover:bg-slate-300 hover:text-[var(--c-dark)] p-5 rounded-2xl transition-all shadow-xl group"><Phone className="h-7 w-7 group-hover:scale-110 transition-transform" /></a>
              <a href="#" className="bg-white/5 hover:bg-slate-300 hover:text-[var(--c-dark)] p-5 rounded-2xl transition-all shadow-xl group"><Instagram className="h-7 w-7 group-hover:scale-110 transition-transform" /></a>
              <a href="#" className="bg-white/5 hover:bg-slate-300 hover:text-[var(--c-dark)] p-5 rounded-2xl transition-all shadow-xl group"><Facebook className="h-7 w-7 group-hover:scale-110 transition-transform" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-black text-2xl mb-12 border-b-2 border-slate-300 pb-4 inline-block tracking-tight">MENU RÁPIDO</h4>
            <ul className="space-y-6">
              <li><button onClick={scrollToTop} className="text-white/60 hover:text-slate-300 text-xl transition-all font-bold tracking-tight">Página Inicial</button></li>
              <li><button onClick={() => { scrollToTop(); navigate('/produtos'); }} className="text-white/60 hover:text-slate-300 text-xl transition-all font-bold tracking-tight">Produtos em Oferta</button></li>
              <li><button onClick={() => scrollToSection('sobre')} className="text-white/60 hover:text-slate-300 text-xl transition-all font-bold tracking-tight">Nossa Empresa</button></li>
              <li><button onClick={() => scrollToSection('contato')} className="text-white/60 hover:text-slate-300 text-xl transition-all font-bold tracking-tight">Localização</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black text-2xl mb-12 border-b-2 border-slate-300 pb-4 inline-block tracking-tight">GARANTIAS</h4>
            <ul className="space-y-6 text-white/60 text-lg font-bold tracking-tight">
              <li className="flex items-center gap-4"><CheckCircle2 className="h-6 w-6 text-slate-300" /> Selo ABNT</li>
              <li className="flex items-center gap-4"><CheckCircle2 className="h-6 w-6 text-slate-300" /> Suporte 24h</li>
              <li className="flex items-center gap-4"><CheckCircle2 className="h-6 w-6 text-slate-300" /> Entrega Garantida</li>
              <li className="flex items-center gap-4"><CheckCircle2 className="h-6 w-6 text-slate-300" /> Troca sem Burocracia</li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-white/5 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-white/40 tracking-[0.4em] uppercase">
          <div>HLT Materiais Elétricos – CNPJ XX.XXX.XXX/XXXX-XX</div>
          <div>Feito com paixão em Manhuaçu - MG</div>
        </div>
      </div>
    </footer>
  );
};
