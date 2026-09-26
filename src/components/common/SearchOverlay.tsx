import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { Search, X, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('velora_recent_searches');
    return saved ? JSON.parse(saved) : ['linen shirt', 'silk saree', 'oversized tee'];
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const popularSearches = [
    'Oversized Cotton Shirt',
    'Silk Anarkali Kurta',
    'Banarasi Saree',
    'Boys Kurta Pyjama',
    'Selvedge Jeans',
    'Summer Linen'
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const handleClose = () => {
    setIsSearchOpen(false);
    setQuery('');
  };

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  const saveRecentSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(t => t.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 6);
      localStorage.setItem('velora_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleProductClick = (productId: string) => {
    saveRecentSearch(query);
    handleClose();
    navigate(`/product/${productId}`);
  };

  const handleViewAllResults = () => {
    if (!query.trim()) return;
    saveRecentSearch(query);
    handleClose();
    navigate(`/men?search=${encodeURIComponent(query)}`);
  };

  // Filter matching products
  const matchingProducts = query.trim()
    ? products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        );
      }).slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/80 backdrop-blur-sm flex flex-col justify-start overflow-y-auto">
      
      {/* Top Search Bar */}
      <div className="bg-white border-b border-[#E5E5E5] w-full pt-6 pb-6 px-4 sm:px-8 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex-1 relative flex items-center">
            <Search className="w-5 h-5 text-[#666666] absolute left-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleViewAllResults()}
              placeholder="Search for pure cotton shirts, silk sarees, kurtas, linen..."
              className="w-full pl-11 pr-10 py-3.5 text-sm sm:text-base border border-[#E5E5E5] focus:border-[#B08D57] rounded-none outline-none font-medium placeholder:text-[#999999] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 text-[#666666] hover:text-[#111111] p-1"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={handleClose}
            className="p-3 text-[#111111] hover:text-[#B08D57] transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold"
            aria-label="Close search"
          >
            <span>Close</span>
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Results / Suggestions Panel */}
      <div className="flex-1 bg-[#F7F7F7] py-8 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 border border-[#E5E5E5] shadow-xs">
          
          {/* If query is empty, show trending & recents */}
          {!query.trim() && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-[#B08D57]" />
                  <h3 className="text-xs font-bold tracking-widest uppercase text-[#111111]">
                    Popular Searches
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => handleSelectSearch(term)}
                      className="px-3.5 py-1.5 text-xs bg-[#F7F7F7] hover:bg-[#111111] hover:text-white transition-all border border-[#E5E5E5] text-[#111111]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B08D57]" />
                    <h3 className="text-xs font-bold tracking-widest uppercase text-[#111111]">
                      Recent Searches
                    </h3>
                  </div>
                  {recentSearches.length > 0 && (
                    <button
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem('velora_recent_searches');
                      }}
                      className="text-[11px] text-[#888888] hover:text-red-600 underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1.5">
                  {recentSearches.length > 0 ? (
                    recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSearch(term)}
                        className="w-full flex items-center justify-between text-left text-xs py-1.5 text-[#555555] hover:text-[#111111] hover:underline"
                      >
                        <span>{term}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#999999]" />
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-[#999999] italic">No recent searches yet</p>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* If query has matches */}
          {query.trim() && (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E5E5]">
                <p className="text-xs text-[#666666]">
                  Showing matches for <span className="font-semibold text-[#111111]">"{query}"</span>
                  {' '}({matchingProducts.length} results)
                </p>
                {matchingProducts.length > 0 && (
                  <button
                    onClick={handleViewAllResults}
                    className="text-xs font-semibold text-[#B08D57] hover:underline flex items-center gap-1"
                  >
                    <span>View all in catalog</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {matchingProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {matchingProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="group cursor-pointer flex flex-col bg-white border border-[#E5E5E5] hover:border-[#B08D57] transition-all p-2"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F7F7] mb-2">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isSale && (
                          <span className="absolute top-1.5 left-1.5 bg-red-700 text-white text-[9px] font-bold px-1.5 py-0.5 tracking-wider uppercase">
                            Sale
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] tracking-widest text-[#888888] uppercase mb-0.5">
                        {product.gender} &bull; {product.category}
                      </span>
                      <h4 className="text-xs font-medium text-[#111111] line-clamp-1 group-hover:text-[#B08D57] transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-[#111111]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-[10px] text-[#888888] line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="font-serif text-xl text-[#111111] mb-2">NO PRODUCTS FOUND</h3>
                  <p className="text-xs text-[#666666] max-w-md mx-auto mb-6">
                    We couldn't find any clothing matching "{query}". Try checking your spelling or explore our curated departments.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        handleClose();
                        navigate('/men');
                      }}
                      className="px-4 py-2 text-xs uppercase font-medium border border-[#111111] hover:bg-[#111111] hover:text-white transition-all"
                    >
                      Explore Men
                    </button>
                    <button
                      onClick={() => {
                        handleClose();
                        navigate('/women');
                      }}
                      className="px-4 py-2 text-xs uppercase font-medium border border-[#111111] hover:bg-[#111111] hover:text-white transition-all"
                    >
                      Explore Women
                    </button>
                    <button
                      onClick={() => {
                        handleClose();
                        navigate('/kids');
                      }}
                      className="px-4 py-2 text-xs uppercase font-medium border border-[#111111] hover:bg-[#111111] hover:text-white transition-all"
                    >
                      Explore Kids
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>

    </div>
  );
};
