import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { Sparkles, ShoppingBag, Eye, ArrowRight, Check } from 'lucide-react';

interface Hotspot {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

interface CuratedLook {
  id: string;
  title: string;
  subtitle: string;
  department: string;
  story: string;
  lookImage: string;
  totalPrice: number;
  totalOriginalPrice: number;
  hotspots: Hotspot[];
}

export const ShopTheLook: React.FC = () => {
  const { products, addToCart, setQuickViewProduct, addToast } = useStore();
  const { navigate } = useRouter();

  const looks: CuratedLook[] = [
    {
      id: 'look-1',
      title: 'The Royal Soirée Ensemble',
      subtitle: 'Hand-tailored for evening grandeur & wedding festivities',
      department: "MEN'S ATELIER",
      story: 'An effortless synthesis of a Banarasi Katan silk kurta paired with crisp off-white tailored trousers and an unlined mandarin blazer.',
      lookImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      totalPrice: 6998,
      totalOriginalPrice: 8998,
      hotspots: [
        {
          id: 'spot-1',
          productId: 'men-2',
          name: 'Tailored Linen Mandarin Collar Kurta',
          price: 2499,
          originalPrice: 3299,
          category: 'Ethnic Wear',
          image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
          x: 48,
          y: 35
        },
        {
          id: 'spot-2',
          productId: 'men-4',
          name: 'Classic Pleated Linen Trousers',
          price: 2199,
          originalPrice: 2899,
          category: 'Trousers',
          image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80',
          x: 52,
          y: 72
        },
        {
          id: 'spot-3',
          productId: 'men-9',
          name: 'Unstructured Linen Mandarin Blazer',
          price: 4499,
          originalPrice: 5999,
          category: 'Blazers',
          image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
          x: 35,
          y: 42
        }
      ]
    },
    {
      id: 'look-2',
      title: 'The Riviera Linen Aesthetic',
      subtitle: 'Sun-drenched luxury & pure breathable summer silhouettes',
      department: "WOMEN'S ATELIER",
      story: 'Clean lines, fluid silk drape, and timeless elegance designed to move with poetry from sunrise to twilight.',
      lookImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      totalPrice: 5798,
      totalOriginalPrice: 7598,
      hotspots: [
        {
          id: 'spot-4',
          productId: 'women-1',
          name: 'Handcrafted Chanderi Silk Kurta Set',
          price: 3499,
          originalPrice: 4599,
          category: 'Kurta Sets',
          image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
          x: 46,
          y: 40
        },
        {
          id: 'spot-5',
          productId: 'women-7',
          name: 'Mulberry Silk Co-ord Set',
          price: 3299,
          originalPrice: 4299,
          category: 'Co-ords',
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
          x: 50,
          y: 65
        }
      ]
    },
    {
      id: 'look-3',
      title: 'Little Connoisseur Celebration',
      subtitle: 'Featherlight festive apparel for joyful little trendsetters',
      department: "KIDS' ATELIER",
      story: 'Crafted with chemical-free dyes, soft lining, and heritage motifs so children celebrate comfortably without compromise.',
      lookImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80',
      totalPrice: 3298,
      totalOriginalPrice: 4498,
      hotspots: [
        {
          id: 'spot-6',
          productId: 'kids-3',
          name: 'Embroidered Chiffon Party Dress',
          price: 1899,
          originalPrice: 2499,
          category: 'Dresses',
          image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80',
          x: 48,
          y: 50
        }
      ]
    }
  ];

  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(looks[0].hotspots[0]);
  const [addedEnsemble, setAddedEnsemble] = useState(false);

  const activeLook = looks[activeLookIndex];

  const handleSelectLook = (idx: number) => {
    setActiveLookIndex(idx);
    setSelectedHotspot(looks[idx].hotspots[0]);
    setAddedEnsemble(false);
  };

  const handleAddEnsemble = () => {
    // Add all hotspot products to cart
    activeLook.hotspots.forEach(spot => {
      const fullProd = products.find(p => p.id === spot.productId);
      if (fullProd) {
        addToCart(fullProd, fullProd.sizes[0] || 'M', fullProd.colors[0] || { name: 'Standard', hex: '#111111' }, 1);
      }
    });
    setAddedEnsemble(true);
    addToast(`Complete "${activeLook.title}" ensemble added to your bag!`, 'success');
    setTimeout(() => setAddedEnsemble(false), 3000);
  };

  const handleOpenProduct = (productId: string) => {
    const fullProd = products.find(p => p.id === productId);
    if (fullProd) {
      setQuickViewProduct(fullProd);
    } else {
      navigate(`/men`);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E5E5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#B08D57] uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Curated Ensembles</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#111111] uppercase tracking-wide">
              SHOP THE LOOKBOOK
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-xl leading-relaxed">
              Explore harmoniously matched sartorial ensembles curated by our master atelier stylists. Tap any interactive pin to inspect individual garments or claim the entire look.
            </p>
          </div>

          {/* Lookbook Switcher Tabs */}
          <div className="flex items-center gap-2 bg-[#F7F7F7] p-1.5 border border-[#E5E5E5] rounded-none self-start md:self-auto overflow-x-auto max-w-full">
            {looks.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => handleSelectLook(idx)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeLookIndex === idx 
                    ? 'bg-[#111111] text-white shadow-xs' 
                    : 'text-[#666666] hover:text-[#111111] hover:bg-[#EBEBEB]'
                }`}
              >
                {look.department}
              </button>
            ))}
          </div>
        </div>

        {/* Main Look Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Large Editorial Image with Interactive Pins (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-4/5 sm:aspect-16/11 lg:aspect-4/5 w-full bg-[#111111] overflow-hidden rounded-none shadow-md border border-[#E5E5E5]">
              <img
                src={activeLook.lookImage}
                alt={activeLook.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />

              {/* Department Tag Overlay */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 text-[10px] tracking-[0.2em] font-bold text-[#111111] uppercase border border-[#E5E5E5]">
                {activeLook.department}
              </div>

              {/* Interactive Hotspot Pins */}
              {activeLook.hotspots.map((spot) => {
                const isSelected = selectedHotspot?.id === spot.id;
                return (
                  <div
                    key={spot.id}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                    onClick={() => setSelectedHotspot(spot)}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-8 h-8 rounded-full transition-all ${
                        isSelected ? 'bg-[#B08D57]/40 animate-ping' : 'bg-white/40'
                      }`} />
                      <button
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shadow-md ${
                          isSelected 
                            ? 'bg-[#B08D57] text-white scale-125 ring-4 ring-white/60' 
                            : 'bg-white text-[#111111] hover:scale-115'
                        }`}
                        title={spot.name}
                      >
                        +
                      </button>
                    </div>

                    {/* Desktop Tooltip Hover */}
                    <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-black/85 text-white text-[10px] px-2.5 py-1 uppercase tracking-wider">
                      {spot.name} &bull; ₹{spot.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                );
              })}

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between pointer-events-none">
                <span className="font-serif tracking-wider text-sm sm:text-base font-medium">
                  {activeLook.title}
                </span>
                <span className="text-[10px] tracking-widest text-[#B08D57] uppercase font-semibold">
                  {activeLook.hotspots.length} Garments Tagged
                </span>
              </div>
            </div>
          </div>

          {/* Right: Garment Ensemble Inspector & Quick Buy (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#B08D57] uppercase block mb-1">
                Atelier Look #{activeLookIndex + 1}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#111111] tracking-wide">
                {activeLook.title}
              </h3>
              <p className="text-xs text-[#666666] mt-2 leading-relaxed">
                {activeLook.story}
              </p>
            </div>

            {/* Selected Garment Spotlight Card */}
            {selectedHotspot && (
              <div className="border border-[#E5E5E5] bg-[#FBFBFB] p-4.5 rounded-none space-y-3 relative group/card">
                <div className="flex items-center justify-between text-[11px] text-[#888888] pb-2 border-b border-[#EBEBEB]">
                  <span className="uppercase tracking-wider font-semibold text-[#111111]">
                    Inspected Garment
                  </span>
                  <span className="text-[#B08D57]">Tap another pin to switch</span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-20 h-24 bg-[#EAEAEA] shrink-0 overflow-hidden border border-[#E5E5E5]">
                    <img
                      src={selectedHotspot.image}
                      alt={selectedHotspot.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-1 grow min-w-0">
                    <span className="text-[10px] tracking-widest uppercase text-[#888888] block">
                      {selectedHotspot.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#111111] truncate">
                      {selectedHotspot.name}
                    </h4>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-sm font-bold text-[#111111]">
                        ₹{selectedHotspot.price.toLocaleString('en-IN')}
                      </span>
                      {selectedHotspot.originalPrice > selectedHotspot.price && (
                        <span className="text-xs text-[#888888] line-through">
                          ₹{selectedHotspot.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => handleOpenProduct(selectedHotspot.productId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] hover:bg-[#B08D57] text-white text-[11px] font-semibold tracking-wider uppercase transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                      <button
                        onClick={() => {
                          const fullProd = products.find(p => p.id === selectedHotspot.productId);
                          if (fullProd) {
                            addToCart(fullProd, fullProd.sizes[0] || 'M', fullProd.colors[0] || { name: 'Standard', hex: '#111111' }, 1);
                            addToast(`Added ${selectedHotspot.name} to bag`, 'success');
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#111111] hover:bg-[#111111] hover:text-white text-[#111111] text-[11px] font-semibold tracking-wider uppercase transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Garment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* List of All Garments in This Look */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#111111] block">
                Garments In This Ensemble ({activeLook.hotspots.length}):
              </span>
              <div className="space-y-1.5">
                {activeLook.hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    onClick={() => setSelectedHotspot(spot)}
                    className={`flex items-center justify-between p-2.5 border text-xs cursor-pointer transition-all ${
                      selectedHotspot?.id === spot.id 
                        ? 'border-[#B08D57] bg-[#FAF8F5]' 
                        : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                    }`}
                  >
                    <span className="font-medium text-[#111111] truncate pr-2">
                      {spot.name}
                    </span>
                    <span className="font-bold text-[#111111] shrink-0">
                      ₹{spot.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Ensemble Pricing & Instant Buy */}
            <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#666666] block">Complete Ensemble Price:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-[#111111]">
                      ₹{activeLook.totalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#888888] line-through">
                      ₹{activeLook.totalOriginalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 uppercase tracking-wider">
                  Save ₹{(activeLook.totalOriginalPrice - activeLook.totalPrice).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={handleAddEnsemble}
                disabled={addedEnsemble}
                className="w-full py-3.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-md active:scale-99"
              >
                {addedEnsemble ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Ensemble Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Entire Look to Bag ({activeLook.hotspots.length} Pieces)</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#888888]">
                Complimentary express shipping & hassle-free 7-day doorstep exchanges included.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
