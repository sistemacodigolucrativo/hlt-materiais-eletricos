import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Package } from 'lucide-react';

export function AdminLayout() {
  const location = useLocation();
  
  const menu = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Meus Pedidos', path: '/admin/pedidos', icon: ShoppingBag },
    { name: 'Endereços', path: '/admin/enderecos', icon: Package },
    { name: 'Minha Conta', path: '/admin/conta', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--c-light)] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-black text-[var(--c-text)] uppercase tracking-tighter mb-8">Área do Cliente</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-black/5">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gray-100">
                <div className="w-14 h-14 bg-[var(--c-primary)]/10 text-[var(--c-primary)] rounded-full flex items-center justify-center font-black text-xl">
                  JS
                </div>
                <div>
                  <div className="font-black text-[var(--c-text)]">João da Silva</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cliente VIP</div>
                </div>
              </div>

              <nav className="space-y-2">
                {menu.map(item => {
                  const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-colors ${
                        isActive 
                          ? 'bg-[var(--c-primary)] text-white shadow-md'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-[var(--c-text)]'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t-2 border-gray-100">
                <button className="flex items-center gap-4 px-4 py-4 w-full text-left rounded-xl font-black text-sm uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut className="h-5 w-5" />
                  Sair
                </button>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-black/5 min-h-[500px]">
              <Outlet />
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
