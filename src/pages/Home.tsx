import React from 'react';
import { ArrowRight, BadgeCheck, Cable, CheckCircle2, ChevronRight, CircleDollarSign, Headphones, Lightbulb, PackageCheck, ShieldCheck, ShoppingCart, Truck, Wrench, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { HeroSlider } from '@/components/home/HeroSlider';
import { TrustBar } from '@/components/home/TrustBar';
import { mockBanners, mockCategories, mockTrustBarItems } from '@/data/mock';
import { getProducts } from '@/stores/productStore';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const categoryVisuals: Record<string, { icon: React.ElementType; image: string; tone: string }> = {
  '1': { icon: Zap, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&q=82&auto=format&fit=crop', tone: 'from-blue-950/90' },
  '2': { icon: Lightbulb, image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=900&q=82&auto=format&fit=crop', tone: 'from-amber-950/90' },
  '3': { icon: Wrench, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&q=82&auto=format&fit=crop', tone: 'from-slate-950/90' },
  '4': { icon: Cable, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=82&auto=format&fit=crop', tone: 'from-cyan-950/90' },
  '5': { icon: PackageCheck, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=82&auto=format&fit=crop', tone: 'from-indigo-950/90' },
};

const imageFallback = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&q=82&auto=format&fit=crop';

function money(value: number) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

export default function Home() {
  const { addToCart } = useCart();
  const products = getProducts().filter(product => product.status === 'ACTIVE');
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="pt-20">
        <HeroSlider banners={mockBanners.slice(0, 3)} autoPlayInterval={6500} />
      </section>

      <TrustBar items={mockTrustBarItems} />

      <section className="bg-[var(--bg-page)] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInSection className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Encontre por categoria</p>
              <h2 className="section-title mt-3">Tudo para a sua instalação.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-body)] sm:text-lg">Uma seleção organizada para você encontrar o material certo, comparar opções e seguir com a obra sem perder tempo.</p>
            </div>
            <Link to="/produtos" className="inline-flex items-center gap-2 font-bold text-[var(--brand-primary)] hover:gap-3 transition-all">Ver catálogo completo <ArrowRight className="h-5 w-5" /></Link>
          </FadeInSection>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {mockCategories.map((category, index) => {
              const visual = categoryVisuals[category.id] || categoryVisuals['1'];
              const Icon = visual.icon;
              return (
                <FadeInSection key={category.id} delay={index * 60}>
                  <Link to={`/produtos?cat=${category.id}`} className="category-tile group">
                    <img src={visual.image} alt={`Produtos de ${category.name}`} onError={e => { e.currentTarget.src = imageFallback; }} />
                    <div className={cn('absolute inset-0 bg-gradient-to-t to-transparent', visual.tone)} />
                    <div className="relative z-10 flex h-full flex-col justify-between p-4 text-white sm:p-5">
                      <Icon className="h-6 w-6 opacity-90" />
                      <span className="text-sm font-extrabold leading-tight sm:text-base">{category.name}</span>
                    </div>
                  </Link>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      <section id="produtos" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInSection className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Seleção da semana</p>
              <h2 className="section-title mt-3">Produtos que resolvem.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-body)] sm:text-lg">Itens para manutenção, reforma e instalação com informação clara e compra rápida.</p>
            </div>
            <Link to="/produtos" className="inline-flex items-center gap-2 font-bold text-[var(--brand-primary)] hover:gap-3 transition-all">Explorar produtos <ArrowRight className="h-5 w-5" /></Link>
          </FadeInSection>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => (
              <FadeInSection key={product.id} delay={index * 70}>
                <article className="product-card group">
                  <Link to={`/produtos/${product.id}`} className="product-card-media">
                    <img src={product.images[0]} alt={product.name} onError={e => { e.currentTarget.src = imageFallback; }} />
                    {product.promotionalPrice && <span className="product-badge">Oferta</span>}
                  </Link>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]">{product.sku}</p>
                    <Link to={`/produtos/${product.id}`} className="line-clamp-2 text-base font-extrabold leading-6 text-[var(--text-primary)] hover:text-[var(--brand-primary)]">{product.name}</Link>
                    <div className="mt-auto pt-6">
                      <div className="flex items-end gap-2">
                        <strong className="text-2xl font-black tracking-tight text-[var(--text-primary)]">{money(product.promotionalPrice || product.price)}</strong>
                        {product.promotionalPrice && <del className="pb-0.5 text-xs font-semibold text-[var(--text-muted)]">{money(product.price)}</del>}
                      </div>
                      <button onClick={() => addToCart(product, 1)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-4 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[var(--brand-primary-hover)] active:scale-[0.98]"><ShoppingCart className="h-4 w-4" /> Adicionar</button>
                    </div>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-[var(--navy)] py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <FadeInSection>
            <p className="eyebrow eyebrow-light">Mais que uma loja</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-[1.04] tracking-[-0.05em] sm:text-6xl">Material certo. Orientação de verdade.</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">A HLT combina variedade, atendimento técnico e agilidade para quem constrói, reforma ou mantém instalações elétricas.</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                [ShieldCheck, 'Compra com confiança', 'Marcas e especificações para decidir melhor.'],
                [Headphones, 'Atendimento próximo', 'Ajuda para encontrar a solução ideal.'],
                [Truck, 'Logística que acompanha', 'Entrega e retirada pensadas para sua rotina.'],
                [CircleDollarSign, 'Preço transparente', 'Ofertas claras, sem complicar a escolha.'],
              ].map(([Icon, title, description]) => {
                const ItemIcon = Icon as React.ElementType;
                return <div key={title as string} className="rounded-2xl border border-white/10 bg-white/5 p-4"><ItemIcon className="h-5 w-5 text-blue-300" /><h3 className="mt-3 text-sm font-extrabold">{title as string}</h3><p className="mt-1 text-xs leading-5 text-white/55">{description as string}</p></div>;
              })}
            </div>
          </FadeInSection>
          <FadeInSection delay={120} className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-blue-400/10 blur-2xl" />
            <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1100&q=85&auto=format&fit=crop" alt="Profissional trabalhando em uma instalação elétrica" className="relative h-[360px] w-full rounded-[1.75rem] object-cover shadow-2xl sm:h-[480px]" />
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-slate-950/90 p-5 backdrop-blur sm:left-10 sm:right-10"><div className="flex items-center gap-3"><BadgeCheck className="h-7 w-7 text-blue-300" /><div><p className="text-sm font-extrabold">Para obra, manutenção e indústria</p><p className="mt-1 text-xs text-white/55">Uma experiência criada para quem precisa comprar sem dúvida.</p></div></div></div>
          </FadeInSection>
        </div>
      </section>

      <section id="depoimentos" className="bg-[var(--bg-page)] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInSection className="mb-10"><p className="eyebrow">Confiança construída</p><h2 className="section-title mt-3">Quem compra, recomenda.</h2></FadeInSection>
          <div className="grid gap-5 md:grid-cols-3">
            {[['Marcos Andrade', 'Eletricista', 'Encontro o que preciso e ainda recebo ajuda para escolher a especificação certa.'], ['Juliana Campos', 'Reforma residencial', 'A navegação é simples e o atendimento me ajudou a não comprar material errado.'], ['Rafael Mendes', 'Construtora', 'A HLT virou nosso ponto de apoio para reposição e materiais de obra.']].map(([name, role, text], index) => <FadeInSection key={name} delay={index * 70}><blockquote className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-card)]"><div className="mb-5 flex gap-1 text-amber-400">{[1,2,3,4,5].map(star => <span key={star}>★</span>)}</div><p className="text-base leading-7 text-[var(--text-body)]">“{text}”</p><footer className="mt-6 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-black text-blue-700">{(name as string)[0]}</div><div><cite className="not-italic text-sm font-extrabold text-[var(--text-primary)]">{name}</cite><p className="text-xs text-[var(--text-muted)]">{role}</p></div></footer></blockquote></FadeInSection>)}
          </div>
        </div>
      </section>

      <section id="contato" className="bg-blue-700 py-14 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div><p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-200">Precisa de ajuda?</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Fale com a HLT antes de comprar.</h2><p className="mt-3 max-w-xl text-blue-100">Conte o que sua obra precisa e encontre o material certo com mais segurança.</p></div>
          <a href="https://wa.me/5533984619534" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-4 font-extrabold text-blue-700 transition hover:bg-blue-50 active:scale-[0.98]">Falar no WhatsApp <ArrowRight className="h-5 w-5" /></a>
        </div>
      </section>
    </>
  );
}
