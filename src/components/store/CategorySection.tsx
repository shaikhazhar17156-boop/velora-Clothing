import React from 'react';
import { useRouter } from '../../context/NavigationContext';
import { ArrowRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { navigate } = useRouter();

  const categories = [
    {
      title: 'MEN',
      subtitle: 'Everyday essentials & modern styles',
      description: 'Supima tees, tailored linen shirts, Italian trousers & selvedge denim.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      path: '/men',
    },
    {
      title: 'WOMEN',
      subtitle: 'Elegant looks for every occasion',
      description: 'Chanderi silk suits, handloom sarees, flowy maxi dresses & chic co-ords.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      path: '/women',
    },
    {
      title: 'KIDS',
      subtitle: 'Comfortable styles for little trendsetters',
      description: 'Organic cotton basics, festive kurta sets & twirl-worthy party dresses.',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=80',
      path: '/kids',
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.25em] text-[#B08D57] uppercase">
            Curated Departments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2">
            SHOP BY CATEGORY
          </h2>
          <div className="w-12 h-0.5 bg-[#B08D57] mx-auto mt-4" />
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group relative bg-[#F7F7F7] border border-[#E5E5E5] overflow-hidden flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <h3 className="font-serif text-3xl font-bold tracking-wider uppercase text-white">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-medium">
                    {cat.subtitle}
                  </p>
                  <p className="text-[11px] text-white/70 line-clamp-2 pt-0.5">
                    {cat.description}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => navigate(cat.path)}
                      className="px-5 py-2.5 bg-white text-[#111111] group-hover:bg-[#B08D57] group-hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      <span>SHOP NOW</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
