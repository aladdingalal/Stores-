import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { CustomerReview } from '../types';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section className="py-12 bg-slate-50 border-b-2 border-slate-900 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-pink-600 text-xs font-black mb-1">
              <Star className="w-4 h-4 fill-pink-500 text-pink-500" />
              <span>تجارب وآراء عملائنا</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-['Tajawal',sans-serif]">
              ماذا يقول عملاء <span className="text-pink-600">J&amp;S (Junior &amp; Senior)</span>؟
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border-2 border-slate-900 shadow-xs">
            <div className="flex items-center text-pink-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              ))}
            </div>
            <span className="text-xs font-black text-slate-950 font-mono">5.0 / 5</span>
            <span className="text-[11px] text-slate-500 font-bold">(تقييمات موثقة)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-5 border-2 border-slate-900 flex flex-col justify-between space-y-3 hover:border-pink-500 shadow-xs transition"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-pink-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-950 flex items-center gap-1">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    )}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium">{rev.city}</span>
                </div>

                <span className="text-[10px] font-black text-pink-600 bg-pink-50 px-2 py-0.5 rounded-lg border border-pink-200">
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
