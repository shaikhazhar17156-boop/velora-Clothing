import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { ProductCard } from '../../components/store/ProductCard';
import { 
  Heart, 
  Star, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  Check, 
  MapPin, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  ZoomIn, 
  X,
  MessageSquarePlus,
  Send
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsSizeGuideOpen, 
    setSizeGuideDepartment,
    reviews,
    addReview,
    addToast
  } = useStore();

  const { params, navigate } = useRouter();
  const productId = params.productId;

  const product = products.find(p => p.id === productId) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Tab accordion states
  const [activeTab, setActiveTab] = useState<'fabric' | 'fit' | 'wash' | 'shipping'>('fabric');

  // Review modal / form
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Reset states when product changes
  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedSize('');
    setSelectedColorIdx(0);
    setQuantity(1);
    setPincodeStatus(null);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const inWishlist = isInWishlist(product.id);
  const currentColor = product.colors[selectedColorIdx] || { name: 'Standard', hex: '#111111' };

  // Filter reviews for this product
  const productReviews = reviews.filter(r => r.productId === product.id && r.status === 'Approved');

  // Related products from same category or gender
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.gender === product.gender)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size to proceed');
      return;
    }
    setErrorMsg('');
    addToCart(product, selectedSize, currentColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size to proceed');
      return;
    }
    setErrorMsg('');
    addToCart(product, selectedSize, currentColor, quantity);
    navigate('/checkout');
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    setPincodeStatus(`Available! Standard Delivery by ${new Date(Date.now() + 345600000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}.`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard', 'info');
    }
  };

  const handleOpenSizeGuide = () => {
    setSizeGuideDepartment(product.gender);
    setIsSizeGuideOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      addToast('Please enter both name and review comment', 'error');
      return;
    }
    addReview({
      productId: product.id,
      productName: product.name,
      customerName: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      verified: true
    });
    setIsReviewFormOpen(false);
    setReviewComment('');
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E5E5] bg-[#F7F7F7] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] uppercase tracking-wider text-[#888888]">
          <nav className="flex items-center gap-1.5 flex-wrap">
            <button onClick={() => navigate('/')} className="hover:text-[#111111]">Home</button>
            <span>/</span>
            <button onClick={() => navigate(`/${product.gender}`)} className="hover:text-[#111111]">
              {product.gender}
            </button>
            <span>/</span>
            <span className="text-[#666666]">{product.category}</span>
            <span>/</span>
            <span className="text-[#111111] font-semibold truncate max-w-[200px]">{product.name}</span>
          </nav>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-[#111111] hover:text-[#B08D57] transition-colors"
            title="Share Product"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[560px] no-scrollbar shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 shrink-0 border overflow-hidden transition-all ${
                      activeImageIdx === idx 
                        ? 'border-[#B08D57] ring-1 ring-[#B08D57]' 
                        : 'border-[#E5E5E5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[3/4] bg-[#F7F7F7] border border-[#E5E5E5] overflow-hidden group">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
                onClick={() => setIsZoomModalOpen(true)}
              />

              {/* Zoom Trigger Button */}
              <button
                onClick={() => setIsZoomModalOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 bg-white/90 hover:bg-white text-[#111111] rounded-full shadow-md transition-colors"
                title="Zoom image"
                aria-label="Zoom image"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isSale && (
                  <span className="bg-red-700 text-white text-[11px] font-bold px-2.5 py-1 tracking-wider uppercase shadow-xs">
                    {product.discount}% OFF
                  </span>
                )}
                {product.isBestSeller && !product.isSale && (
                  <span className="bg-[#B08D57] text-white text-[11px] font-bold px-2.5 py-1 tracking-wider uppercase shadow-xs">
                    Bestseller
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT: Product Buy Box (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Category */}
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#B08D57]">
                {product.gender} &bull; {product.category}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111111] mt-1.5 leading-snug">
                {product.name}
              </h1>

              {/* SKU & Ratings */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0F0F0]">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5 bg-[#111111] text-white px-2 py-0.5 text-xs font-bold">
                    <span>{product.rating}</span>
                    <Star className="w-3 h-3 fill-white text-white" />
                  </div>
                  <span className="text-xs text-[#666666]">
                    ({product.reviews} customer reviews)
                  </span>
                </div>
                <span className="text-[11px] text-[#888888] font-mono">
                  SKU: {product.sku}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#F7F7F7] p-4 border border-[#E5E5E5] space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#111111]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm sm:text-base text-[#888888] line-through">
                    MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-sm font-bold text-red-700 ml-auto">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#666666]">
                Inclusive of all taxes & duties. Free shipping on orders over ₹999.
              </p>
            </div>

            {/* Description Excerpt */}
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                  Color: <span className="font-normal text-[#666666]">{currentColor.name}</span>
                </label>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColorIdx(i)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      selectedColorIdx === i 
                        ? 'ring-2 ring-[#B08D57] scale-110 border-[#111111]' 
                        : 'border-[#CCCCCC] hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColorIdx === i && (
                      <Check className={`w-4 h-4 ${c.hex === '#FFFFFF' || c.hex.toLowerCase().includes('fff') ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                  Select Size
                </label>
                <button
                  onClick={handleOpenSizeGuide}
                  className="text-xs font-semibold text-[#B08D57] hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setSelectedSize(sz);
                      setErrorMsg('');
                    }}
                    className={`py-2.5 text-xs font-bold uppercase border transition-all ${
                      selectedSize === sz
                        ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                        : 'border-[#E5E5E5] bg-white text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              {errorMsg && (
                <p className="text-xs text-red-600 mt-2 font-medium">{errorMsg}</p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                Quantity:
              </span>
              <div className="inline-flex border border-[#E5E5E5]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-xs font-bold text-[#111111] hover:bg-[#F7F7F7]"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-semibold min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1.5 text-xs font-bold text-[#111111] hover:bg-[#F7F7F7]"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-[#666666]">
                {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
              </span>
            </div>

            {/* CTA Buttons: ADD TO BAG & BUY NOW */}
            <div className="space-y-2.5 pt-2">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
                >
                  ADD TO BAG
                </button>
                
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 border transition-colors ${
                    inWishlist 
                      ? 'border-red-600 text-red-600 bg-red-50' 
                      : 'border-[#E5E5E5] text-[#111111] hover:border-[#111111]'
                  }`}
                  aria-label="Wishlist"
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-600' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#B08D57] hover:bg-[#987844] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
              >
                BUY NOW &bull; INSTANT CHECKOUT
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="bg-[#F7F7F7] p-4 border border-[#E5E5E5] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111111]">
                <MapPin className="w-4 h-4 text-[#B08D57]" />
                <span>Check Delivery & Pincode</span>
              </div>
              <form onSubmit={checkPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 text-xs border border-[#E5E5E5] bg-white outline-none focus:border-[#111111]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B08D57] transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-xs text-[#2E7D32] font-medium pt-1">
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Product Specifications Tabs */}
            <div className="border border-[#E5E5E5]">
              <div className="flex border-b border-[#E5E5E5] bg-[#F7F7F7]">
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === 'fabric' ? 'bg-white border-b-2 border-[#B08D57] text-[#111111]' : 'text-[#666666]'
                  }`}
                >
                  Fabric
                </button>
                <button
                  onClick={() => setActiveTab('fit')}
                  className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === 'fit' ? 'bg-white border-b-2 border-[#B08D57] text-[#111111]' : 'text-[#666666]'
                  }`}
                >
                  Fit & Sizing
                </button>
                <button
                  onClick={() => setActiveTab('wash')}
                  className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === 'wash' ? 'bg-white border-b-2 border-[#B08D57] text-[#111111]' : 'text-[#666666]'
                  }`}
                >
                  Wash Care
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === 'shipping' ? 'bg-white border-b-2 border-[#B08D57] text-[#111111]' : 'text-[#666666]'
                  }`}
                >
                  Returns
                </button>
              </div>

              <div className="p-4 text-xs text-[#444444] leading-relaxed">
                {activeTab === 'fabric' && (
                  <div className="space-y-1.5">
                    <p><strong>Composition:</strong> {product.fabric}</p>
                    <p><strong>Occasion:</strong> {product.occasion || 'Versatile / Everyday'}</p>
                    <p><strong>Pattern:</strong> {product.pattern || 'Fine Textile'}</p>
                  </div>
                )}
                {activeTab === 'fit' && (
                  <div className="space-y-1.5">
                    <p><strong>Silhouette:</strong> {product.fit}</p>
                    <p><strong>Model Spec:</strong> Height 6'1" wearing size L (Men) / 5'9" wearing size S (Women).</p>
                    <p>For custom tailoring advice, contact our concierge.</p>
                  </div>
                )}
                {activeTab === 'wash' && (
                  <div>
                    <p><strong>Care Instructions:</strong> {product.washCare}</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-1.5">
                    <p><strong>7-Day Returns:</strong> Hassle-free door-to-door returns and size exchanges.</p>
                    <p><strong>Free Domestic Shipping:</strong> On prepaid orders over ₹999.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Customer Reviews Section */}
        <section className="mt-16 pt-12 border-t border-[#E5E5E5]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#B08D57] uppercase">
                Verified Feedback
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111] mt-1">
                Customer Reviews ({productReviews.length})
              </h3>
            </div>

            <button
              onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
              className="px-5 py-2.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Review Submission Form Drawer / Card */}
          {isReviewFormOpen && (
            <form 
              onSubmit={handleReviewSubmit}
              className="mb-8 p-6 bg-[#F7F7F7] border border-[#E5E5E5] max-w-xl space-y-4 animate-in fade-in duration-300"
            >
              <h4 className="font-serif text-lg font-bold text-[#111111]">
                Share Your Experience with {product.name}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-3 py-2 text-xs border border-[#E5E5E5] bg-white outline-none focus:border-[#111111]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-[#E5E5E5] bg-white outline-none focus:border-[#111111]"
                  >
                    <option value={5}>5 Stars - Exceptional</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Below Expectation</option>
                    <option value={1}>1 Star - Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us about the fabric drape, sizing accuracy, and hand-feel..."
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E5] bg-white outline-none focus:border-[#111111]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReviewFormOpen(false)}
                  className="px-4 py-2 border border-[#E5E5E5] text-xs font-semibold uppercase tracking-wider text-[#666666]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B08D57] transition-colors inline-flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          {productReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productReviews.map(r => (
                <div key={r.id} className="p-5 border border-[#E5E5E5] bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-[#B08D57] text-[#B08D57]' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#888888]">{r.date}</span>
                  </div>
                  <h5 className="text-xs font-bold text-[#111111] uppercase">{r.customerName}</h5>
                  <p className="text-xs text-[#555555] leading-relaxed">"{r.comment}"</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#888888] italic">
              No customer reviews yet. Be the first to review this garment!
            </p>
          )}
        </section>

        {/* Complete The Look / Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#E5E5E5]">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-[0.25em] text-[#B08D57] uppercase">
                Curated Suggestions
              </span>
              <h3 className="font-serif text-3xl font-semibold text-[#111111] mt-1 uppercase">
                Complete The Look
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-4 right-4 text-white p-2 hover:text-[#B08D57]"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={product.images[activeImageIdx] || product.images[0]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

    </div>
  );
};
