import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Banner } from '@/types';
import { cn } from '@/lib/utils';

const formatText = (text?: string) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line.split('*').map((part, j) => 
        j % 2 === 1 ? <span key={`${i}-${j}`} className="text-[#3B82F6]">{part}</span> : part
      )}
      {i < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

interface HeroSliderProps {
  banners: Banner[];
  autoPlayInterval?: number;
}

export function HeroSlider({ banners, autoPlayInterval = 5000 }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Exclude inactive and out of date banners
  const now = new Date();
  const activeBanners = banners
    .filter(b => b.active)
    .filter(b => (!b.startDate || b.startDate <= now) && (!b.endDate || b.endDate >= now))
    .sort((a, b) => a.order - b.order);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === activeBanners.length - 1 ? 0 : prevIndex + 1));
  }, [activeBanners.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? activeBanners.length - 1 : prevIndex - 1));
  }, [activeBanners.length]);

  useEffect(() => {
    if (!isHovered && activeBanners.length > 1) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isHovered, nextSlide, autoPlayInterval, activeBanners.length]);

  if (activeBanners.length === 0) {
    return null; // Don't render anything if no banners exist
  }

  return (
    <div 
      className="relative w-full h-[60vh] md:h-[500px] xl:h-[600px] overflow-hidden group bg-[var(--bg-surface)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Campanhas em Destaque"
    >
      {/* Slides */}
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {activeBanners.map((banner, index) => (
          <div 
            key={banner.id} 
            className="w-full h-full flex-shrink-0 relative bg-[#050B14]"
            role="group"
            aria-roledescription="slide"
            aria-hidden={index !== currentIndex}
          >
            {/* Desktop Image */}
            <img 
              src={banner.imageDesktop} 
              alt={banner.title?.replace(/\*/g, '').replace(/\n/g, ' ')} 
              className="absolute right-0 top-0 w-[70%] h-full object-cover hidden md:block opacity-90" 
              loading={index === 0 ? "eager" : "lazy"} 
              fetchPriority={index === 0 ? "high" : "auto"}
              style={{ maskImage: 'linear-gradient(to right, transparent, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)' }}
            />
            {/* Mobile Image */}
            <img 
              src={banner.imageMobile} 
              alt={banner.title?.replace(/\*/g, '').replace(/\n/g, ' ')} 
              className="absolute inset-0 w-full h-full object-cover block md:hidden" 
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050B14] via-[#050B14]/90 to-transparent md:to-[#050B14]/10"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-start z-10 px-6 sm:px-12 md:px-20 lg:px-28">
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
                {banner.subtitle && (
                  <p className="text-[#3B82F6] font-bold uppercase tracking-widest text-sm md:text-base mb-2 md:mb-4">
                    {banner.subtitle}
                  </p>
                )}
                <h2 className="text-white font-display font-black text-5xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-[1] mb-6 uppercase">
                  {formatText(banner.title)}
                </h2>
                {banner.description && (
                  <p className="text-slate-300 font-medium text-lg md:text-2xl leading-snug mb-8 max-w-xl">
                    {formatText(banner.description)}
                  </p>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {banner.primaryButtonText && banner.primaryButtonLink && (
                    <Link 
                      to={banner.primaryButtonLink} 
                      className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-sm transition-all active:scale-95 shadow-md flex items-center justify-center text-center focus:ring-4 focus:ring-[#2563EB]/50 focus:outline-none w-fit"
                    >
                      {banner.primaryButtonText}
                    </Link>
                  )}
                  {banner.secondaryButtonText && banner.secondaryButtonLink && (
                    <Link 
                      to={banner.secondaryButtonLink} 
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all active:scale-95 flex items-center justify-center text-center focus:ring-4 focus:ring-white/50 focus:outline-none"
                    >
                      {banner.secondaryButtonText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {activeBanners.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] z-20"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] z-20"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white",
                  index === currentIndex ? "w-8 bg-[#3B82F6]" : "w-2.5 bg-white/40 hover:bg-white/70"
                )}
                aria-label={`Ir para o slide ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
