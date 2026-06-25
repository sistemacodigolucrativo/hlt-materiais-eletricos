import React from 'react';
import { ShieldCheck, Truck, Package, Award } from 'lucide-react';
import { TrustBarItem } from '@/types';
import { cn } from '@/lib/utils';

// Helper component to render Lucide icons dynamically
const IconRenderer = ({ name, className, strokeWidth }: { name: string; className?: string; strokeWidth?: number }) => {
  switch (name) {
    case 'ShieldCheck':
      return <ShieldCheck className={className} strokeWidth={strokeWidth} />;
    case 'Truck':
      return <Truck className={className} strokeWidth={strokeWidth} />;
    case 'Package':
      return <Package className={className} strokeWidth={strokeWidth} />;
    case 'Award':
      return <Award className={className} strokeWidth={strokeWidth} />;
    default:
      return null;
  }
};

interface TrustBarProps {
  items: TrustBarItem[];
}

export function TrustBar({ items }: TrustBarProps) {
  const activeItems = items.filter(item => item.active).sort((a, b) => a.order - b.order);

  if (activeItems.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-[#050B14] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {activeItems.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-4 group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-[#3B82F6] shrink-0 transition-colors">
                <IconRenderer name={item.icon} className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-white text-[11px] sm:text-xs md:text-sm uppercase tracking-wide leading-tight">
                  {item.title}
                </span>
                <span className="text-slate-400 text-[10px] sm:text-xs font-medium mt-1">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
