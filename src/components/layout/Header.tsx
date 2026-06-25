import React, { useState, useEffect } from 'react';
import { ShoppingCart, Zap, Menu, X, Phone, User, MonitorDot, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WHATSAPP_LINK } from '@/constants';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[var(--bg-surface)] border-b border-[var(--border-default)]",
          isScrolled ? "shadow-md py-3" : "py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
            <div className="bg-[var(--brand-primary)] p-1.5 rounded-lg shadow-sm">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <span className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">HLT <span className="text-[var(--text-secondary)] font-medium">Materiais Elétricos</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" onClick={scrollToTop} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] font-semibold transition-colors">Início</Link>
            <Link to="/produtos" className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] font-semibold transition-colors">Produtos</Link>
            <button onClick={() => scrollToSection('sobre')} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] font-semibold transition-colors">Sobre Nós</button>
            <button onClick={() => scrollToSection('depoimentos')} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] font-semibold transition-colors">Depoimentos</button>
            <button onClick={() => scrollToSection('contato')} className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] font-semibold transition-colors">Contato</button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleTheme} 
              className="text-[var(--text-muted)] hover:bg-[var(--bg-page)] hover:text-[var(--brand-primary)] p-2 rounded-lg transition-colors"
              title="Alternar Tema"
            >
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <Link to="/painel" className="text-[var(--text-muted)] hover:bg-[var(--bg-page)] hover:text-[var(--brand-primary)] p-2 rounded-lg transition-colors hidden sm:block" title="Painel Administrativo">
              <User className="h-6 w-6" />
            </Link>
            <Link to="/carrinho" onClick={scrollToTop} className="relative text-[var(--text-muted)] hover:bg-[var(--bg-page)] cursor-pointer group p-2 rounded-lg hover:text-[var(--brand-primary)] transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[var(--danger)] text-white text-[10px] font-black min-w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white font-bold py-2.5 px-6 rounded-xl transition-all active:scale-95 items-center shadow-md"
            >
              Pedir Orçamento
            </a>

            <button 
              className="md:hidden text-[var(--text-primary)] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[var(--bg-surface)] pt-24 px-6 pb-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link to="/produtos" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-primary)] text-xl font-bold w-full text-left py-4 border-b border-[var(--border-default)] uppercase tracking-widest">Ver Produtos</Link>
          <button onClick={() => scrollToSection('sobre')} className="text-[var(--text-primary)] text-xl font-bold w-full text-left py-4 border-b border-[var(--border-default)] uppercase tracking-widest">Nossa Loja</button>
          <button onClick={() => scrollToSection('depoimentos')} className="text-[var(--text-primary)] text-xl font-bold w-full text-left py-4 border-b border-[var(--border-default)] uppercase tracking-widest">Clientes</button>
          <button onClick={() => scrollToSection('contato')} className="text-[var(--text-primary)] text-xl font-bold w-full text-left py-4 border-b border-[var(--border-default)] uppercase tracking-widest">Endereço</button>
          <Link to="/painel" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-primary)] text-xl font-bold w-full text-left py-4 border-b border-[var(--border-default)] uppercase tracking-widest flex items-center gap-3">
            <MonitorDot className="h-6 w-6" /> Painel Admin
          </Link>
          
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" rel="noopener noreferrer"
            className="mt-auto bg-[var(--brand-primary)] text-white py-5 rounded-2xl font-black text-center flex justify-center items-center gap-3 shadow-[var(--shadow-card)] uppercase tracking-widest"
          >
            <Phone className="h-6 w-6" /> Chamar no WhatsApp
          </a>
        </div>
      )}
    </>
  );
};

