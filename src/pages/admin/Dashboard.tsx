import React from 'react';
import { Package, Truck, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { label: 'Pedidos Realizados', value: '12', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Em Trânsito', value: '1', icon: Truck, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Cashback Acumulado', value: 'R$ 45,90', icon: Wallet, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-black mb-8 uppercase tracking-widest border-b-2 border-gray-100 pb-4">Visão Geral</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} p-6 rounded-2xl`}>
            <s.icon className={`h-8 w-8 mb-4 ${s.color}`} />
            <div className="font-display font-black text-3xl text-[var(--c-text)] tracking-tighter mb-1">{s.value}</div>
            <div className={`font-black text-xs uppercase tracking-widest ${s.color}`}>{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-xl font-black mb-6 uppercase tracking-widest border-b-2 border-gray-100 pb-4">Último Pedido</h2>
      
      <div className="border-2 border-gray-100 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-6 border-b-2 border-gray-100">
          <div>
            <div className="font-black text-lg text-[var(--c-text)] mb-1">Pedido #HLT-38291</div>
            <div className="text-sm font-bold text-gray-500">Realizado em 15 de Junho, 2026</div>
          </div>
          <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest self-start">
            Em Separação
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full">
            <div className="w-16 h-16 bg-gray-100 rounded-xl"></div>
            <div className="w-16 h-16 bg-gray-100 rounded-xl"></div>
            <div className="font-black text-sm text-gray-400 uppercase tracking-widest">+3 itens</div>
          </div>
          <Link to="/admin/pedidos" className="w-full sm:w-auto text-center bg-gray-100 hover:bg-gray-200 text-[var(--c-text)] font-black py-3 px-6 rounded-xl uppercase tracking-widest text-xs transition-colors whitespace-nowrap">
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
