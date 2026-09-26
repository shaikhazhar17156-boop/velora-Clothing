import React from 'react';
import { useRouter } from '../../context/NavigationContext';
import { ShieldCheck, Sparkles, Scissors, Leaf, RefreshCw } from 'lucide-react';

export const BrandValuesBar: React.FC = () => {
  const { navigate } = useRouter();

  const values = [
    {
      icon: Leaf,
      title: 'Zero Synthetic Polyester',
      subtitle: 'Strictly 100% botanical cottons, linens, and pure mulberry silks.'
    },
    {
      icon: Sparkles,
      title: 'Handloom Guild Heritage',
      subtitle: 'Preserving authentic master weavers from Varanasi, Chanderi & Bengal.'
    },
    {
      icon: Scissors,
      title: 'Atelier Fit & French Seams',
      subtitle: 'Clean enclosed stitching, mother-of-pearl hardware, and tested drape.'
    },
    {
      icon: RefreshCw,
      title: 'Complimentary Alterations',
      subtitle: 'Hassle-free doorstep exchanges & complimentary size adjustment service.'
    }
  ];

  return (
    <section className="bg-[#FAF8F5] border-y border-[#EAE5DC] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#B08D57] block mb-1">
            The House Ethos
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] uppercase tracking-wide">
            THE VELORA PILLARS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div 
                key={i}
                className="flex items-start gap-4 p-4 bg-white/70 border border-[#EAE5DC] rounded-none hover:bg-white transition-all shadow-2xs"
              >
                <div className="w-10 h-10 rounded-full bg-[#111111] text-[#B08D57] flex items-center justify-center shrink-0 border border-[#B08D57]/30">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    {v.title}
                  </h4>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {v.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
