import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Eye, Instagram } from 'lucide-react';

interface EditorialTile {
  id: string;
  image: string;
  customerName: string;
  city: string;
  garmentName: string;
  productId: string;
  price: number;
}

export const EditorialCommunitySection: React.FC = () => {
  const { products, setQuickViewProduct } = useStore();

  const tiles: EditorialTile[] = [
    {
      id: 'ed-1',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      customerName: 'Ananya S.',
      city: 'Mumbai',
      garmentName: 'Handcrafted Chanderi Silk Kurta Set',
      productId: 'women-1',
      price: 3499
    },
    {
      id: 'ed-2',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      customerName: 'Kabir V.',
      city: 'Bengaluru',
      garmentName: 'Oversized Supima Cotton Shirt',
      productId: 'men-1',
      price: 1899
    },
    {
      id: 'ed-3',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      customerName: 'Meera R.',
      city: 'Jaipur',
      garmentName: 'Banarasi Katan Silk Anarkali',
      productId: 'women-2',
      price: 4999
    },
    {
      id: 'ed-4',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      customerName: 'Rohan M.',
      city: 'New Delhi',
      garmentName: 'Tailored Linen Mandarin Kurta',
      productId: 'men-2',
      price: 2499
    },
    {
      id: 'ed-5',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      customerName: 'Pooja & Aryan',
      city: 'Hyderabad',
      garmentName: 'Embroidered Chiffon Party Dress',
      productId: 'kids-3',
      price: 1899
    }
  ];

  const handleTileClick = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setQuickViewProduct(prod);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E5E5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#B08D57] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community of Connoisseurs</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#111111] uppercase tracking-wide">
            WORN BY CONNOISSEURS
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-2">
            From private gallery previews to festive heirloom soirees, see how our patrons embody VELORA luxury across India. Tap any portrait to inspect the garment.
          </p>
        </div>

        {/* 5-Column Editorial Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              onClick={() => handleTileClick(tile.productId)}
              className="group relative aspect-3/4 bg-[#111111] overflow-hidden cursor-pointer border border-[#E5E5E5]"
            >
              <img
                src={tile.image}
                alt={tile.garmentName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Top Instagram / Customer Handle */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-medium bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                  {tile.customerName} &bull; {tile.city}
                </span>
                <Instagram className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Garment Tag Reveal */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-1">
                <p className="text-[11px] font-semibold truncate leading-tight">
                  {tile.garmentName}
                </p>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-xs font-bold text-[#B08D57]">
                    ₹{tile.price.toLocaleString('en-IN')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-white text-[#111111] px-2 py-0.5">
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </span>
                </div>
              </div>

              {/* Default subtle footer badge */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between group-hover:hidden text-[10px] text-white/90 bg-black/40 backdrop-blur-xs px-2 py-1">
                <span className="font-medium">{tile.customerName}</span>
                <span className="text-[#B08D57] font-semibold">Shop Look</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Tagline */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#888888]">
            Tag <span className="text-[#111111] font-semibold">@velorafashion</span> on your social journals to be featured in our monthly digital atelier salon.
          </p>
        </div>

      </div>
    </section>
  );
};
