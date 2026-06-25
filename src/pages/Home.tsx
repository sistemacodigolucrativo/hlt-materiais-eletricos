import React from 'react';
import { Truck, ShieldCheck, Wrench, CircleDollarSign, Star, Phone, CheckCircle2, ShoppingCart, MapPin, Clock } from 'lucide-react';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { Counter } from '@/components/ui/Counter';
import { WHATSAPP_LINK } from '@/constants';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { useNavigate, Link } from 'react-router-dom';
import { mockBanners, mockTrustBarItems } from '@/data/mock';
import { getProducts } from '@/stores/productStore';
import { HeroSlider } from '@/components/home/HeroSlider';
import { TrustBar } from '@/components/home/TrustBar';

export default function Home() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const products = getProducts();

  return (
    <>
      {/* HERO SECTION */}
      <section className="pt-20">
        <HeroSlider banners={mockBanners} autoPlayInterval={5000} />
      </section>

      {/* TRUST BAR */}
      <TrustBar items={mockTrustBarItems} />

      {/* SEÇÃO DE PRODUTOS */}
      <section id="produtos" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-24">
            <h2 className="font-display text-4xl md:text-7xl font-black text-[var(--c-text)] mb-8 tracking-tighter uppercase">Nossas Ofertas</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              Estoque renovado com as melhores marcas do Brasil. Tudo o que você precisa para uma instalação perfeita.
            </p>
          </FadeInSection>

          <div className="w-full overflow-hidden group py-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-8 w-max">
              {[1, 2].map((groupKey) => (
                <div key={groupKey} className="flex gap-8 shrink-0 animate-marquee">
                  {products.map((p) => (
                    <div key={`${groupKey}-${p.id}`} className="bg-[var(--bg-surface)] rounded-3xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-500 flex flex-col border border-[var(--border-default)] w-[280px] sm:w-[360px] shrink-0 mb-4 hover:scale-[1.02]">
                      <Link to={`/produtos/${p.id}`} className="relative h-64 overflow-hidden block group">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        {p.promotionalPrice && (
                          <div className={cn("absolute top-4 left-4 text-[#166534] border border-[#BBF7D0] bg-[#DCFCE7] text-[10px] font-black px-3 py-1.5 rounded-lg tracking-widest shadow-sm uppercase")}>
                            OFERTA
                          </div>
                        )}
                      </Link>
                      <div className="p-8 flex flex-col flex-grow">
                        <Link to={`/produtos/${p.id}`} className="font-bold text-xl mb-4 text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors leading-tight">{p.name}</Link>
                        <div className="mt-auto">
                          <div className="flex items-baseline gap-2 mb-6">
                            <div className="font-display font-black text-4xl text-[var(--text-primary)] tracking-tighter">R$ {(p.promotionalPrice || p.price).toFixed(2).replace('.', ',')}</div>
                            {p.promotionalPrice && <div className="text-[var(--text-muted)] text-sm line-through font-bold">R$ {p.price.toFixed(2).replace('.', ',')}</div>}
                          </div>
                          <div className="flex gap-3">
                             <button onClick={() => addToCart(p, 1)} className="flex-1 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm uppercase tracking-widest text-sm">
                               <ShoppingCart className="h-5 w-5" /> ADICIONAR
                             </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POR QUE ESCOLHER A HLT? */}
      <section id="sobre" style={{backgroundColor: 'white'}} className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <FadeInSection className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-8 bg-[var(--c-primary)] opacity-5 rounded-[3rem] -rotate-2"></div>
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80" 
                  alt="Trabalho elétrico" 
                  className="relative rounded-[2.5rem] shadow-2xl z-10 w-full object-cover"
                />
                <div className="absolute -bottom-10 -right-10 bg-[var(--c-dark)] p-10 rounded-[2rem] shadow-2xl z-20 hidden md:block">
                  <div className="text-slate-300 font-display font-black text-6xl leading-none mb-2">10</div>
                  <div className="text-white font-bold text-sm uppercase tracking-widest leading-tight">Anos de<br/>Experiência</div>
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection className="order-1 lg:order-2">
              <h2 className="font-display text-4xl md:text-7xl font-black text-[var(--c-text)] mb-12 leading-[1.1] tracking-tighter">O Parceiro Ideal<br/>da <span className="text-[var(--c-primary)]">Sua Instalação</span></h2>
              
              <div className="space-y-12">
                {[
                  { title: "Consultoria Real", desc: "Ninguém sai da nossa loja com o material errado. Analisamos sua necessidade de verdade." },
                  { title: "Estoque de Gigante", desc: "Do disjuntor mais simples ao painel industrial mais complexo. Se é elétrico, nós temos." },
                  { title: "Entrega na Obra", desc: "Sua obra em Manhuaçu não para. Levamos os materiais pesados com segurança total." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="bg-[var(--c-primary)] p-3 rounded-2xl h-fit shadow-xl group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl mb-3 text-[var(--c-text)] uppercase tracking-wide">{item.title}</h4>
                      <p className="text-gray-500 text-lg leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="py-32 bg-[var(--c-dark)] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-24">
            <h2 className="font-display text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Opinião de Quem Confia</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-xl font-medium">
              A melhor loja de Manhuaçu segundo nossos parceiros e clientes.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "João Silva", city: "Manhuaçu, MG", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", text: "Atendimento nota mil! O pessoal conhece de material elétrico e não tenta só empurrar produto caro." },
              { name: "Carlos Eletricista", city: "Manhuaçu, MG", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Sempre que tenho obra grande venho aqui. Os preços são imbativeis e os cabos são de primeira." },
              { name: "Mariana L.", city: "Vilanova, MG", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", text: "Melhor loja da região! Achei tudo o que precisava para a reforma do meu apartamento rapidamente." }
            ].map((d, i) => (
              <div key={i}>
                <FadeInSection className="bg-[var(--c-card)] p-12 rounded-[2.5rem] border border-white/5 relative">
                  <div className="flex gap-1 mb-8 text-[#FCD34D]">
                    {[1, 2, 3, 4, 5].map(j => <Star key={j} className="h-5 w-5 fill-current" />)}
                  </div>
                  <p className="text-white/80 mb-12 text-xl italic font-medium leading-relaxed">"{d.text}"</p>
                  <div className="flex items-center gap-5">
                    <img src={d.avatar} alt={d.name} className="w-16 h-16 rounded-full border-2 border-[var(--c-primary)] object-cover" />
                    <div>
                      <div className="font-black text-xl text-white">{d.name}</div>
                      <div className="text-xs text-white/50 font-black uppercase tracking-widest">{d.city}</div>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO + MAPA */}
      <section id="contato" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              <div className="p-12 md:p-20">
                <h2 className="font-display text-4xl font-black text-[var(--c-text)] mb-4 uppercase tracking-tighter">Solicite Agora</h2>
                <p className="text-gray-500 text-lg font-medium mb-12 italic">Receba seu orçamento em minutos pelo WhatsApp.</p>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const nome = (form.elements.namedItem('nome') as HTMLInputElement).value;
                    const tel = (form.elements.namedItem('telefone') as HTMLInputElement).value;
                    const msg = (form.elements.namedItem('mensagem') as HTMLTextAreaElement).value;
                    const encoded = encodeURIComponent(`HLT Elétrica: Novo Orçamento de ${nome} (${tel})\n\n${msg}`);
                    window.open(`${WHATSAPP_LINK}?text=${encoded}`, '_blank');
                  }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-black text-[var(--c-text)] mb-4 uppercase tracking-widest ml-1">Seu Nome</label>
                      <input required name="nome" type="text" className="w-full px-6 py-5 border-[var(--c-text)] text-[var(--c-text)] rounded-2xl border-2 focus:outline-none focus:border-[var(--c-primary)] transition-all bg-gray-50 font-bold" placeholder="Digite seu nome" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-[var(--c-text)] mb-4 uppercase tracking-widest ml-1">WhatsApp</label>
                      <input required name="telefone" type="tel" className="w-full px-6 py-5 rounded-2xl border-2 border-gray-100 text-[var(--c-text)] focus:outline-none focus:border-[var(--c-primary)] transition-all bg-gray-50 font-bold" placeholder="(33) ... " />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-[var(--c-text)] mb-4 uppercase tracking-widest ml-1">O que você precisa?</label>
                    <textarea required name="mensagem" rows={4} className="w-full px-6 py-5 rounded-2xl border-2 border-gray-100 text-[var(--c-text)] focus:outline-none focus:border-[var(--c-primary)] transition-all bg-gray-50 font-bold" placeholder="Fale um pouco sobre seu pedido..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-black py-6 rounded-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 text-xl shadow-2xl shadow-green-500/30 uppercase tracking-widest">
                    <Phone className="h-7 w-7" /> ENVIAR ORÇAMENTO
                  </button>
                </form>
              </div>

              <div className="bg-[var(--c-dark)] text-white flex flex-col">
                <div className="p-12 md:p-20 flex-grow">
                  <div className="inline-block bg-[var(--c-primary)] px-5 py-2 rounded-xl text-[10px] font-black mb-12 tracking-widest uppercase shadow-lg shadow-[var(--c-primary)]/20">Onde Estamos</div>
                  
                  <div className="space-y-16">
                    <div className="flex items-start gap-8">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                        <MapPin className="h-7 w-7 text-slate-300" />
                      </div>
                      <div>
                        <div className="font-black text-2xl mb-2 tracking-tight">Endereço</div>
                        <p className="text-white/70 text-xl leading-relaxed font-medium">Av. Nações Unidas, 193 – Bom Jardim<br/>Manhuaçu – MG, 36906-405</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                        <Phone className="h-7 w-7 text-slate-300" />
                      </div>
                      <div>
                        <div className="font-black text-2xl mb-2 tracking-tight">Atendimento VIP</div>
                        <a href={WHATSAPP_LINK} className="text-slate-300 text-3xl font-display font-black hover:underline transition-all tracking-tighter">(33) 98461-9534</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-8">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                        <Clock className="h-7 w-7 text-slate-300" />
                      </div>
                      <div>
                        <div className="font-black text-2xl mb-2 tracking-tight">Horários</div>
                        <p className="text-white/70 text-xl font-medium tracking-tight">Seg a Sex: 08:00 às 18:00<br/>Sábados: 08:00 às 12:00</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-[400px] w-full border-t border-white/5">
                  <iframe 
                    src="https://maps.google.com/maps?q=-20.2740147,-42.0413398&z=16&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
