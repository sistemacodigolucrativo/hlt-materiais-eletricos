import React, { useMemo, useState } from 'react';
import { Check, ChevronDown, Filter, Grid2X2, ListFilter, Search, ShoppingCart, SlidersHorizontal, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockBrands, mockCategories } from '@/data/mock';
import { getProducts } from '@/stores/productStore';
import { useCart } from '@/contexts/CartContext';
import { FadeInSection } from '@/components/ui/FadeInSection';

const fallbackByCategory: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&q=82&auto=format&fit=crop',
  '2': 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=900&q=82&auto=format&fit=crop',
  '3': 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&q=82&auto=format&fit=crop',
  '4': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=82&auto=format&fit=crop',
  '5': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=82&auto=format&fit=crop',
};

function money(value: number) { return `R$ ${value.toFixed(2).replace('.', ',')}`; }

export default function Catalog() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [sort, setSort] = useState('relevance');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const selectedCategory = searchParams.get('cat');
  const products = getProducts().filter(p => p.status === 'ACTIVE');

  const filteredProducts = useMemo(() => {
    const list = products.filter(product => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch = !term || `${product.name} ${product.sku} ${product.description}`.toLowerCase().includes(term);
      const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brandId);
      const matchesOffer = !onlyOffers || Boolean(product.promotionalPrice);
      return matchesSearch && matchesCategory && matchesBrand && matchesOffer;
    });
    return [...list].sort((a, b) => sort === 'price-low' ? (a.promotionalPrice || a.price) - (b.promotionalPrice || b.price) : sort === 'price-high' ? (b.promotionalPrice || b.price) - (a.promotionalPrice || a.price) : a.name.localeCompare(b.name));
  }, [onlyOffers, products, searchTerm, selectedBrands, selectedCategory, sort]);

  const clearFilters = () => { setSearchTerm(''); setSelectedBrands([]); setOnlyOffers(false); setSearchParams({}); };
  const categoryName = mockCategories.find(category => category.id === selectedCategory)?.name;

  const Filters = () => <div className="space-y-7">
    <div><div className="mb-3 flex items-center justify-between"><h2 className="filter-heading">Categorias</h2><button onClick={() => setSearchParams({})} className="text-xs font-bold text-[var(--brand-primary)]">Limpar</button></div><div className="space-y-1">{mockCategories.map(category => <button key={category.id} onClick={() => { setSearchParams({ cat: category.id }); setMobileFiltersOpen(false); }} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${selectedCategory === category.id ? 'bg-blue-50 text-[var(--brand-primary)]' : 'text-[var(--text-body)] hover:bg-[var(--bg-page)]'}`}><span>{category.name}</span>{selectedCategory === category.id && <Check className="h-4 w-4" />}</button>)}</div></div>
    <div><h2 className="filter-heading mb-3">Marcas</h2><div className="space-y-3">{mockBrands.map(brand => <label key={brand.id} className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[var(--text-body)]"><input type="checkbox" checked={selectedBrands.includes(brand.id)} onChange={event => setSelectedBrands(current => event.target.checked ? [...current, brand.id] : current.filter(id => id !== brand.id))} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />{brand.name}</label>)}</div></div>
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm font-bold text-amber-900"><span>Somente ofertas</span><input type="checkbox" checked={onlyOffers} onChange={event => setOnlyOffers(event.target.checked)} className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500" /></label>
    {(selectedCategory || selectedBrands.length || onlyOffers || searchTerm) ? <button onClick={clearFilters} className="w-full rounded-xl border border-[var(--border-default)] px-4 py-3 text-sm font-extrabold text-[var(--text-body)] transition hover:border-blue-300 hover:text-[var(--brand-primary)]">Limpar todos os filtros</button> : null}
  </div>;

  return <div className="min-h-screen bg-[var(--bg-page)] pb-20 pt-28 sm:pt-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]"><Link to="/" className="hover:text-[var(--brand-primary)]">Início</Link><span>/</span><span className="text-[var(--text-primary)]">Produtos</span>{categoryName && <><span>/</span><span className="text-[var(--brand-primary)]">{categoryName}</span></>}</div>
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Catálogo HLT</p><h1 className="section-title mt-3">Materiais para fazer acontecer.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-body)]">Pesquise por nome, SKU ou categoria. Compare especificações e encontre uma solução pronta para sua instalação.</p></div><div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)]"><span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-700">{filteredProducts.length} itens</span><span className="hidden sm:inline">Atualizado para sua obra</span></div></div>

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[var(--border-default)] bg-white p-3 shadow-sm sm:flex-row sm:items-center"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" /><input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Busque por produto, marca ou SKU" className="w-full rounded-xl border-0 bg-[var(--bg-page)] py-3.5 pl-12 pr-4 text-sm font-semibold text-[var(--text-primary)] outline-none ring-1 ring-transparent placeholder:text-[var(--text-muted)] focus:ring-blue-500" /></div><button onClick={() => setMobileFiltersOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-default)] px-4 py-3 text-sm font-extrabold text-[var(--text-body)] lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filtros</button><div className="flex items-center gap-2"><label className="hidden items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] sm:flex">Ordenar<select value={sort} onChange={event => setSort(event.target.value)} className="rounded-lg border border-[var(--border-default)] bg-white px-3 py-2 text-sm font-bold normal-case tracking-normal text-[var(--text-primary)] outline-none"><option value="relevance">Relevância</option><option value="price-low">Menor preço</option><option value="price-high">Maior preço</option></select></label><button onClick={() => setCompactView(false)} className={`rounded-lg p-2 ${!compactView ? 'bg-blue-50 text-blue-700' : 'text-slate-400'}`} aria-label="Visualização em grade"><Grid2X2 className="h-5 w-5" /></button><button onClick={() => setCompactView(true)} className={`rounded-lg p-2 ${compactView ? 'bg-blue-50 text-blue-700' : 'text-slate-400'}`} aria-label="Visualização compacta"><ListFilter className="h-5 w-5" /></button></div></div>

      <div className="flex gap-8"><aside className="hidden w-64 shrink-0 rounded-2xl border border-[var(--border-default)] bg-white p-5 lg:block"><div className="mb-6 flex items-center gap-2 border-b border-[var(--border-default)] pb-4 text-sm font-black uppercase tracking-[0.14em] text-[var(--text-primary)]"><Filter className="h-4 w-4 text-blue-600" /> Filtrar por</div><Filters /></aside><main className="min-w-0 flex-1"><div className="mb-4 flex items-center justify-between"><p className="text-sm font-semibold text-[var(--text-muted)]">{categoryName || 'Todos os produtos'}</p>{(selectedCategory || selectedBrands.length || onlyOffers || searchTerm) ? <button onClick={clearFilters} className="text-sm font-bold text-[var(--brand-primary)]">Limpar seleção</button> : null}</div>{filteredProducts.length ? <div className={`grid gap-4 sm:gap-5 ${compactView ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>{filteredProducts.map((product, index) => <FadeInSection key={product.id} delay={index % 6 * 40}><article className={`product-card group ${compactView ? 'sm:flex sm:flex-row' : ''}`}><Link to={`/produtos/${product.id}`} className={`product-card-media ${compactView ? 'sm:h-auto sm:w-44 sm:shrink-0' : ''}`}><img src={product.images[0]} alt={product.name} onError={event => { event.currentTarget.src = fallbackByCategory[product.categoryId] || fallbackByCategory['1']; }} />{product.promotionalPrice && <span className="product-badge">Oferta</span>}</Link><div className="flex flex-1 flex-col p-5"><p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]">{product.sku}</p><Link to={`/produtos/${product.id}`} className="line-clamp-2 text-base font-extrabold leading-6 text-[var(--text-primary)] hover:text-[var(--brand-primary)]">{product.name}</Link><p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--text-muted)]">{product.description}</p><div className="mt-auto flex items-end justify-between gap-3 pt-5"><div><strong className="block text-xl font-black text-[var(--text-primary)]">{money(product.promotionalPrice || product.price)}</strong>{product.promotionalPrice && <del className="text-xs font-semibold text-[var(--text-muted)]">{money(product.price)}</del>}</div><button onClick={() => addToCart(product, 1)} className="rounded-xl bg-[var(--brand-primary)] p-3 text-white transition hover:bg-[var(--brand-primary-hover)] active:scale-[0.96]" aria-label={`Adicionar ${product.name} ao carrinho`}><ShoppingCart className="h-5 w-5" /></button></div></div></article></FadeInSection>)}</div> : <div className="rounded-2xl border border-dashed border-[var(--border-default)] bg-white px-6 py-20 text-center"><Search className="mx-auto h-10 w-10 text-slate-300" /><h2 className="mt-4 text-xl font-black text-[var(--text-primary)]">Nenhum produto encontrado</h2><p className="mt-2 text-sm text-[var(--text-muted)]">Tente outra busca ou limpe os filtros para ver todo o catálogo.</p><button onClick={clearFilters} className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white">Ver todos os produtos</button></div>}</main></div>
    </div>
    {mobileFiltersOpen && <div className="fixed inset-0 z-[80] bg-slate-950/40 lg:hidden" onClick={() => setMobileFiltersOpen(false)}><div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6" onClick={event => event.stopPropagation()}><div className="mb-6 flex items-center justify-between"><h2 className="text-lg font-black text-[var(--text-primary)]">Filtros</h2><button onClick={() => setMobileFiltersOpen(false)} className="rounded-full bg-slate-100 p-2"><X className="h-5 w-5" /></button></div><Filters /><button onClick={() => setMobileFiltersOpen(false)} className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-extrabold text-white">Mostrar {filteredProducts.length} produtos</button></div></div>}
  </div>;
}
