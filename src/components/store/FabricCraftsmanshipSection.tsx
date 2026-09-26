import React, { useState } from 'react';
import { useRouter } from '../../context/NavigationContext';
import { Sparkles, ArrowRight, ShieldCheck, Feather, Wind, Flame } from 'lucide-react';

interface FabricDetail {
  id: string;
  name: string;
  subheading: string;
  origin: string;
  gsm: string;
  textureNote: string;
  breathability: string;
  description: string;
  image: string;
  garmentCount: number;
  routeFilter: string;
  careTip: string;
}

export const FabricCraftsmanshipSection: React.FC = () => {
  const { navigate } = useRouter();

  const fabrics: FabricDetail[] = [
    {
      id: 'linen',
      name: 'European Flax Linen',
      subheading: '100% Certified Belgian & French Flax',
      origin: 'Normandy & Flanders Weaves',
      gsm: '185 GSM Soft-Washed',
      textureNote: 'Naturally slubbed, aerated, softening gracefully with every wear',
      breathability: 'Maximum (Thermo-Regulating)',
      description: 'Spun from pesticide-free European flax, our linen stays crisp yet featherlight under intense summer heat. Naturally hypoallergenic with a relaxed, distinguished drape.',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      garmentCount: 18,
      routeFilter: '/men',
      careTip: 'Hand wash or gentle cycle. Air dry flat to retain natural slub structure.'
    },
    {
      id: 'banarasi',
      name: 'Varanasi Handloom Katan Silk',
      subheading: 'Pure Handwoven Mulberry Silk with Tested Zari',
      origin: 'Varanasi Weavers Guild, Uttar Pradesh',
      gsm: '120-140 GSM Heritage Weave',
      textureNote: 'Opulent dual-tone luster with intricate gold electroplated kadwa motifs',
      breathability: 'High Drape / Regal Luster',
      description: 'Crafted over 45 days on traditional wooden pit looms by 3rd-generation master weavers. Certified pure silk mark guaranteed for royal festivities and celebratory milestones.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      garmentCount: 14,
      routeFilter: '/women',
      careTip: 'Dry clean only. Store wrapped in pure unbleached muslin cloth.'
    },
    {
      id: 'supima',
      name: 'California Supima Cotton',
      subheading: 'Extra-Long Staple (ELS) 100% Organic Purity',
      origin: 'San Joaquin Valley & Gujarat Milling',
      gsm: '160 - 220 GSM Combed Jersey',
      textureNote: 'Silken touch, zero pilling, 45% stronger than standard cotton',
      breathability: 'Superior All-Day Airflow',
      description: 'Representing less than 1% of the world’s cotton harvest. Its extra-long staple fiber gives our casual shirts and tees an unparalleled luster and enduring softness that never degrades.',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      garmentCount: 22,
      routeFilter: '/men',
      careTip: 'Cold wash inside out. Warm iron while slightly damp for crisp silhouette.'
    },
    {
      id: 'chanderi',
      name: 'Hand-Dyed Chanderi Silk Cotton',
      subheading: 'Historical Sheer Luster with Artisanal Bootis',
      origin: 'Madhya Pradesh Handlooms',
      gsm: '90 GSM Gossamer Weave',
      textureNote: 'Translucent transparency with metallic zari border reflections',
      breathability: 'Featherlight / Weightless Comfort',
      description: 'Dating back to the Vedic era, Chanderi combines raw mulberry silk warp with fine cotton weft. Glides effortlessly on skin, perfect for breezy celebrations and discerning occasion wear.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      garmentCount: 16,
      routeFilter: '/women',
      careTip: 'Gentle hand wash with mild reetha or liquid soap. Avoid wringing.'
    }
  ];

  const [activeFabricId, setActiveFabricId] = useState('linen');
  const activeFabric = fabrics.find(f => f.id === activeFabricId) || fabrics[0];

  return (
    <section className="py-20 md:py-28 bg-[#111111] text-white border-b border-[#222222] relative overflow-hidden">
      
      {/* Background Subtle Luxury Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B08D57]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#B08D57] uppercase mb-3 bg-[#1A1A1A] border border-[#333333] px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Atelier Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white uppercase tracking-wider">
            PURITY OF TEXTILE & CRAFT
          </h2>
          <p className="text-xs sm:text-sm text-[#999999] mt-3 font-light leading-relaxed">
            We reject synthetic polyester, microplastics, and fast-fashion blends. Every VELORA garment is strictly woven from certified natural botanical and sericultural fibers.
          </p>
        </div>

        {/* Fabric Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10 border-b border-[#2A2A2A] pb-4">
          {fabrics.map((fabric) => {
            const isSelected = fabric.id === activeFabricId;
            return (
              <button
                key={fabric.id}
                onClick={() => setActiveFabricId(fabric.id)}
                className={`p-3.5 text-left border transition-all ${
                  isSelected 
                    ? 'border-[#B08D57] bg-[#1A1A1A] shadow-md' 
                    : 'border-[#262626] bg-[#141414] hover:border-[#444444]'
                }`}
              >
                <span className={`text-[10px] tracking-widest uppercase block ${
                  isSelected ? 'text-[#B08D57]' : 'text-[#777777]'
                }`}>
                  {fabric.gsm}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-white mt-1">
                  {fabric.name}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Fabric Showcase Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#171717] border border-[#2B2B2B] p-6 sm:p-10">
          
          {/* Textile Image Preview (5 cols) */}
          <div className="lg:col-span-5 relative group overflow-hidden border border-[#333333] aspect-4/5 w-full bg-[#0E0E0E]">
            <img
              src={activeFabric.image}
              alt={activeFabric.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] tracking-widest text-[#B08D57] uppercase font-bold block">
                {activeFabric.origin}
              </span>
              <p className="text-sm font-serif text-white font-medium mt-0.5">
                {activeFabric.subheading}
              </p>
            </div>
          </div>

          {/* Textile Metrics & Description (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#B08D57] uppercase block mb-1">
                Authentic Fiber Story
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal uppercase tracking-wide">
                {activeFabric.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#AAAAAA] mt-3 leading-relaxed font-light">
                {activeFabric.description}
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-[#1F1F1F] border border-[#2E2E2E]">
                <div className="flex items-center gap-2 text-xs text-[#B08D57] mb-1 font-semibold uppercase tracking-wider">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Breathability</span>
                </div>
                <p className="text-xs text-white font-medium">{activeFabric.breathability}</p>
              </div>

              <div className="p-3 bg-[#1F1F1F] border border-[#2E2E2E]">
                <div className="flex items-center gap-2 text-xs text-[#B08D57] mb-1 font-semibold uppercase tracking-wider">
                  <Feather className="w-3.5 h-3.5" />
                  <span>Weave Texture</span>
                </div>
                <p className="text-xs text-white font-medium">{activeFabric.textureNote}</p>
              </div>
            </div>

            {/* Care Tip */}
            <div className="p-3.5 bg-[#141414] border-l-2 border-[#B08D57] text-xs text-[#888888] space-y-0.5">
              <span className="text-white font-semibold uppercase text-[10px] tracking-wider block">
                Atelier Longevity Care:
              </span>
              <p>{activeFabric.careTip}</p>
            </div>

            {/* Call to action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigate(activeFabric.routeFilter)}
                className="px-6 py-3.5 bg-white text-[#111111] hover:bg-[#B08D57] hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Shop {activeFabric.name} Garments</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#888888]">
                <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
                <span>100% Genuine Certified Fabric</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
