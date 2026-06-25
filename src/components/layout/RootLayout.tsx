import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useCart } from '@/contexts/CartContext';
import { Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Global Themes could be handled here or inside index.css.
const customStyles = {
  '--c-primary': '#2563EB',
  '--c-hover': '#1D4ED8',
  '--c-dark': '#1E3A8A',
  '--c-card': '#2563EB',
  '--c-light': '#FFFFFF',
  '--c-text': '#1E293B',
} as React.CSSProperties;

export const RootLayout = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { showToast } = useCart();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Erro ao ativar tela cheia:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Erro ao sair de tela cheia:", err);
      });
    }
  };

  return (
    <div style={customStyles} className="relative min-h-screen font-sans antialiased text-[var(--c-text)] bg-[var(--c-light)]">
      {/* Botão Flutuante de Tela Cheia */}
      <button 
        id="global-fullscreen-btn"
        onClick={toggleFullscreen}
        className="fixed top-4 right-4 z-[9999] bg-slate-900/85 backdrop-blur-md text-white border border-white/10 shadow-xl px-4 py-2 flex items-center gap-2 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 text-xs font-black tracking-wider uppercase rounded-full"
        title={isFullscreen ? "Sair de Tela Cheia" : "Tela Cheia"}
      >
        {isFullscreen ? (
          <>
            <Minimize2 className="h-4 w-4 text-[var(--c-primary)]" />
            <span className="hidden md:inline">Sair Tela Cheia</span>
          </>
        ) : (
          <>
            <Maximize2 className="h-4 w-4 text-[var(--c-primary)] animate-pulse" />
            <span className="hidden md:inline">Tela Cheia</span>
          </>
        )}
      </button>

      <Header />
      
      <main>
        <Outlet />
      </main>

      <Footer />

      {/* TOAST NOTIFICATION */}
      <div 
        className={cn(
          "fixed bottom-10 right-10 bg-[#22C55E] text-white px-10 py-6 rounded-3xl shadow-[0_20px_80px_rgba(34,197,94,0.4)] flex items-center gap-5 font-black z-[100] transform transition-all duration-700",
          showToast ? "translate-y-0 scale-100 opacity-100" : "translate-y-32 scale-50 opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-white/20 p-2 rounded-xl">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        PRODUTO NO CARRINHO!
      </div>
    </div>
  );
};
