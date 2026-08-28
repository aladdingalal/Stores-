import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { CustomerReview } from '../types';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section className="py-12 bg-white border-b border-slate-200 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-700 text-xs font-bold mb-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>تجارب وآراء عملائنا وتجار الجملة</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-['Tajawal',sans-serif]">
              ماذا يقول عملاء <span className="text-amber-700">ملوك السعادة</span>؟
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-amber-50/70 px-3.5 py-1.5 rounded-2xl border border-amber-200/80">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-black text-slate-900">4.9 / 5</span>
            <span className="text-[11px] text-slate-500">(أكثر من 500+ طلب مؤكد)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/80 rounded-2xl p-4.5 border border-slate-200 flex flex-col justify-between space-y-3 hover:border-amber-400 hover:bg-white shadow-2xs transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-200/70 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </h4>
                  <span className="text-[10px] text-slate-500">{rev.city}</span>
                </div>

                {rev.productName && (
                  <span className="text-[9px] text-amber-900 bg-amber-100 font-medium px-2 py-0.5 rounded-md border border-amber-200 max-w-[110px] truncate">
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
