import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { 
  Trash2, 
  Heart, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Check, 
  X 
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    cartSavings, 
    cartDeliveryFee, 
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    toggleWishlist,
    settings
  } = useStore();

  const { navigate } = useRouter();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponError('');
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode('');
    }
  };

  const freeShippingThreshold = settings.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  // Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 bg-[#F7F7F7] border border-[#E5E5E5] rounded-full flex items-center justify-center mx-auto text-[#666666]">
            <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-wide uppercase text-[#111111]">
            YOUR BAG IS WAITING
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            Looks like you haven't added anything to your shopping bag yet. Explore our handcrafted collections for men, women, and kids.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/men')}
              className="px-8 py-3.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
            >
              SHOP CLOTHING
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-8 pb-4 border-b border-[#E5E5E5] flex items-baseline justify-between">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] uppercase tracking-wide">
            Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h1>
          <button
            onClick={() => navigate('/men')}
            className="text-xs font-semibold text-[#B08D57] hover:underline"
          >
            Continue Shopping &rarr;
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="mb-8 p-4 bg-white border border-[#E5E5E5] shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <div className="flex items-center gap-1.5 text-[#111111]">
              <Truck className="w-4 h-4 text-[#B08D57]" />
              {amountNeededForFreeShipping > 0 ? (
                <span>Add <strong>₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for Free Shipping</span>
              ) : (
                <span className="text-[#2E7D32]">Congratulations! You qualify for Free Domestic Shipping</span>
              )}
            </div>
            <span className="text-[#888888]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#F0F0F0] overflow-hidden">
            <div 
              className="h-full bg-[#B08D57] transition-all duration-500" 
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main 2-Column Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Line Items List (7-8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => {
              const product = item.product;
              return (
                <div
                  key={item.id}
                  className="bg-white p-4 sm:p-5 border border-[#E5E5E5] flex gap-4 sm:gap-6 items-start shadow-xs hover:border-[#CCCCCC] transition-colors"
                >
                  {/* Thumbnail */}
                  <div 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="w-20 h-28 sm:w-24 sm:h-32 bg-[#F7F7F7] shrink-0 overflow-hidden cursor-pointer border border-[#E5E5E5]"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between self-stretch">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold tracking-widest uppercase text-[#888888]">
                            {product.gender} &bull; {product.category}
                          </span>
                          <h3 
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#B08D57] transition-colors cursor-pointer mt-0.5"
                          >
                            {product.name}
                          </h3>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-bold text-[#111111] block">
                            ₹{(product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-[10px] text-[#888888] line-through block">
                              ₹{(product.originalPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Size & Color Tags */}
                      <div className="flex items-center gap-3 mt-2 text-xs text-[#666666]">
                        <span className="bg-[#F7F7F7] px-2 py-0.5 border border-[#E5E5E5]">
                          Size: <strong>{item.selectedSize}</strong>
                        </span>
                        <div className="flex items-center gap-1.5 bg-[#F7F7F7] px-2 py-0.5 border border-[#E5E5E5]">
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-gray-400" 
                            style={{ backgroundColor: item.selectedColor.hex }} 
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Adjusters & Actions */}
                    <div className="flex items-center justify-between mt-4 pt-2 border-t border-[#F5F5F5]">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-[#666666]">Qty:</span>
                        <div className="inline-flex border border-[#E5E5E5]">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-0.5 text-xs font-bold text-[#111111] hover:bg-[#F7F7F7]"
                          >
                            -
                          </button>
                          <span className="px-3 py-0.5 text-xs font-bold min-w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-0.5 text-xs font-bold text-[#111111] hover:bg-[#F7F7F7]"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            toggleWishlist(product.id);
                            removeFromCart(item.id);
                          }}
                          className="text-xs text-[#666666] hover:text-[#B08D57] flex items-center gap-1"
                          title="Move to Wishlist"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Move to Wishlist</span>
                        </button>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-[#666666] hover:text-red-600 flex items-center gap-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Summary Box (4-5 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            
            {/* Promo Code Box */}
            <div className="bg-white p-5 border border-[#E5E5E5] shadow-xs space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111111]">
                <Tag className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Apply Promo Code</span>
              </div>

              {appliedCoupon ? (
                <div className="p-3 bg-[#F9F5EE] border border-[#B08D57] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#111111] tracking-wider block">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-[11px] text-[#2E7D32] font-semibold">
                      {appliedCoupon.description}
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-[#666666] hover:text-red-600"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. WELCOME10, VELORA20"
                    className="flex-1 px-3 py-2 text-xs border border-[#E5E5E5] uppercase outline-none focus:border-[#111111]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-xs text-red-600">{couponError}</p>
              )}
              <div className="pt-1 text-[11px] text-[#888888]">
                <span>Try code <strong>WELCOME10</strong> for 10% off your order!</span>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-white p-6 border border-[#E5E5E5] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#E5E5E5]">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-[#555555]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#111111]">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {cartSavings > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Catalog Savings</span>
                    <span>-₹{cartSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-[#B08D57] font-semibold">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-₹{(cartSubtotal - (cartTotal - cartDeliveryFee)).toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Standard Domestic Shipping</span>
                  <span>
                    {cartDeliveryFee === 0 ? (
                      <strong className="text-[#2E7D32] uppercase text-[11px]">FREE</strong>
                    ) : (
                      `₹${cartDeliveryFee}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#E5E5E5] flex justify-between items-baseline text-sm sm:text-base font-bold text-[#111111]">
                  <span>Total Amount</span>
                  <span className="text-lg font-serif">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#888888]">
                <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
                <span>Guaranteed Safe & Encrypted Checkout</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
