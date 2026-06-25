import React, { useState } from 'react';
import { Plus, Edit, Copy, Power, PowerOff, Trash2, GripVertical, Image as ImageIcon, Calendar } from 'lucide-react';
import { Banner } from '@/types';
import { mockBanners } from '@/data/mock';
import { BannerFormModal } from '@/components/admin/BannerFormModal';

export default function ManageBanners() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const toggleActive = (id: string) => {
    setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este banner?')) {
      setBanners(banners.filter(b => b.id !== id));
    }
  };

  const handleDuplicate = (banner: Banner) => {
    const newBanner = {
      ...banner,
      id: Date.now().toString(),
      title: `${banner.title} (Cópia)`,
      active: false,
      order: banners.length + 1
    };
    setBanners([...banners, newBanner]);
  };

  const openNewBannerModal = () => {
    setEditingBanner(null);
    setIsModalOpen(true);
  };

  const openEditBannerModal = (banner: Banner) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleSaveBanner = (banner: Banner) => {
    if (editingBanner) {
      setBanners(banners.map(b => b.id === banner.id ? banner : b));
    } else {
      setBanners([...banners, banner]);
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
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    if (sourceId === targetId) return;

    const sourceIndex = banners.findIndex(b => b.id === sourceId);
    const targetIndex = banners.findIndex(b => b.id === targetId);
    
    if (sourceIndex < 0 || targetIndex < 0) return;

    const newBanners = [...banners];
    const [movedBanner] = newBanners.splice(sourceIndex, 1);
    newBanners.splice(targetIndex, 0, movedBanner);

    // Reassign orders based on new array order
    const updatedBanners = newBanners.map((banner, idx) => ({
      ...banner,
      order: idx + 1
    }));
    
    setBanners(updatedBanners);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase mb-2">Banners</h1>
          <p className="text-[var(--text-muted)] font-medium">Gerencie o carousel principal da página inicial</p>
        </div>
        <button onClick={openNewBannerModal} className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm uppercase tracking-widest text-sm">
          <Plus className="h-5 w-5" /> Novo Banner
        </button>
      </div>

      <div className="bg-[var(--bg-surface)] rounded-2xl shadow-[var(--shadow-card)] border border-[var(--border-default)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--bg-page)]/50">
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs w-10"></th>
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs whitespace-nowrap">Preview</th>
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs">Informações</th>
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs whitespace-nowrap">Período</th>
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs whitespace-nowrap text-center">Status</th>
                <th className="py-4 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-xs text-right whitespace-nowrap">Ações</th>
              </tr>
            </thead>
            <tbody>
              {banners.sort((a,b) => a.order - b.order).map(banner => (
                <tr 
                  key={banner.id} 
                  className="border-b border-[var(--border-default)] hover:bg-[var(--bg-page)]/50 transition-colors group"
                  draggable
                  onDragStart={(e) => handleDragStart(e, banner.id)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, banner.id)}
                >
                  <td className="py-4 px-6 text-[var(--text-muted)] cursor-move">
                    <GripVertical className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-40 h-16 rounded-lg overflow-hidden relative bg-[var(--bg-page)] border border-[var(--border-default)]">
                      {banner.imageDesktop ? (
                        <img src={banner.imageDesktop} alt={banner.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
                          <ImageIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[var(--text-primary)] mb-1">{banner.title}</div>
                    <div className="text-xs font-medium text-[var(--text-muted)] mt-1 flex items-center gap-3">
                      <span>Ordem: {banner.order}</span>
                      {banner.primaryButtonLink && <span>Link: {banner.primaryButtonLink}</span>}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] whitespace-nowrap">
                      <Calendar className="h-4 w-4" />
                      {banner.startDate ? new Date(banner.startDate).toLocaleDateString() : 'Ilimitado'}
                      {' - '}
                      {banner.endDate ? new Date(banner.endDate).toLocaleDateString() : 'Sem Fim'}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button 
                      onClick={() => toggleActive(banner.id)}
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${
                        banner.active 
                          ? 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {banner.active ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className="py-4 px-6 md:w-48">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditBannerModal(banner)} className="p-2 text-[var(--text-muted)] hover:text-[var(--brand-primary)] bg-[var(--bg-page)] hover:bg-[var(--border-default)] rounded-lg transition-colors" title="Editar">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDuplicate(banner)} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-page)] hover:bg-[var(--border-default)] rounded-lg transition-colors" title="Duplicar">
                        <Copy className="h-5 w-5" />
                      </button>
                      <button onClick={() => toggleActive(banner.id)} className={`p-2 rounded-lg transition-colors bg-[var(--bg-page)] hover:bg-[var(--border-default)] ${banner.active ? 'text-[#166534] hover:text-[#16A34A]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`} title={banner.active ? 'Desativar' : 'Ativar'}>
                        {banner.active ? <Power className="h-5 w-5" /> : <PowerOff className="h-5 w-5" />}
                      </button>
                      <button onClick={() => handleDelete(banner.id)} className="p-2 text-[var(--text-muted)] hover:text-[var(--danger)] bg-[var(--bg-page)] hover:bg-[var(--danger)]/10 rounded-lg transition-colors" title="Excluir">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {banners.length === 0 && (
            <div className="p-12 text-center text-[var(--text-muted)] font-medium">
              Nenhum banner encontrado. Clique em "Novo Banner" para começar.
            </div>
          )}
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <BannerFormModal 
          banner={editingBanner} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveBanner} 
        />
      )}
    </div>
  );
}
