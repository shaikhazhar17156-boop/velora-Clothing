import React from 'react';
import { useRouter } from '../../context/NavigationContext';
import { ArrowRight } from 'lucide-react';

export const DepartmentSection: React.FC = () => {
  const { navigate } = useRouter();

  const panels = [
    {
      title: 'THE MEN’S EDIT',
      subtitle: 'Modern sartorial tailoring meets relaxed streetwear elegance.',
      buttonText: 'EXPLORE MEN',
      path: '/men',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=80',
    },
    {
      title: 'WOMEN’S ATELIER',
      subtitle: 'Pure Banarasi silks, handcrafted kurtas, and fluid modern evening wear.',
      buttonText: 'EXPLORE WOMEN',
      path: '/women',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=80',
    },
    {
      title: 'KIDS’ SIGNATURE',
      subtitle: 'Playful yet elevated clothes woven with gentle organic threads.',
      buttonText: 'EXPLORE KIDS',
      path: '/kids',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1400&q=80',
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.28em] text-[#B08D57] uppercase">
            Signature Departments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mt-2">
            SHOP BY DEPARTMENT
          </h2>
          <div className="w-12 h-0.5 bg-[#B08D57] mx-auto mt-4" />
        </div>

        {/* 3 Large Visual Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {panels.map((panel, idx) => (
            <div
              key={idx}
              className="group relative h-[420px] sm:h-[480px] overflow-hidden border border-white/10 flex flex-col justify-end p-8"
            >
              {/* Background Image */}
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-75"
                loading="lazy"
              />
              
              {/* Subtle Dark Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              {/* Panel Content */}
              <div className="relative z-10 space-y-3">
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase block">
                  VELORA Exclusive
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white tracking-wide uppercase">
                  {panel.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-sm">
                  {panel.subtitle}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate(panel.path)}
                    className="px-6 py-3 bg-white text-[#111111] hover:bg-[#B08D57] hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 group-hover:gap-3"
                  >
                    <span>{panel.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
