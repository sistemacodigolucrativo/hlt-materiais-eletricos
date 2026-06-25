import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Tags, ShoppingCart, BarChart, Settings, LogOut, Layers, Zap, ShieldCheck, Menu, X } from 'lucide-react';

export function PainelLayout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menu = [
    { name: 'Dashboard', path: '/painel', icon: LayoutDashboard },
    { name: 'Pedidos', path: '/painel/pedidos', icon: ShoppingCart },
    { name: 'Produtos', path: '/painel/produtos', icon: Package },
    { name: 'Categorias', path: '/painel/categorias', icon: Layers },
    { name: 'Marcas', path: '/painel/marcas', icon: Tags },
    { name: 'Banners', path: '/painel/marketing/banners', icon: Zap },
    { name: 'Barra de Confiança', path: '/painel/marketing/trustbar', icon: ShieldCheck },
    { name: 'Clientes', path: '/painel/clientes', icon: Users },
    { name: 'Estoque', path: '/painel/estoque', icon: Package },
    { name: 'Relatórios', path: '/painel/relatorios', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-[var(--c-dark)] text-white h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="p-2 hover:bg-white/10 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
            aria-label="Abrir menu"
          >
            <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
          
          <Link to="/painel" className="flex items-center gap-3">
            <div className="bg-[var(--c-primary)] p-1.5 sm:p-2 rounded-lg shadow-sm ring-1 ring-white/10">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="font-display font-black text-xl sm:text-2xl tracking-tighter">
              HLT <span className="text-slate-300">Admin</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right mr-2">
            <div className="text-[10px] font-black tracking-widest text-[var(--c-primary)] uppercase mb-0.5">Gestor Logado</div>
            <div className="text-sm font-bold">Admin Principal</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm">
            AP
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsMenuOpen(false)} 
        />
      )}

      {/* Sidebar Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[var(--c-dark)] text-white flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 sm:h-20 px-6 flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="font-display font-black text-xl tracking-tighter text-[var(--c-primary)]">
            MENU <span className="text-white">PRINCIPAL</span>
          </div>
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="p-2 hover:bg-white/10 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
            aria-label="Fechar menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {menu.map(item => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/painel');
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all ${
                  isActive 
                    ? 'bg-[var(--c-primary)] text-white shadow-lg'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <Link 
            to="/" 
            className="flex items-center gap-4 px-4 py-4 w-full text-left rounded-xl font-bold text-sm tracking-wide text-white/50 hover:bg-white/5 hover:text-white transition-colors border border-white/10"
          >
            <LogOut className="h-5 w-5" />
            Sair do Painel
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden p-6 md:p-8 lg:p-12 w-full max-w-[1600px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
