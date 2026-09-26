import React from 'react';
import { useRouter } from '../../context/NavigationContext';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="relative w-full h-[75vh] min-h-[500px] max-h-[750px] bg-[#111111] overflow-hidden">
      
      {/* Background Lifestyle Image */}
      <div className="absolute inset-0">
        <picture>
          {/* Mobile vertical crop */}
          <source
            media="(max-width: 640px)"
            srcSet="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
          />
          {/* Desktop wide crop */}
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="High Fashion Editorial"
            className="w-full h-full object-cover object-center brightness-85"
          />
        </picture>
        {/* Soft Vignette / Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white">
        <div className="max-w-xl space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] uppercase tracking-[0.25em] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
            Autumn / Winter 2026 Collection
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white">
            DEFINE YOUR <br className="hidden sm:inline" />
            <span className="font-semibold italic font-serif">STYLE</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/85 font-light tracking-wide max-w-md leading-relaxed">
            Modern clothing designed for every moment. Tailored fabrics, artisan craftsmanship, and timeless silhouettes.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/men')}
              className="px-6 sm:px-8 py-3.5 bg-white text-[#111111] hover:bg-[#B08D57] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-[0.18em] transition-all shadow-lg flex items-center gap-2 group"
            >
              <span>SHOP MEN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/women')}
              className="px-6 sm:px-8 py-3.5 bg-[#B08D57] text-white hover:bg-white hover:text-[#111111] text-xs sm:text-sm font-bold uppercase tracking-[0.18em] transition-all shadow-lg flex items-center gap-2 group"
            >
              <span>SHOP WOMEN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Secondary Link for Kids */}
          <div className="pt-2">
            <button
              onClick={() => navigate('/kids')}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/80 hover:text-white underline underline-offset-4 font-medium transition-colors"
            >
              <span>EXPLORE KIDS' COLLECTION &rarr;</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};
