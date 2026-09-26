import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const { reviews } = useStore();
  const approvedReviews = reviews.filter(r => r.status === 'Approved');

  return (
    <section className="py-16 md:py-24 bg-[#F7F7F7] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.25em] text-[#B08D57] uppercase">
            Real Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <div className="w-12 h-0.5 bg-[#B08D57] mx-auto mt-4" />
        </div>

        {/* Reviews Grid / Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {approvedReviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 sm:p-8 border border-[#E5E5E5] flex flex-col justify-between shadow-xs hover:border-[#B08D57] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-[#B08D57] text-[#B08D57]' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E5E5E5]" />
                </div>

                <p className="text-xs sm:text-[13px] text-[#444444] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0F0F0]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wide">
                      {review.customerName}
                    </h4>
                    <p className="text-[11px] text-[#888888] line-clamp-1 mt-0.5">
                      Purchased: <span className="text-[#555555] font-medium">{review.productName}</span>
                    </p>
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#B08D57] font-semibold bg-[#F9F5EE] px-2 py-0.5 border border-[#B08D57]/30">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
