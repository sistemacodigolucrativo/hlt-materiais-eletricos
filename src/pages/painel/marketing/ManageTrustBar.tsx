import React, { useState } from 'react';
import { Plus, Edit, Power, PowerOff, Trash2, GripVertical, Info, ShieldCheck, Truck, Package, Award } from 'lucide-react';
import { TrustBarItem } from '@/types';
import { mockTrustBarItems } from '@/data/mock';
import { TrustBarFormModal } from '@/components/admin/TrustBarFormModal';

// Helper component to render Lucide icons dynamically
const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Truck':
      return <Truck className={className} />;
    case 'Package':
      return <Package className={className} />;
    case 'Award':
      return <Award className={className} />;
    default:
      return <Info className={className} />;
  }
};

export default function ManageTrustBar() {
  const [items, setItems] = useState<TrustBarItem[]>(mockTrustBarItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TrustBarItem | null>(null);

  const toggleActive = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, active: !i.active } : i));
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este benefício?')) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const openNewItemModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditItemModal = (item: TrustBarItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (item: TrustBarItem) => {
    if (editingItem) {
      setItems(items.map(i => i.id === item.id ? item : i));
    } else {
      setItems([...items, item]);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    if (sourceId === targetId) return;

    const sourceIndex = items.findIndex(i => i.id === sourceId);
    const targetIndex = items.findIndex(i => i.id === targetId);
    
    if (sourceIndex < 0 || targetIndex < 0) return;

    const newItems = [...items];
    const [movedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, movedItem);

    const updatedItems = newItems.map((item, idx) => ({
      ...item,
      order: idx + 1
    }));
    
    setItems(updatedItems);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase mb-2">Barra de Confiança</h1>
          <p className="text-[var(--text-muted)] font-medium">Gerencie os benefícios exibidos abaixo do banner principal</p>
        </div>
        <button onClick={openNewItemModal} className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm uppercase tracking-widest text-sm">
          <Plus className="h-5 w-5" /> Novo Benefício
        </button>
      </div>

      <div className="bg-[var(--bg-surface)] rounded-2xl shadow-[var(--shadow-card)] border border-[var(--border-default)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--bg-page)]/50">
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs w-10"></th>
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs w-16">Ícone</th>
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs">Conteúdo</th>
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs whitespace-nowrap text-center">Status</th>
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs text-right whitespace-nowrap">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.sort((a,b) => a.order - b.order).map(item => (
                <tr 
                  key={item.id} 
                  className="border-b border-[var(--border-default)] hover:bg-[var(--bg-page)]/50 transition-colors group"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, item.id)}
                >
                  <td className="py-4 px-6 text-[var(--text-muted)] cursor-move">
                    <GripVertical className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--bg-page)] border border-[var(--border-default)] text-[var(--brand-primary)]">
                      <IconRenderer name={item.icon} className="h-6 w-6" />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[var(--text-primary)] mb-1">{item.title}</div>
                    <div className="text-sm font-medium text-[var(--text-muted)] flex items-center gap-3">
                      <span>{item.description}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button 
                      onClick={() => toggleActive(item.id)}
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${
                        item.active 
                          ? 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]' 
                          : 'bg-[var(--bg-page)] text-[var(--text-muted)] border border-[var(--border-default)]'
                      }`}
                    >
                      {item.active ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className="py-4 px-6 md:w-36">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditItemModal(item)} className="p-2 text-[var(--text-muted)] hover:text-[var(--brand-primary)] bg-[var(--bg-page)] hover:bg-[var(--border-default)] rounded-lg transition-colors" title="Editar">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => toggleActive(item.id)} className={`p-2 rounded-lg transition-colors bg-[var(--bg-page)] hover:bg-[var(--border-default)] ${item.active ? 'text-[#166534] hover:text-[#16A34A]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`} title={item.active ? 'Desativar' : 'Ativar'}>
                        {item.active ? <Power className="h-5 w-5" /> : <PowerOff className="h-5 w-5" />}
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-[var(--text-muted)] hover:text-[var(--danger)] bg-[var(--bg-page)] hover:bg-[var(--danger)]/10 rounded-lg transition-colors" title="Excluir">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="p-12 text-center text-[var(--text-muted)] font-medium">
              Nenhum benefício encontrado.
            </div>
          )}
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <TrustBarFormModal 
          item={editingItem} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveItem} 
        />
      )}
    </div>
  );
}
