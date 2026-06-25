import React from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function PainelDashboard() {
  const stats = [
    { label: 'Faturamento Mês', value: 'R$ 124.500', icon: DollarSign, trend: '+14%', positive: true },
    { label: 'Pedidos', value: '384', icon: ShoppingCart, trend: '+5%', positive: true },
    { label: 'Novos Clientes', value: '42', icon: Users, trend: '-2%', positive: false },
    { label: 'Produtos Ativos', value: '1.205', icon: Package, trend: 'Estável', positive: true },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl font-black text-[var(--c-text)] tracking-tighter uppercase mb-2">Visão Geral</h1>
        <p className="text-[var(--text-muted)] font-medium">Acompanhe as métricas da sua loja em tempo real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="bg-[var(--bg-surface)] p-6 rounded-[2rem] shadow-sm border border-[var(--border-default)]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[var(--bg-page)] rounded-xl">
                <s.icon className="h-6 w-6 text-[var(--c-primary)]" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-lg ${s.positive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {s.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.trend}
              </div>
            </div>
            <div className="font-display font-black text-3xl text-[var(--c-text)] mb-1 tracking-tighter">{s.value}</div>
            <div className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[var(--bg-surface)] rounded-[2rem] p-8 shadow-sm border border-[var(--border-default)]">
           <h2 className="font-display text-2xl font-black text-[var(--c-text)] tracking-tight uppercase mb-6 flex items-center justify-between">
             Vendas Recentes
             <button className="text-[var(--c-primary)] text-sm hover:underline">Ver Todos</button>
           </h2>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b-2 border-[var(--border-default)] text-[var(--text-muted)] text-xs uppercase tracking-widest font-black">
                   <th className="pb-4">Pedido ID</th>
                   <th className="pb-4">Cliente</th>
                   <th className="pb-4">Data</th>
                   <th className="pb-4">Status</th>
                   <th className="pb-4 text-right">Valor</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-[var(--border-default)]">
                 {[
                   { id: '1092', client: 'Carlos Eletricista', date: 'Hoje', status: 'Pagamento Confirmado', val: 'R$ 845,90' },
                   { id: '1091', client: 'Construtora Silva', date: 'Hoje', status: 'Aguardando Pagamento', val: 'R$ 3.250,00' },
                   { id: '1090', client: 'Marina Fernandes', date: 'Ontem', status: 'Enviado', val: 'R$ 120,50' },
                   { id: '1089', client: 'João Souza', date: 'Ontem', status: 'Entregue', val: 'R$ 65,90' },
                 ].map(o => (
                   <tr key={o.id} className="hover:bg-[var(--bg-page)] transition-colors group cursor-pointer">
                     <td className="py-4 font-bold text-[var(--c-text)]">#{o.id}</td>
                     <td className="py-4 text-[var(--text-secondary)] font-medium">{o.client}</td>
                     <td className="py-4 text-[var(--text-muted)] text-sm">{o.date}</td>
                     <td className="py-4">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         o.status === 'Entregue' ? 'bg-green-500/10 text-green-500' :
                         o.status === 'Enviado' ? 'bg-blue-500/10 text-blue-500' :
                         o.status === 'Aguardando Pagamento' ? 'bg-amber-500/10 text-amber-500' :
                         'bg-gray-500/10 text-gray-500'
                       }`}>
                         {o.status}
                       </span>
                     </td>
                     <td className="py-4 text-right font-black text-[var(--c-text)]">{o.val}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        <div className="bg-[var(--bg-surface)] rounded-[2rem] p-8 shadow-sm border border-[var(--border-default)]">
          <h2 className="font-display text-2xl font-black text-[var(--c-text)] tracking-tight uppercase mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[var(--c-primary)]" /> Top Produtos
          </h2>
          <div className="space-y-6">
            {[
              { name: 'Cabo Flexível 2,5mm 100m', sales: 45 },
              { name: 'Kit 10 Lâmpadas LED 9W', sales: 32 },
              { name: 'Disjuntor Bipolar 20A DIN', sales: 28 },
              { name: 'Tomada 20A com USB Dupla', sales: 15 },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-page)] flex items-center justify-center font-black text-[var(--text-muted)]">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[var(--c-text)] text-sm leading-tight mb-1">{p.name}</div>
                  <div className="text-xs font-black text-[var(--c-primary)] tracking-widest uppercase">{p.sales} Vendas</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
