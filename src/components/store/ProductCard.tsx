import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { Heart, Eye, Star, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, setQuickViewProduct, addToCart } = useStore();
  const { navigate } = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  const inWishlist = isInWishlist(product.id);
  const hasMultipleImages = product.images.length > 1;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first size and selected color, or open quick view if multiple sizes
    if (product.sizes.length > 1) {
      setQuickViewProduct(product);
    } else {
      addToCart(
        product, 
        product.sizes[0] || 'Standard', 
        product.colors[activeColorIdx] || { name: 'Standard', hex: '#111111' }, 
        1
      );
    }
  };

  return (
    <div 
      className="group relative flex flex-col bg-white border border-[#E5E5E5] hover:border-[#B08D57]/60 transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Image Container */}
      <div 
        onClick={handleCardClick}
        className="relative aspect-[3/4] overflow-hidden bg-[#F7F7F7] cursor-pointer"
      >
        {/* Main Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered && hasMultipleImages ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Second Image on Hover */}
        {hasMultipleImages && (
          <img
            src={product.images[1]}
            alt={`${product.name} back view`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isSale && (
            <span className="bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase shadow-xs">
              {product.discount}% OFF
            </span>
          )}
          {product.isBestSeller && !product.isSale && (
            <span className="bg-[#B08D57] text-white text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNew && !product.isSale && !product.isBestSeller && (
            <span className="bg-[#111111] text-white text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-10 ${
            inWishlist 
              ? 'bg-red-50 text-red-600 shadow-md' 
              : 'bg-white/80 hover:bg-white text-[#111111] hover:text-red-600 shadow-xs'
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${inWishlist ? 'fill-red-600' : ''}`} />
        </button>

        {/* Quick View Button - Desktop hover or bottom tap */}
        <div className="hidden lg:flex absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 bg-white hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="p-2 bg-[#111111] hover:bg-[#B08D57] text-white transition-colors shadow-md"
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Quick Action Strip */}
        <div className="lg:hidden absolute bottom-2 right-2 flex gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-1.5 bg-white/90 text-[#111111] rounded-full shadow-sm"
            aria-label="Quick view"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleQuickAdd}
            className="p-1.5 bg-[#111111] text-white rounded-full shadow-sm"
            aria-label="Quick add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Product Details Section */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
        
        <div>
          {/* Department / Category & Rating */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="tracking-widest uppercase text-[#888888] font-medium">
              {product.gender} &bull; {product.category}
            </span>
            <div className="flex items-center gap-0.5 text-[#111111] font-semibold">
              <Star className="w-3 h-3 fill-[#B08D57] text-[#B08D57]" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={handleCardClick}
            className="text-xs sm:text-[13px] font-medium text-[#111111] group-hover:text-[#B08D57] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Fabric / Fit subtitle */}
          <p className="text-[11px] text-[#666666] line-clamp-1 mt-0.5">
            {product.fabric.split('(')[0]}
          </p>
        </div>

        <div className="pt-2 mt-2 border-t border-[#F0F0F0]">
          {/* Price breakdown */}
          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-[#111111]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-[#888888] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-[10px] font-bold text-red-700 ml-auto">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.slice(0, 4).map((c, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColorIdx(i);
                  }}
                  className={`w-3 h-3 rounded-full border transition-all ${
                    activeColorIdx === i ? 'ring-1 ring-[#111111] scale-110' : 'border-[#CCCCCC]'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[9px] text-[#888888] font-medium">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
