import React from 'react';
import { useRouter } from '../../context/NavigationContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner 1: FESTIVE EDIT (Large Split Banner) */}
        <div className="relative bg-[#1A1A1A] text-white overflow-hidden border border-[#E5E5E5] flex flex-col md:flex-row items-center justify-between">
          
          <div className="p-8 sm:p-12 md:p-16 max-w-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#B08D57] uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Couture Heritage Edition</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
              THE FESTIVE <span className="font-semibold italic font-serif">EDIT</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Handwoven Banarasi katan silks, hand-embroidered raw silk sherwanis, and fine organza kalidars meticulously created for India's celebratory milestones.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/women')}
                className="px-6 py-3 bg-[#B08D57] hover:bg-white hover:text-[#111111] text-white text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <span>EXPLORE FESTIVE EDIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 h-[320px] md:h-[420px] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
              alt="Festive Edit Fashion"
              className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>

        </div>

        {/* Dual Promotional Cards: Everyday Essentials & Summer Collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Everyday Essentials */}
          <div className="relative h-[360px] bg-[#F7F7F7] overflow-hidden border border-[#E5E5E5] flex flex-col justify-end p-8 group">
            <img
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
              alt="Everyday Essentials"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white space-y-2">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#B08D57] uppercase">
                Quiet Luxury Basics
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold uppercase">
                EVERYDAY ESSENTIALS
              </h3>
              <p className="text-xs text-white/80 max-w-sm">
                Supima cotton t-shirts, relaxed linen button-downs, and breathable trousers tailored for timeless wear.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => navigate('/men')}
                  className="px-5 py-2.5 bg-white text-[#111111] hover:bg-[#B08D57] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <span>SHOP ESSENTIALS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Summer Collection */}
          <div className="relative h-[360px] bg-[#F7F7F7] overflow-hidden border border-[#E5E5E5] flex flex-col justify-end p-8 group">
            <img
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80"
              alt="Summer Collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white space-y-2">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#B08D57] uppercase">
                Airy Cottons & Silks
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold uppercase">
                SUMMER COLLECTION
              </h3>
              <p className="text-xs text-white/80 max-w-sm">
                Breezy mulmul prints, pure Belgian flax linens, and resort co-ords designed to stay feather-light in warm weather.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => navigate('/women')}
                  className="px-5 py-2.5 bg-white text-[#111111] hover:bg-[#B08D57] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <span>EXPLORE SUMMER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
