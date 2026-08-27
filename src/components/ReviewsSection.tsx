import React from 'react';
import { Star, CheckCircle, Quote, MessageSquare } from 'lucide-react';
import { CustomerReview } from '../types';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section className="py-14 bg-neutral-950 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border-b border-neutral-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>تجارب وآراء عملائنا وتجار الجملة</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white font-['Tajawal',sans-serif]">
              ماذا يقول عملاء <span className="text-amber-400">ملوك السعاده</span>؟
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-neutral-900 px-4 py-2 rounded-2xl border border-neutral-800">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-black text-white">4.9 / 5</span>
            <span className="text-xs text-neutral-400">(أكثر من 500+ طلب مؤكد)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-900/80 rounded-2xl p-5 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-500">{rev.date}</span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </h4>
                  <span className="text-[10px] text-neutral-400">{rev.city}</span>
                </div>

                {rev.productName && (
                  <span className="text-[9px] text-amber-400/80 bg-neutral-950 px-2 py-0.5 rounded-md border border-neutral-800 max-w-[110px] truncate">
                    {rev.productName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
