import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { Product } from '../../types';
import { Sparkles, ArrowRight, RotateCcw, Eye, ShoppingBag, Check } from 'lucide-react';

export const StyleQuizSection: React.FC = () => {
  const { products, setQuickViewProduct, addToCart, addToast } = useStore();
  const { navigate } = useRouter();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDepartment, setSelectedDepartment] = useState<'men' | 'women' | 'kids'>('men');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Festive & Wedding');
  const [selectedFit, setSelectedFit] = useState<string>('Heritage Silk & Brocade');

  const departments = [
    {
      id: 'men' as const,
      title: "Men's Collection",
      tagline: 'Bandhgalas, Kurtas, Selvedge Linen & Sharp Shirts',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'women' as const,
      title: "Women's Collection",
      tagline: 'Chanderi Sets, Banarasi Weaves, Co-ords & Dresses',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'kids' as const,
      title: "Kids' Collection",
      tagline: 'Festive Lehengas, Dhoti Sets & Organic Playwear',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const occasions = [
    { id: 'Festive & Wedding', title: 'Festive & Weddings', desc: 'Opulent occasions requiring ceremonial grandeur' },
    { id: 'Casual & Resort', title: 'Casual & Resort Getaway', desc: 'Relaxed, airy fabrics designed for effortless warmth' },
    { id: 'Work & Formal', title: 'Executive & Formal', desc: 'Structured silhouettes and immaculate tailored fits' },
    { id: 'Daily Luxury', title: 'Everyday High-Grade Comfort', desc: 'Premium Supima essentials built to outlast trends' }
  ];

  const fits = [
    { id: 'Heritage Silk & Brocade', title: 'Heritage Silks & Handloom', desc: 'Traditional weaves with pure zari & hand-spun luster' },
    { id: 'Pure Belgian Linen', title: 'Pure Washed Linen', desc: 'Breathable, slub-textured natural thermoregulation' },
    { id: 'Supima Organic Cotton', title: 'Extra-Long Staple Cotton', desc: 'Ultra-soft hand feel for uninhibited movement' },
    { id: 'Relaxed Contemporary Cut', title: 'Contemporary Oversized Fit', desc: 'Modern drop-shoulder drape and tailored ease' }
  ];

  // Dynamic filter for results
  const filteredProducts: Product[] = products
    .filter(p => p.gender === selectedDepartment)
    .slice(0, 3);

  const handleReset = () => {
    setStep(1);
    setSelectedDepartment('men');
    setSelectedOccasion('Festive & Wedding');
    setSelectedFit('Heritage Silk & Brocade');
  };

  return (
    <section className="py-20 md:py-28 bg-[#FBFBFB] border-b border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#B08D57] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Fashion Concierge</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#111111] uppercase tracking-wide">
            FIND YOUR SIGNATURE SILHOUETTE
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-2">
            Answer 3 quick questions to instantly discover masterfully tailored garments tailored to your personal aesthetic.
          </p>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 transition-all ${
                  step === i 
                    ? 'w-10 bg-[#B08D57]' 
                    : step > i 
                    ? 'w-6 bg-[#111111]' 
                    : 'w-6 bg-[#E5E5E5]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Choose Department */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#888888]">Step 1 of 3</span>
              <h3 className="font-serif text-2xl font-medium text-[#111111] mt-1">Who are you dressing today?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => {
                    setSelectedDepartment(dept.id);
                    setStep(2);
                  }}
                  className={`p-6 border bg-white cursor-pointer transition-all hover:-translate-y-1 shadow-xs group ${
                    selectedDepartment === dept.id 
                      ? 'border-[#B08D57] ring-1 ring-[#B08D57]' 
                      : 'border-[#E5E5E5] hover:border-[#111111]'
                  }`}
                >
                  <div className="aspect-4/3 w-full bg-[#EFEFEF] overflow-hidden mb-4 border border-[#E5E5E5]">
                    <img
                      src={dept.image}
                      alt={dept.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-[#111111] uppercase tracking-wide">
                    {dept.title}
                  </h4>
                  <p className="text-xs text-[#666666] mt-1">
                    {dept.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#B08D57] uppercase tracking-wider pt-2 border-t border-[#F0F0F0]">
                    <span>Select Department</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Occasion */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#888888]">Step 2 of 3</span>
              <h3 className="font-serif text-2xl font-medium text-[#111111] mt-1">What is the sartorial occasion?</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {occasions.map((occ) => (
                <div
                  key={occ.id}
                  onClick={() => {
                    setSelectedOccasion(occ.id);
                    setStep(3);
                  }}
                  className={`p-5 border bg-white cursor-pointer transition-all hover:border-[#B08D57] shadow-xs group ${
                    selectedOccasion === occ.id 
                      ? 'border-[#B08D57] bg-[#FAF8F5]' 
                      : 'border-[#E5E5E5]'
                  }`}
                >
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#111111]">
                    {occ.title}
                  </h4>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    {occ.desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#B08D57] uppercase tracking-wider">
                    <span>Choose Occasion</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#888888] hover:text-[#111111] uppercase tracking-wider"
              >
                &larr; Back to Department
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choose Fit & Fabric Preference */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#888888]">Step 3 of 3</span>
              <h3 className="font-serif text-2xl font-medium text-[#111111] mt-1">Select your preferred fabric or silhouette</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fits.map((fit) => (
                <div
                  key={fit.id}
                  onClick={() => {
                    setSelectedFit(fit.id);
                    setStep(4);
                  }}
                  className={`p-5 border bg-white cursor-pointer transition-all hover:border-[#B08D57] shadow-xs group ${
                    selectedFit === fit.id 
                      ? 'border-[#B08D57] bg-[#FAF8F5]' 
                      : 'border-[#E5E5E5]'
                  }`}
                >
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#111111]">
                    {fit.title}
                  </h4>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    {fit.desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#B08D57] uppercase tracking-wider">
                    <span>Generate Edit</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-[#888888] hover:text-[#111111] uppercase tracking-wider"
              >
                &larr; Back to Occasion
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results Display */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#111111] text-white p-6 sm:p-8 border border-[#222222] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#B08D57] uppercase block mb-1">
                  Atelier Matched Edit
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light uppercase">
                  Your Signature Silhouette
                </h3>
                <p className="text-xs text-[#AAAAAA] mt-1">
                  Curated for <strong className="text-white uppercase">{selectedDepartment}</strong> &bull; <strong className="text-white">{selectedOccasion}</strong> &bull; <strong className="text-white">{selectedFit}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-[#444444] hover:border-white text-xs font-medium uppercase tracking-wider text-[#CCCCCC] hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Style Finder</span>
                </button>
                <button
                  onClick={() => navigate(`/${selectedDepartment}`)}
                  className="px-5 py-2 bg-[#B08D57] hover:bg-[#c49f65] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  View Full Department
                </button>
              </div>
            </div>

            {/* Recommended Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white border border-[#E5E5E5] p-4 flex flex-col justify-between group shadow-xs hover:border-[#111111] transition-all"
                >
                  <div>
                    <div className="aspect-3/4 w-full bg-[#F5F5F5] overflow-hidden relative mb-4 border border-[#F0F0F0]">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#111111] uppercase tracking-wider">
                        {product.fabric?.split('(')[0] || '100% Natural'}
                      </span>
                    </div>

                    <span className="text-[10px] tracking-widest text-[#888888] uppercase block">
                      {product.category} &bull; {product.fit}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#111111] mt-1 line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#666666] mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F0F0F0] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-[#111111]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-[#888888] line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 uppercase">
                        {product.discount}% Off
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="py-2 px-3 border border-[#111111] hover:bg-[#111111] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                      <button
                        onClick={() => {
                          addToCart(product, product.sizes[0] || 'M', product.colors[0] || { name: 'Standard', hex: '#111111' }, 1);
                          addToast(`Added ${product.name} to bag!`, 'success');
                        }}
                        className="py-2 px-3 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add To Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
