import React from 'react';
import { Search, Eye } from 'lucide-react';

export default function ManageOrders() {
  return (
    <div>
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-black text-[var(--c-text)] tracking-tighter uppercase mb-2">Pedidos</h1>
          <p className="text-[var(--text-muted)] font-medium">Acompanhe todos os pedidos da loja.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] rounded-[2rem] p-8 shadow-sm border border-[var(--border-default)]">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-5 w-5" />
            <input 
              type="text" 
              placeholder="Buscar por ID ou Nome do Cliente..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-default)] font-bold text-[var(--c-text)] focus:ring-2 focus:ring-[var(--c-primary)]"
            />
          </div>
          <div className="flex gap-4">
             <select className="bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl px-4 py-3 font-bold text-[var(--text-secondary)] focus:ring-[var(--c-primary)]">
               <option>Qualquer Status</option>
               <option>Entregue</option>
               <option>Aguardando Pagamento</option>
               <option>Enviado</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-[var(--border-default)] text-[var(--text-muted)] text-xs uppercase tracking-widest font-black">
                <th className="pb-4">Pedido</th>
                <th className="pb-4">Data</th>
                <th className="pb-4">Cliente</th>
                <th className="pb-4">Total</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-default)]">
              {[
                { id: '1092', client: 'Carlos Eletricista', date: '15/06/2026', status: 'Aguardando Envio', val: 'R$ 845,90' },
                { id: '1091', client: 'Construtora Silva', date: '14/06/2026', status: 'Aguardando Pagamento', val: 'R$ 3.250,00' },
                { id: '1090', client: 'Marina Fernandes', date: '10/06/2026', status: 'Enviado', val: 'R$ 120,50' },
                { id: '1089', client: 'João Souza', date: '05/06/2026', status: 'Entregue', val: 'R$ 65,90' },
              ].map(o => (
                <tr key={o.id} className="hover:bg-[var(--bg-page)] transition-colors">
                  <td className="py-4 font-bold text-[var(--c-text)]">#{o.id}</td>
                  <td className="py-4 text-[var(--text-muted)] font-medium text-sm">{o.date}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--bg-page)] flex items-center justify-center font-black text-[var(--text-muted)] text-xs">
                        {o.client.substring(0,2).toUpperCase()}
                      </div>
                      <div className="font-bold text-[var(--text-secondary)]">{o.client}</div>
                    </div>
                  </td>
                  <td className="py-4 font-black text-[var(--c-text)]">
                    {o.val}
                  </td>
                  <td className="py-4">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         o.status === 'Entregue' ? 'bg-green-500/10 text-green-500' :
                         o.status === 'Enviado' ? 'bg-blue-500/10 text-blue-500' :
                         o.status === 'Aguardando Pagamento' ? 'bg-amber-500/10 text-amber-500' :
                         'bg-[#ff5a00]/10 text-[#ff5a00]'
                       }`}>
                         {o.status}
                     </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-2 text-[var(--text-muted)] hover:text-[var(--c-primary)] bg-[var(--bg-page)] hover:bg-[var(--bg-surface)] rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
