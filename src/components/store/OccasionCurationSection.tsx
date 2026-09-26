import React from 'react';
import { useRouter } from '../../context/NavigationContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OccasionCard {
  id: string;
  title: string;
  subtitle: string;
  curation: string;
  image: string;
  badge: string;
  link: string;
}

export const OccasionCurationSection: React.FC = () => {
  const { navigate } = useRouter();

  const occasions: OccasionCard[] = [
    {
      id: 'festive',
      title: 'Grand Festive Ceremonials',
      subtitle: 'Brocade kurtas, pure Banarasi silks, and gilded kadwa embroidery for milestones.',
      curation: 'Feat. Katan Silk, Chanderi & Raw Handloom',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      badge: 'FESTIVE EDIT 2026',
      link: '/women'
    },
    {
      id: 'resort',
      title: 'Sun-Drenched Resort & Linen',
      subtitle: 'Featherlight European flax shirts, pleated trousers, and airy silhouette co-ords.',
      curation: 'Feat. 100% Belgian Washed Linen & Slub Cottons',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      badge: 'BREEZE ATELIER',
      link: '/men'
    },
    {
      id: 'executive',
      title: 'Modern Executive Tailoring',
      subtitle: 'Unstructured mandarin blazers, selvedge chinos, and Egyptian cotton dress shirts.',
      curation: 'Feat. 220 GSM Supima & Crisp Worsted Finishes',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      badge: 'CONTEMPORARY SHARP',
      link: '/men'
    },
    {
      id: 'kids',
      title: 'Joyful Celebrations for Kids',
      subtitle: 'Hypoallergenic ceremonial lehengas, cotton dhoti sets, and gentle celebration apparel.',
      curation: 'Feat. Organic Chemical-Free Dyes & Soft Muslin Linings',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=80',
      badge: 'LITTLE TRENDSETTERS',
      link: '/kids'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#B08D57] uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Wardrobe In Context</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#111111] uppercase tracking-wide">
              DRESS FOR EVERY MOMENT
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-xl leading-relaxed">
              Tailored clothing collections structured around the rhythm of your life — from regal evening weddings to relaxed coastal retreats.
            </p>
          </div>

          <div className="text-xs text-[#888888] uppercase tracking-widest font-medium">
            Strictly Pure Apparel &bull; Handcrafted Standards
          </div>
        </div>

        {/* 4-Panel Grid: 2 per row desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {occasions.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.link)}
              className="relative aspect-16/11 sm:aspect-16/10 bg-[#111111] overflow-hidden group cursor-pointer border border-[#E5E5E5] shadow-xs"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* High Fashion Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10 group-hover:via-black/25 transition-all" />

              {/* Badge Top Left */}
              <div className="absolute top-5 left-5">
                <span className="bg-white/95 text-[#111111] text-[10px] font-bold tracking-[0.2em] px-3 py-1 uppercase shadow-sm">
                  {item.badge}
                </span>
              </div>

              {/* Content Bottom */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#B08D57] block">
                  {item.curation}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white uppercase tracking-wide group-hover:text-[#B08D57] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#CCCCCC] font-light max-w-lg leading-relaxed line-clamp-2">
                  {item.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-[#B08D57] transition-colors">
                  <span>Explore Curated Clothing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
