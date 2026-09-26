import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { X, Star, Heart, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsSizeGuideOpen, 
    setSizeGuideDepartment 
  } = useStore();
  
  const { navigate } = useRouter();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);
  const currentColor = product.colors[selectedColorIndex] || { name: 'Standard', hex: '#111111' };

  const handleClose = () => {
    setQuickViewProduct(null);
    setSelectedSize('');
    setSelectedImageIndex(0);
    setQuantity(1);
    setErrorMsg('');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size first');
      return;
    }
    addToCart(product, selectedSize, currentColor, quantity);
    handleClose();
  };

  const handleViewFullPage = () => {
    handleClose();
    navigate(`/product/${product.id}`);
  };

  const openSizeGuide = () => {
    setSizeGuideDepartment(product.gender);
    setIsSizeGuideOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-4xl bg-white border border-[#E5E5E5] shadow-2xl max-h-[92vh] flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white text-[#111111] hover:text-[#B08D57] transition-colors rounded-full shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery Column */}
        <div className="md:w-1/2 bg-[#F7F7F7] p-4 flex flex-col justify-between overflow-hidden">
          <div className="relative aspect-[3/4] max-h-[380px] md:max-h-none w-full overflow-hidden bg-white">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isSale && (
              <span className="absolute top-3 left-3 bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase">
                {product.discount}% OFF
              </span>
            )}
            {product.isNew && !product.isSale && (
              <span className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase">
                New In
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-14 h-16 shrink-0 border transition-all overflow-hidden ${
                    selectedImageIndex === i ? 'border-[#B08D57] ring-1 ring-[#B08D57]' : 'border-[#E5E5E5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Actions Column */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-none">
          
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#B08D57] block">
                {product.gender} &bull; {product.category}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] mt-1">
                {product.name}
              </h2>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xl sm:text-2xl font-bold text-[#111111]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-[#888888] line-through">
                    MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-bold text-red-700">
                    ({product.discount}% OFF)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 bg-[#F7F7F7] px-2 py-1 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#B08D57] text-[#B08D57]" />
                <span>{product.rating}</span>
                <span className="text-[#888888]">({product.reviews})</span>
              </div>
            </div>

            <p className="text-xs text-[#666666] leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Colors */}
            <div>
              <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider block mb-2">
                Color: <span className="font-normal text-[#666666]">{currentColor.name}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      selectedColorIndex === idx 
                        ? 'border-[#111111] ring-2 ring-[#B08D57] scale-110' 
                        : 'border-[#CCCCCC] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColorIndex === idx && (
                      <Check className={`w-3.5 h-3.5 ${color.hex === '#FFFFFF' || color.hex.toLowerCase().includes('fff') ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                  Select Size
                </label>
                <button
                  onClick={openSizeGuide}
                  className="text-[11px] font-semibold text-[#B08D57] hover:underline"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setErrorMsg('');
                    }}
                    className={`min-w-10 px-3 py-2 text-xs font-semibold uppercase border transition-all ${
                      selectedSize === size
                        ? 'border-[#111111] bg-[#111111] text-white shadow-xs'
                        : 'border-[#E5E5E5] bg-white text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {errorMsg && (
                <p className="text-xs text-red-600 mt-1.5">{errorMsg}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider">Qty:</span>
              <div className="inline-flex border border-[#E5E5E5]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-xs text-[#111111] hover:bg-[#F7F7F7]"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-2.5 py-1 text-xs text-[#111111] hover:bg-[#F7F7F7]"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-[#666666]">
                {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
              </span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-2 border-t border-[#E5E5E5] mt-6">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
              >
                ADD TO BAG
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border transition-colors ${
                  inWishlist 
                    ? 'border-red-600 text-red-600 bg-red-50' 
                    : 'border-[#E5E5E5] text-[#111111] hover:border-[#111111]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-600' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleViewFullPage}
              className="w-full py-2.5 bg-transparent border border-[#111111] hover:bg-[#F7F7F7] text-[#111111] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Complete Product Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
