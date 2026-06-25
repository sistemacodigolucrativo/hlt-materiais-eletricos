import React from 'react';

export default function Orders() {
  return (
    <div>
      <h2 className="font-display text-2xl font-black mb-8 uppercase tracking-widest border-b-2 border-gray-100 pb-4">Meus Pedidos</h2>
      
      <div className="space-y-6">
        {[
          { id: '38291', date: '15 Jun 2026', total: 'R$ 845,90', status: 'Em Separação', color: 'bg-amber-100 text-amber-700' },
          { id: '29102', date: '02 Mai 2026', total: 'R$ 1.250,00', status: 'Entregue', color: 'bg-green-100 text-green-700' },
          { id: '18492', date: '14 Abr 2026', total: 'R$ 125,50', status: 'Entregue', color: 'bg-green-100 text-green-700' },
        ].map(order => (
          <div key={order.id} className="border-2 border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="font-black text-lg text-[var(--c-text)]">
                Pedido #HLT-{order.id}
              </div>
              <div className="text-sm font-bold text-gray-500 mb-2">
                Realizado em {order.date}
              </div>
              <div className="font-display font-black text-xl">
                {order.total}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest w-full text-center sm:w-auto ${order.color}`}>
                {order.status}
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-[var(--c-text)] font-black py-3 px-6 rounded-xl uppercase tracking-widest text-xs transition-colors w-full sm:w-auto">
                Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
