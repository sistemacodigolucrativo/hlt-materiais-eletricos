import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { getProducts, saveProducts } from '@/stores/productStore';
import { Product } from '@/types';

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setSku(product.sku);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setImage(product.images[0] || '');
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setName('');
    setSku('');
    setPrice('');
    setStock('');
    setImage('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Math.random().toString(36).substr(2, 9),
      name,
      sku,
      description: editingProduct?.description || 'Descrição do produto',
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      categoryId: editingProduct?.categoryId || '1',
      brandId: editingProduct?.brandId || '1',
      images: [image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'],
      status: 'ACTIVE',
      createdAt: editingProduct?.createdAt || new Date(),
      updatedAt: new Date()
    };

    let updated: Product[];
    if (editingProduct) {
      updated = products.map(p => p.id === editingProduct.id ? newProduct : p);
    } else {
      updated = [...products, newProduct];
    }

    setProducts(updated);
    saveProducts(updated);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-black text-[var(--c-text)] tracking-tighter uppercase mb-2">Produtos</h1>
          <p className="text-[var(--text-muted)] font-medium">Gerencie seu catálogo de produtos (Mock).</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-[var(--c-primary)] hover:bg-[var(--c-hover)] text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg uppercase tracking-widest text-sm"
        >
          <Plus className="h-5 w-5" /> Novo Produto
        </button>
      </div>

      <div className="bg-[var(--bg-surface)] rounded-[2rem] p-8 shadow-sm border border-[var(--border-default)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-[var(--border-default)] text-[var(--text-muted)] text-xs uppercase tracking-widest font-black">
                <th className="pb-4">Produto</th>
                <th className="pb-4">SKU</th>
                <th className="pb-4">Preço</th>
                <th className="pb-4">Estoque</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-default)]">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-[var(--bg-page)] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 mix-blend-multiply dark:mix-blend-normal" />
                      <div className="font-bold text-[var(--c-text)] truncate max-w-[200px]">{p.name}</div>
                    </div>
                  </td>
                  <td className="py-4 text-[var(--text-secondary)] font-medium text-sm">{p.sku}</td>
                  <td className="py-4 font-black text-[var(--c-text)]">R$ {(p.promotionalPrice || p.price).toFixed(2).replace('.', ',')}</td>
                  <td className="py-4 text-[var(--text-secondary)] font-bold">{p.stock} un</td>
                  <td className="py-4">
                    <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      Ativo
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(p)} className="p-2 text-[var(--text-muted)] hover:text-[var(--c-primary)] bg-[var(--bg-page)] hover:bg-[var(--bg-surface)] rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-[var(--text-muted)] hover:text-red-500 bg-[var(--bg-page)] hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[var(--text-muted)] font-medium">Nenhum produto cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--bg-surface)] rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[var(--border-default)] flex justify-between items-center bg-[var(--bg-page)]">
              <h2 className="font-black text-xl uppercase tracking-widest text-[var(--c-text)]">{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--text-muted)] hover:text-red-500 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form id="productForm" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[var(--c-text)] mb-1">Nome do Produto</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-default)] text-[var(--c-text)] focus:ring-2 focus:ring-[var(--c-primary)] font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[var(--c-text)] mb-1">SKU</label>
                  <input required type="text" value={sku} onChange={e => setSku(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-default)] text-[var(--c-text)] focus:ring-2 focus:ring-[var(--c-primary)] font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[var(--c-text)] mb-1">Preço (R$)</label>
                    <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-default)] text-[var(--c-text)] focus:ring-2 focus:ring-[var(--c-primary)] font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--c-text)] mb-1">Estoque</label>
                    <input required type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-default)] text-[var(--c-text)] focus:ring-2 focus:ring-[var(--c-primary)] font-medium" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[var(--c-text)] mb-1">URL da Imagem</label>
                  <input type="url" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-default)] text-[var(--c-text)] focus:ring-2 focus:ring-[var(--c-primary)] font-medium" />
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-[var(--border-default)] bg-[var(--bg-page)] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-[var(--text-muted)] hover:bg-[var(--bg-surface)] transition-colors">Cancelar</button>
              <button type="submit" form="productForm" className="bg-[var(--c-primary)] hover:bg-[var(--c-hover)] text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-md">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
