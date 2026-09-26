import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Check } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Welcome to the VELORA Club! Your 10% welcome coupon is WELCOME10', 'success');
  };

  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <span className="text-xs font-bold tracking-[0.28em] text-[#B08D57] uppercase block mb-2">
          The Private Gazette
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#111111]">
          STYLE THAT STAYS <span className="italic font-serif font-semibold">WITH YOU</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#666666] max-w-md mx-auto mt-3 leading-relaxed">
          Sign up for new arrivals, exclusive offers and fashion updates. Enjoy 10% off your initial wardrobe order.
        </p>

        {isSubscribed ? (
          <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#F9F5EE] border border-[#B08D57] text-[#111111] text-xs font-semibold uppercase tracking-wider">
            <Check className="w-4 h-4 text-[#B08D57]" />
            <span>Thank you for subscribing. Use code WELCOME10 at checkout.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-[#E5E5E5] focus:border-[#111111] outline-none rounded-none placeholder:text-[#999999]"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
            >
              SUBSCRIBE
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
