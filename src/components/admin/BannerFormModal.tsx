import React, { useState } from 'react';
import { X, Upload, Save, Image as ImageIcon } from 'lucide-react';
import { Banner } from '@/types';

interface BannerFormModalProps {
  banner?: Banner | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (banner: Banner) => void;
}

export function BannerFormModal({ banner, isOpen, onClose, onSave }: BannerFormModalProps) {
  const [formData, setFormData] = useState<Partial<Banner>>(
    banner || {
      title: '',
      subtitle: '',
      description: '',
      imageDesktop: '',
      imageMobile: '',
      primaryButtonText: '',
      primaryButtonLink: '',
      secondaryButtonText: '',
      secondaryButtonLink: '',
      order: 1,
      active: true,
      startDate: undefined,
      endDate: undefined,
    }
  );

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'startDate' || name === 'endDate') {
      setFormData(prev => ({ ...prev, [name]: value ? new Date(value) : undefined }));
    } else if (name === 'order') {
       setFormData(prev => ({ ...prev, [name]: parseInt(value) || 1 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: banner?.id || Date.now().toString(),
      createdAt: banner?.createdAt || new Date(),
      updatedAt: new Date(),
    } as Banner);
    onClose();
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--bg-surface)] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-[var(--border-default)] flex justify-between items-center bg-[var(--bg-page)]">
          <h2 className="font-display text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">
            {banner ? 'Editar Banner' : 'Novo Banner'}
          </h2>
          <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-default)] rounded-full transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="banner-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Básicas */}
            <div>
              <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4 pb-2 border-b border-[var(--border-default)]">Textos e Conteúdo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Título Principal</label>
                  <input required name="title" value={formData.title || ''} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] font-bold focus:outline-none focus:border-[var(--brand-primary)]" placeholder="Ex: Mega Oferta" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Subtítulo (Opcional)</label>
                  <input name="subtitle" value={formData.subtitle || ''} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] font-medium focus:outline-none focus:border-[var(--brand-primary)]" placeholder="Ex: Até 50% OFF" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Descrição (Opcional)</label>
                  <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={2} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" placeholder="Ex: Aproveite as melhores condições..." />
                </div>
              </div>
            </div>

            {/* Imagens */}
            <div>
              <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4 pb-2 border-b border-[var(--border-default)]">Mídia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Imagem Desktop (URL)</label>
                  <input required name="imageDesktop" value={formData.imageDesktop || ''} onChange={handleChange} className="w-full px-4 py-3 mb-2 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" placeholder="https://..." />
                  {formData.imageDesktop && (
                    <div className="aspect-[21/9] rounded-xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-page)]">
                      <img src={formData.imageDesktop} alt="Preview Desktop" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Imagem Mobile (URL)</label>
                  <input required name="imageMobile" value={formData.imageMobile || ''} onChange={handleChange} className="w-full px-4 py-3 mb-2 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" placeholder="https://..." />
                  {formData.imageMobile && (
                    <div className="aspect-[9/16] w-[180px] rounded-xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-page)] mx-auto">
                      <img src={formData.imageMobile} alt="Preview Mobile" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botões */}
            <div>
              <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4 pb-2 border-b border-[var(--border-default)]">Ações do Banner</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Texto Botão Primário</label>
                  <input name="primaryButtonText" value={formData.primaryButtonText || ''} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" placeholder="Ex: Ver Ofertas" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Link Botão Primário</label>
                  <input name="primaryButtonLink" value={formData.primaryButtonLink || ''} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" placeholder="Ex: /produtos?cat=1" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Texto Botão Secundário</label>
                  <input name="secondaryButtonText" value={formData.secondaryButtonText || ''} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" placeholder="Ex: Saiba Mais" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Link Botão Secundário</label>
                  <input name="secondaryButtonLink" value={formData.secondaryButtonLink || ''} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" placeholder="Ex: /sobre" />
                </div>
              </div>
            </div>

            {/* Configurações */}
            <div>
              <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4 pb-2 border-b border-[var(--border-default)]">Configurações e Agendamento</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Data Início</label>
                  <input type="date" name="startDate" value={formatDate(formData.startDate)} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Data Fim</label>
                  <input type="date" name="endDate" value={formatDate(formData.endDate)} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] mb-2 uppercase tracking-widest">Ordem de Exibição</label>
                  <input type="number" min="1" name="order" value={formData.order || 1} onChange={handleChange} className="w-full px-4 py-3 bg-[var(--bg-page)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]" />
                </div>
                <div className="flex items-center h-[50px] px-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="active" checked={formData.active !== false} onChange={handleChange} className="w-5 h-5 rounded border-[var(--border-default)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]" />
                    <span className="font-bold text-[var(--text-primary)] uppercase tracking-widest text-sm">Banner Ativo</span>
                  </label>
                </div>
              </div>
            </div>
            
          </form>
        </div>

        <div className="px-6 py-4 border-t border-[var(--border-default)] bg-[var(--bg-page)] flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-default)] rounded-xl transition-colors uppercase tracking-widest text-sm">
            Cancelar
          </button>
          <button form="banner-form" type="submit" className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-sm uppercase tracking-widest text-sm">
            <Save className="h-5 w-5" /> Salvar Banner
          </button>
        </div>
      </div>
    </div>
  );
}
