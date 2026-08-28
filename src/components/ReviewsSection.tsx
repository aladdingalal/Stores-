import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { CustomerReview } from '../types';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-neutral-200 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-neutral-100 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>تجارب وآراء عملائنا</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-950 font-['Tajawal',sans-serif]">
              ماذا يقول عملاء براند <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">J&amp;S</span>؟
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-neutral-50 px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-2xs">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-neutral-950 font-sans">5.0 / 5</span>
            <span className="text-[11px] text-neutral-500 font-medium">(تقييمات موثقة)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-5 border border-neutral-200/80 flex flex-col justify-between space-y-3 hover:border-neutral-300 shadow-2xs transition"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-neutral-400">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-950 flex items-center gap-1">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3 h-3 text-blue-600 shrink-0" />
                    )}
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-medium">{rev.city}</span>
                </div>

                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {rev.productName}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
