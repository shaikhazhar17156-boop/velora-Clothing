import React, { useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

export const TrendingSection: React.FC = () => {
  const { products } = useStore();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Filter bestselling / high-rated items
  const trendingProducts = products
    .filter(p => p.isBestSeller || p.rating >= 4.8)
    .slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F7F7F7] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#B08D57] uppercase">
              <TrendingUp className="w-4 h-4" />
              <span>Most Loved Styles</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111] mt-1">
              TRENDING NOW
            </h2>
          </div>

          {/* Desktop Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 bg-white border border-[#E5E5E5] hover:border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              aria-label="Previous trending items"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 bg-white border border-[#E5E5E5] hover:border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              aria-label="Next trending items"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
        >
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="w-[230px] sm:w-[270px] md:w-[290px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
