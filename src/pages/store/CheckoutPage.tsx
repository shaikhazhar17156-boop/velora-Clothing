import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import confetti from 'canvas-confetti';
import { 
  Check, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  Lock, 
  ArrowRight, 
  ChevronRight,
  Truck
} from 'lucide-react';
import { PaymentMethod } from '../../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartSavings, 
    cartDeliveryFee, 
    cartTotal, 
    appliedCoupon, 
    placeOrder, 
    currentCustomer 
  } = useStore();

  const { navigate } = useRouter();

  // Multi-step tracking: 1: Auth, 2: Shipping, 3: Review, 4: Payment
  const [step, setStep] = useState<number>(2); // Start at Shipping as guest/logged in
  const [isProcessing, setIsProcessing] = useState(false);

  // Form fields
  const [email, setEmail] = useState(currentCustomer.email || 'guest@example.com');
  const [fullName, setFullName] = useState(currentCustomer.name || 'Aarav Sharma');
  const [phone, setPhone] = useState(currentCustomer.phone || '+91 98765 43210');
  const [street, setStreet] = useState('Flat 402, Magnolia Enclave, Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560038');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 bg-white">
        <div className="text-center space-y-3">
          <h2 className="font-serif text-2xl font-bold uppercase text-[#111111]">
            Your Bag is Empty
          </h2>
          <p className="text-xs text-[#666666]">
            Please add items to your bag before proceeding to checkout.
          </p>
          <button
            onClick={() => navigate('/men')}
            className="px-6 py-2.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B08D57]"
          >
            Explore Clothing
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment gateway handshake
    await new Promise(resolve => setTimeout(resolve, 1400));

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback
    }

    // Place order in store context
    const orderItems = cart.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      image: item.product.images[0],
      size: item.selectedSize,
      color: item.selectedColor.name,
      price: item.product.price,
      quantity: item.quantity
    }));

    const createdOrder = placeOrder({
      customer: {
        name: fullName,
        email,
        phone
      },
      shippingAddress: {
        fullName,
        street,
        city,
        state,
        pincode,
        country: 'India',
        phone
      },
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartSavings + (appliedCoupon ? (cartSubtotal - (cartTotal - cartDeliveryFee)) : 0),
      couponApplied: appliedCoupon?.code,
      shippingFee: cartDeliveryFee,
      tax: 0,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      status: 'Confirmed'
    });

    setIsProcessing(false);
    navigate(`/order-success/${createdOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header & Steps */}
        <div className="mb-10 text-center">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#B08D57] uppercase block mb-1">
            VELORA Atelier &bull; Secure Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] uppercase tracking-wide">
            Complete Your Purchase
          </h1>

          {/* Stepper Wizard */}
          <div className="max-w-md mx-auto mt-6 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#111111] font-bold' : 'text-[#999999]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#111111] text-white' : 'bg-[#E5E5E5]'}`}>1</span>
              <span>Account</span>
            </div>
            <div className="w-8 h-0.5 bg-[#E5E5E5]" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#111111] font-bold' : 'text-[#999999]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#111111] text-white' : 'bg-[#E5E5E5]'}`}>2</span>
              <span>Delivery</span>
            </div>
            <div className="w-8 h-0.5 bg-[#E5E5E5]" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#111111] font-bold' : 'text-[#999999]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#111111] text-white' : 'bg-[#E5E5E5]'}`}>3</span>
              <span>Review</span>
            </div>
            <div className="w-8 h-0.5 bg-[#E5E5E5]" />
            <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-[#111111] font-bold' : 'text-[#999999]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 4 ? 'bg-[#B08D57] text-white' : 'bg-[#E5E5E5]'}`}>4</span>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Step Form (7-8 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#E5E5E5] shadow-xs space-y-8">
            
            {/* STEP 1: Account / Guest Contact */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] mb-4">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#111111]">
                  1. Contact Information
                </h3>
                {step > 1 && (
                  <button onClick={() => setStep(1)} className="text-xs text-[#B08D57] hover:underline font-semibold">
                    Edit
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* STEP 2: Shipping Address */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] mb-4">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#111111]">
                  2. Delivery Address
                </h3>
                {step > 2 && (
                  <button onClick={() => setStep(2)} className="text-xs text-[#B08D57] hover:underline font-semibold">
                    Edit
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                    Street Address / Apartment / Flat No. *
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 & 4: Payment Method Selection */}
            <div>
              <div className="pb-3 border-b border-[#E5E5E5] mb-4">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#111111]">
                  3. Select Payment Method
                </h3>
                <p className="text-[11px] text-[#666666] mt-0.5">
                  All transactions are 256-bit SSL encrypted & secure.
                </p>
              </div>

              {/* Payment Tabs */}
              <div className="space-y-3">
                
                {/* 1. UPI */}
                <label className={`block border p-4 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#B08D57] bg-[#F9F5EE]' : 'border-[#E5E5E5] hover:border-gray-400'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-[#B08D57]"
                      />
                      <QrCode className="w-5 h-5 text-[#B08D57]" />
                      <div>
                        <span className="text-xs font-bold text-[#111111] uppercase block">
                          Instant UPI & QR Code
                        </span>
                        <span className="text-[11px] text-[#666666]">
                          Google Pay, PhonePe, Paytm, BHIM UPI
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#2E7D32] bg-green-50 px-2 py-0.5 border border-green-200">
                      Recommended
                    </span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-4 pt-3 border-t border-[#E5E5E5] space-y-2">
                      <label className="text-[11px] font-semibold text-[#111111] block">
                        Enter UPI ID (VPA):
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full px-3 py-2 text-xs border border-[#CCCCCC] bg-white outline-none focus:border-[#111111]"
                      />
                    </div>
                  )}
                </label>

                {/* 2. Credit / Debit Card */}
                <label className={`block border p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#B08D57] bg-[#F9F5EE]' : 'border-[#E5E5E5] hover:border-gray-400'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#B08D57]"
                    />
                    <CreditCard className="w-5 h-5 text-[#B08D57]" />
                    <div>
                      <span className="text-xs font-bold text-[#111111] uppercase block">
                        Credit / Debit Card
                      </span>
                      <span className="text-[11px] text-[#666666]">
                        Visa, Mastercard, RuPay, American Express
                      </span>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-3 border-t border-[#E5E5E5] space-y-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#111111] block mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="•••• •••• •••• ••••"
                          className="w-full px-3 py-2 text-xs border border-[#CCCCCC] bg-white outline-none focus:border-[#111111]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-[#111111] block mb-1">
                            Valid Thru (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 text-xs border border-[#CCCCCC] bg-white outline-none focus:border-[#111111]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-[#111111] block mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full px-3 py-2 text-xs border border-[#CCCCCC] bg-white outline-none focus:border-[#111111]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* 3. Net Banking */}
                <label className={`block border p-4 cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-[#B08D57] bg-[#F9F5EE]' : 'border-[#E5E5E5] hover:border-gray-400'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="accent-[#B08D57]"
                    />
                    <Building2 className="w-5 h-5 text-[#B08D57]" />
                    <div>
                      <span className="text-xs font-bold text-[#111111] uppercase block">
                        Net Banking
                      </span>
                      <span className="text-[11px] text-[#666666]">
                        HDFC, ICICI, SBI, Axis, Kotak and 50+ banks
                      </span>
                    </div>
                  </div>
                </label>

                {/* 4. Cash on Delivery */}
                <label className={`block border p-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#B08D57] bg-[#F9F5EE]' : 'border-[#E5E5E5] hover:border-gray-400'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#B08D57]"
                    />
                    <Banknote className="w-5 h-5 text-[#B08D57]" />
                    <div>
                      <span className="text-xs font-bold text-[#111111] uppercase block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[11px] text-[#666666]">
                        Pay cash or scan QR at doorstep upon delivery
                      </span>
                    </div>
                  </div>
                </label>

              </div>
            </div>

            {/* Place Order CTA Button */}
            <div className="pt-4">
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-4 bg-[#111111] hover:bg-[#B08D57] text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-75 cursor-pointer"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing & Verifying Order...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>PLACE ORDER &bull; ₹{cartTotal.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right: Order Summary Sidebar (4-5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 border border-[#E5E5E5] shadow-xs space-y-6 sticky top-28">
            
            <div className="pb-3 border-b border-[#E5E5E5] flex items-baseline justify-between">
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#111111]">
                Order Items ({cart.length})
              </h3>
              <button
                onClick={() => navigate('/cart')}
                className="text-xs text-[#B08D57] hover:underline font-semibold"
              >
                Edit Bag
              </button>
            </div>

            {/* Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[#F0F0F0]">
              {cart.map(item => (
                <div key={item.id} className="pt-2 first:pt-0 flex gap-3 items-center">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-16 object-cover border border-[#E5E5E5] bg-[#F7F7F7]"
                  />
                  <div className="flex-1 text-xs">
                    <h5 className="font-medium text-[#111111] line-clamp-1">{item.product.name}</h5>
                    <p className="text-[11px] text-[#666666]">
                      Size: {item.selectedSize} &bull; Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#111111]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations breakdown */}
            <div className="space-y-2 pt-4 border-t border-[#E5E5E5] text-xs text-[#666666]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#111111]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {cartSavings > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Savings</span>
                  <span>-₹{cartSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              {appliedCoupon && (
                <div className="flex justify-between text-[#B08D57] font-semibold">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>Applied</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span>{cartDeliveryFee === 0 ? <strong className="text-[#2E7D32]">FREE</strong> : `₹${cartDeliveryFee}`}</span>
              </div>
              <div className="pt-3 border-t border-[#E5E5E5] flex justify-between items-baseline text-sm font-bold text-[#111111]">
                <span>Grand Total</span>
                <span className="text-lg font-serif">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Shipping badge */}
            <div className="p-3 bg-[#F9F5EE] border border-[#B08D57]/40 flex items-center gap-2.5 text-xs text-[#111111]">
              <Truck className="w-4 h-4 text-[#B08D57] shrink-0" />
              <span>Standard delivery arrives in 3-4 business days.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
