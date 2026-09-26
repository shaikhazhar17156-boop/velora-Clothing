import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { HeroSection } from '../../components/store/HeroSection';
import { AtelierTicker } from '../../components/store/AtelierTicker';
import { CategorySection } from '../../components/store/CategorySection';
import { ShopTheLook } from '../../components/store/ShopTheLook';
import { DepartmentSection } from '../../components/store/DepartmentSection';
import { OccasionCurationSection } from '../../components/store/OccasionCurationSection';
import { FabricCraftsmanshipSection } from '../../components/store/FabricCraftsmanshipSection';
import { StyleQuizSection } from '../../components/store/StyleQuizSection';
import { TrendingSection } from '../../components/store/TrendingSection';
import { PromoBanners } from '../../components/store/PromoBanners';
import { EditorialCommunitySection } from '../../components/store/EditorialCommunitySection';
import { BrandValuesBar } from '../../components/store/BrandValuesBar';
import { CustomerReviews } from '../../components/store/CustomerReviews';
import { Newsletter } from '../../components/store/Newsletter';
import { ProductCard } from '../../components/store/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products } = useStore();
  const { navigate } = useRouter();

  // Filter New Arrivals (recent or isNew)
  const newArrivals = products
    .filter(p => p.isNew)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Live Atelier Pulse & Urgency Ticker */}
      <AtelierTicker />

      {/* 3. Shop By Category (MEN, WOMEN, KIDS) */}
      <CategorySection />

      {/* 4. Interactive Editorial Lookbook / Shop The Ensemble */}
      <ShopTheLook />

      {/* 5. New Arrivals Grid */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#B08D57] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Fresh Off The Loom</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-1">
                NEW ARRIVALS
              </h2>
            </div>

            <button
              onClick={() => navigate('/new-arrivals')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#111111] hover:text-[#B08D57] transition-colors group"
            >
              <span>View All New Additions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Product Grid: 4 per row desktop, 3 tablet, 2 mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/new-arrivals')}
              className="px-8 py-3.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
            >
              DISCOVER FULL COLLECTION
            </button>
          </div>

        </div>
      </section>

      {/* 6. Wardrobe in Context: Occasion Curation Grid */}
      <OccasionCurationSection />

      {/* 7. Shop By Department (Large Visual Panels) */}
      <DepartmentSection />

      {/* 8. Purity of Textile & Craft: The Atelier Standard */}
      <FabricCraftsmanshipSection />

      {/* 9. Promotional Banners (Festive Edit, Everyday Essentials, Summer) */}
      <PromoBanners />

      {/* 10. Interactive Fashion Concierge: Style Quiz */}
      <StyleQuizSection />

      {/* 11. Trending Now (Horizontal Slider) */}
      <TrendingSection />

      {/* 12. Editorial Gallery: Worn By Connoisseurs */}
      <EditorialCommunitySection />

      {/* 13. Brand Ethos Pillars */}
      <BrandValuesBar />

      {/* 14. Verified Customer Reviews */}
      <CustomerReviews />

      {/* 15. Newsletter Subscription */}
      <Newsletter />

    </div>
  );
};

