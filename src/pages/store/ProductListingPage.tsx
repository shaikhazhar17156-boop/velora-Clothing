import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { ProductCard } from '../../components/store/ProductCard';
import { ProductFilter, FilterState } from '../../components/store/ProductFilter';
import { Filter, ChevronDown, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Gender } from '../../types';

interface ProductListingPageProps {
  gender?: Gender;
  isSaleOnly?: boolean;
  isNewOnly?: boolean;
  title: string;
  description: string;
}

export const ProductListingPage: React.FC<ProductListingPageProps> = ({
  gender,
  isSaleOnly = false,
  isNewOnly = false,
  title,
  description
}) => {
  const { products } = useStore();
  const { navigate, currentPath } = useRouter();

  // Search query from URL hash/search if any
  const [urlCategoryFilter, setUrlCategoryFilter] = useState<string | null>(null);
  const [urlSearchFilter, setUrlSearchFilter] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const cat = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    if (cat) setUrlCategoryFilter(decodeURIComponent(cat));
    if (search) setUrlSearchFilter(decodeURIComponent(search));
  }, [currentPath]);

  // Mobile Filter Drawer Toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState<string>('popular');

  // Filter State
  const initialFilters: FilterState = {
    category: urlCategoryFilter ? [urlCategoryFilter] : [],
    size: [],
    color: [],
    maxPrice: 15000,
    fit: [],
    fabric: [],
    minDiscount: isSaleOnly ? 15 : 0
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      category: [],
      size: [],
      color: [],
      maxPrice: 15000,
      fit: [],
      fabric: [],
      minDiscount: isSaleOnly ? 15 : 0
    });
    setUrlCategoryFilter(null);
    setUrlSearchFilter(null);
  };

  // Base Products based on department or special flags
  const departmentProducts = useMemo(() => {
    return products.filter(p => {
      if (gender && p.gender !== gender) return false;
      if (isSaleOnly && !p.isSale && p.discount < 20) return false;
      if (isNewOnly && !p.isNew) return false;
      if (urlSearchFilter) {
        const q = urlSearchFilter.toLowerCase();
        const matches = 
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [products, gender, isSaleOnly, isNewOnly, urlSearchFilter]);

  // Extract available filter options from the department products
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    departmentProducts.forEach(p => set.add(p.category));
    return Array.from(set).sort();
  }, [departmentProducts]);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    departmentProducts.forEach(p => p.sizes.forEach(s => set.add(s)));
    return Array.from(set);
  }, [departmentProducts]);

  const availableColors = useMemo(() => {
    const map = new Map<string, { name: string; hex: string }>();
    departmentProducts.forEach(p => {
      p.colors.forEach(c => map.set(c.name, c));
    });
    return Array.from(map.values());
  }, [departmentProducts]);

  const availableFits = useMemo(() => {
    const set = new Set<string>();
    departmentProducts.forEach(p => {
      if (p.fit) set.add(p.fit);
    });
    return Array.from(set).slice(0, 6);
  }, [departmentProducts]);

  const availableFabrics = useMemo(() => {
    const set = new Set<string>();
    departmentProducts.forEach(p => {
      if (p.fabric) set.add(p.fabric.split('(')[0].trim());
    });
    return Array.from(set).slice(0, 6);
  }, [departmentProducts]);

  // Apply filters and sort
  const filteredProducts = useMemo(() => {
    let result = departmentProducts.filter(p => {
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(p.category)) {
        return false;
      }
      // Size filter
      if (filters.size.length > 0 && !p.sizes.some(s => filters.size.includes(s))) {
        return false;
      }
      // Color filter
      if (filters.color.length > 0 && !p.colors.some(c => filters.color.includes(c.name))) {
        return false;
      }
      // Price filter
      if (p.price > filters.maxPrice) {
        return false;
      }
      // Fit filter
      if (filters.fit.length > 0 && !filters.fit.includes(p.fit)) {
        return false;
      }
      // Fabric filter
      if (filters.fabric.length > 0 && !filters.fabric.some(fab => p.fabric.includes(fab))) {
        return false;
      }
      // Discount filter
      if (filters.minDiscount > 0 && p.discount < filters.minDiscount) {
        return false;
      }

      return true;
    });

    // Sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.reviews * b.rating) - (a.reviews * a.rating));
        break;
    }

    return result;
  }, [departmentProducts, filters, sortBy]);

  // Active filter count
  const activeFiltersCount = 
    filters.category.length +
    filters.size.length +
    filters.color.length +
    filters.fit.length +
    filters.fabric.length +
    (filters.maxPrice < 15000 ? 1 : 0) +
    (filters.minDiscount > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-[#F7F7F7] border-b border-[#E5E5E5] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="text-[11px] font-medium tracking-wider uppercase text-[#888888] mb-3 flex items-center gap-1.5">
            <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors">Home</button>
            <span>/</span>
            <span className="text-[#111111] font-semibold">{title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#111111] uppercase tracking-wide">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>

            <span className="text-xs font-semibold text-[#888888] tracking-widest uppercase">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Design' : 'Designs'}
            </span>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Sort & Mobile Filter Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E5E5E5] gap-4">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] text-xs font-semibold uppercase tracking-wider text-[#111111] flex items-center gap-2 hover:bg-[#111111] hover:text-white transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Result Count Desktop */}
          <div className="hidden lg:block text-xs text-[#666666]">
            Showing <span className="font-semibold text-[#111111]">{filteredProducts.length}</span> items
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-xs text-[#666666] hidden sm:inline uppercase tracking-wider">
              Sort By:
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#E5E5E5] text-xs font-semibold text-[#111111] py-2.5 pl-3 pr-8 focus:border-[#B08D57] outline-none rounded-none cursor-pointer tracking-wide"
              >
                <option value="popular">Popularity & Rating</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="rating">Customer Rating</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#888888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
              Active:
            </span>
            {filters.category.map(cat => (
              <span key={cat} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F7F7F7] border border-[#E5E5E5] text-xs">
                <span>{cat}</span>
                <button onClick={() => setFilters(f => ({ ...f, category: f.category.filter(c => c !== cat) }))}>
                  <X className="w-3 h-3 hover:text-red-600" />
                </button>
              </span>
            ))}
            {filters.size.map(sz => (
              <span key={sz} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F7F7F7] border border-[#E5E5E5] text-xs">
                <span>Size: {sz}</span>
                <button onClick={() => setFilters(f => ({ ...f, size: f.size.filter(s => s !== sz) }))}>
                  <X className="w-3 h-3 hover:text-red-600" />
                </button>
              </span>
            ))}
            {filters.maxPrice < 15000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F7F7F7] border border-[#E5E5E5] text-xs">
                <span>Under ₹{filters.maxPrice.toLocaleString('en-IN')}</span>
                <button onClick={() => setFilters(f => ({ ...f, maxPrice: 15000 }))}>
                  <X className="w-3 h-3 hover:text-red-600" />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[#B08D57] hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Grid + Filter Layout */}
        <div className="flex gap-8 items-start">
          
          {/* Filter Sidebar (Desktop) and Mobile Drawer */}
          <ProductFilter
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            availableCategories={availableCategories}
            availableSizes={availableSizes}
            availableColors={availableColors}
            availableFits={availableFits}
            availableFabrics={availableFabrics}
            isMobileDrawerOpen={isMobileFilterOpen}
            onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
          />

          {/* Product Grid Area */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#F7F7F7] border border-[#E5E5E5] p-8">
                <h3 className="font-serif text-2xl text-[#111111] mb-2 uppercase">
                  NO PRODUCTS FOUND
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] max-w-md mx-auto mb-6">
                  We couldn't find any clothing matching your selected criteria. Try adjusting or clearing your active filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#111111] text-white hover:bg-[#B08D57] text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            )}
          </main>

        </div>

      </div>

    </div>
  );
};
