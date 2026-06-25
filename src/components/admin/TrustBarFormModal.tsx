import React, { useState } from 'react';
import { X, Save, ShieldCheck, Truck, Package, Award, ThumbsUp, Star, Zap } from 'lucide-react';
import { TrustBarItem } from '@/types';
import { cn } from '@/lib/utils';

interface TrustBarFormModalProps {
  item?: TrustBarItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: TrustBarItem) => void;
}

const AVAILABLE_ICONS = [
  'ShieldCheck',
  'Truck',
  'Package',
  'Award',
  'ThumbsUp',
  'Star',
  'Zap'
];

const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'Package': return <Package className={className} />;
    case 'Award': return <Award className={className} />;
    case 'ThumbsUp': return <ThumbsUp className={className} />;
    case 'Star': return <Star className={className} />;
    case 'Zap': return <Zap className={className} />;
    default: return null;
  }
};

export function TrustBarFormModal({ item, isOpen, onClose, onSave }: TrustBarFormModalProps) {
  const [formData, setFormData] = useState<Partial<TrustBarItem>>(
    item || {
      title: '',
      description: '',
      icon: 'ShieldCheck',
      order: 1,
      active: true,
    }
  );

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'order') {
       setFormData(prev => ({ ...prev, [name]: parseInt(value) || 1 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleIconSelect = (iconName: string) => {
    setFormData(prev => ({ ...prev, icon: iconName }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: item?.id || Date.now().toString(),
    } as TrustBarItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--bg-surface)] w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-[var(--border-default)] flex justify-between items-center bg-[var(--bg-page)]">
          <h2 className="font-display text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">
            {item ? 'Editar Benefício' : 'Novo Benefício'}
          </h2>
          <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-default)] rounded-full transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="trustbar-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Título</label>
                <input required name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] font-bold focus:outline-none focus:border-[var(--brand-primary)]" placeholder="Ex: Compra Segura" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Descrição</label>
                <input required name="description" value={formData.description || ''} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] font-medium focus:outline-none focus:border-[var(--brand-primary)]" placeholder="Ex: Transações protegidas" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Ícone</label>
              <div className="flex flex-wrap gap-3">
                {AVAILABLE_ICONS.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => handleIconSelect(iconName)}
                    className={cn(
                      "p-3 rounded-xl border transition-all",
                      formData.icon === iconName 
                        ? "bg-[var(--brand-primary)]/10 border-[var(--brand-primary)] text-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/20" 
                        : "bg-[var(--bg-page)] border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--text-muted)]"
                    )}
                  >
                    <IconRenderer name={iconName} className="h-6 w-6" />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Ordem de Exibição</label>
                <input type="number" min="1" name="order" value={formData.order || 1} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" />
              </div>
              <div className="flex items-center h-[50px] px-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="active" checked={formData.active !== false} onChange={handleChange} className="w-5 h-5 rounded border-[var(--border-default)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]" />
                  <span className="font-bold text-[var(--text-primary)] uppercase tracking-widest text-sm">Item Ativo</span>
                </label>
              </div>
            </div>
            
          </form>
        </div>

        <div className="px-6 py-4 border-t border-[var(--border-default)] bg-[var(--bg-page)] flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-default)] rounded-xl transition-colors uppercase tracking-widest text-sm">
            Cancelar
          </button>
          <button form="trustbar-form" type="submit" className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-sm uppercase tracking-widest text-sm">
            <Save className="h-5 w-5" /> Salvar Benefício
          </button>
        </div>
      </div>
    </div>
  );
}
