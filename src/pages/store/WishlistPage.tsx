import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, products, setQuickViewProduct, addToCart } = useStore();
  const { navigate } = useRouter();

  // Find corresponding products
  const wishlistProducts = wishlist
    .map(w => products.find(p => p.id === w.productId))
    .filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 bg-[#F7F7F7] border border-[#E5E5E5] rounded-full flex items-center justify-center mx-auto text-[#666666]">
            <Heart className="w-8 h-8 stroke-[1.2]" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-wide uppercase text-[#111111]">
            NOTHING SAVED YET
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            Save your favorite styles here to revisit them anytime or easily add them to your shopping bag.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/men')}
              className="px-8 py-3.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
            >
              EXPLORE CLOTHING
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-[#E5E5E5] flex items-baseline justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] uppercase tracking-wide">
              My Saved Wishlist ({wishlistProducts.length})
            </h1>
            <p className="text-xs text-[#666666] mt-1">
              Garments you've saved to inspect, tailor, or purchase later.
            </p>
          </div>

          <button
            onClick={() => navigate('/men')}
            className="text-xs font-semibold text-[#B08D57] hover:underline"
          >
            Continue Browsing &rarr;
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map(product => {
            if (!product) return null;

            return (
              <div
                key={product.id}
                className="bg-white border border-[#E5E5E5] flex flex-col justify-between group hover:border-[#B08D57] transition-all"
              >
                {/* Image */}
                <div 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="relative aspect-[3/4] overflow-hidden bg-[#F7F7F7] cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-red-600 rounded-full shadow-xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#888888]">
                      {product.gender} &bull; {product.category}
                    </span>
                    <h3 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#B08D57] transition-colors cursor-pointer mt-0.5 line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-xs sm:text-sm font-bold text-[#111111]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[11px] text-[#888888] line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-[#666666] mt-2">
                      <span>Available Sizes: </span>
                      <strong className="text-[#111111]">{product.sizes.slice(0, 3).join(', ')}{product.sizes.length > 3 ? '...' : ''}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-3 border-t border-[#F0F0F0] flex gap-2">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="flex-1 py-2 bg-[#111111] hover:bg-[#B08D57] text-white text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
