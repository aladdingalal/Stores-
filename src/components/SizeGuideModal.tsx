import React, { useState } from 'react';
import { X, SlidersHorizontal, User, Baby, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'men' | 'kids'>('men');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn text-right">
      <div 
        className="relative bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2 text-amber-700">
            <SlidersHorizontal className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-black text-slate-950 font-['Tajawal',sans-serif]">دليل المقاسات المعتمد (بالسنتيمتر)</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition border border-slate-200"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 mb-5">
          <button
            onClick={() => setActiveTab('men')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'men'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-amber-600" />
            <span>مقاسات الملابس الرجالي المودرن</span>
          </button>

          <button
            onClick={() => setActiveTab('kids')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'kids'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Baby className="w-4 h-4 text-amber-600" />
            <span>مقاسات الأطفال الكاجوال (من 2 إلى 14 سنة)</span>
          </button>
        </div>

        {/* Tables */}
        {activeTab === 'men' ? (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 border-b border-slate-200 font-bold">
                    <th className="p-3">المقاس</th>
                    <th className="p-3">عرض الصدر (سم)</th>
                    <th className="p-3">الطول (سم)</th>
                    <th className="p-3">الوزن التقريبي (كجم)</th>
                    <th className="p-3">الطول التقريبي (سم)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">M (وسط)</td>
                    <td className="p-3">52 - 54 سم</td>
                    <td className="p-3">70 سم</td>
                    <td className="p-3">55 - 68 كجم</td>
                    <td className="p-3">160 - 170 سم</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">L (كبير)</td>
                    <td className="p-3">55 - 57 سم</td>
                    <td className="p-3">72 سم</td>
                    <td className="p-3">69 - 80 كجم</td>
                    <td className="p-3">170 - 178 سم</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">XL (كبير جداً)</td>
                    <td className="p-3">58 - 60 سم</td>
                    <td className="p-3">74 سم</td>
                    <td className="p-3">81 - 92 كجم</td>
                    <td className="p-3">175 - 185 سم</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">2XL (دبل إكس)</td>
                    <td className="p-3">61 - 64 سم</td>
                    <td className="p-3">76 سم</td>
                    <td className="p-3">93 - 105 كجم</td>
                    <td className="p-3">178 - 190 سم</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">3XL (ثلاثي إكس)</td>
                    <td className="p-3">65 - 68 سم</td>
                    <td className="p-3">78 سم</td>
                    <td className="p-3">106 - 120 كجم</td>
                    <td className="p-3">180 - 195 سم</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500">
              * ملحوظة: مقاسات التيشرتات الأوفر سايز مصممة لتكون مريحة وفضفاضة بحوالي 4 إلى 6 سم إضافية عند الصدر والكتف.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 border-b border-slate-200 font-bold">
                    <th className="p-3">الفئة العمرية</th>
                    <th className="p-3">طول الطفل (سم)</th>
                    <th className="p-3">عرض صدر التيشرت</th>
                    <th className="p-3">طول البنطلون/الشورت</th>
                    <th className="p-3">الوزن التقديري</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">2 - 4 سنوات</td>
                    <td className="p-3">95 - 105 سم</td>
                    <td className="p-3">33 سم</td>
                    <td className="p-3">30 سم شورت / 55 سم بنطلون</td>
                    <td className="p-3">13 - 17 كجم</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">5 - 6 سنوات</td>
                    <td className="p-3">110 - 116 سم</td>
                    <td className="p-3">36 سم</td>
                    <td className="p-3">38 سم شورت / 65 سم بنطلون</td>
                    <td className="p-3">18 - 22 كجم</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">7 - 8 سنوات</td>
                    <td className="p-3">122 - 128 سم</td>
                    <td className="p-3">39 سم</td>
                    <td className="p-3">42 سم شورت / 75 سم بنطلون</td>
                    <td className="p-3">23 - 28 كجم</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">9 - 10 سنوات</td>
                    <td className="p-3">134 - 140 سم</td>
                    <td className="p-3">42 سم</td>
                    <td className="p-3">45 سم شورت / 82 سم بنطلون</td>
                    <td className="p-3">29 - 35 كجم</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">11 - 12 سنة</td>
                    <td className="p-3">146 - 152 سم</td>
                    <td className="p-3">45 سم</td>
                    <td className="p-3">48 سم شورت / 88 سم بنطلون</td>
                    <td className="p-3">36 - 44 كجم</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-950">13 - 14 سنة</td>
                    <td className="p-3">158 - 164 سم</td>
                    <td className="p-3">48 سم</td>
                    <td className="p-3">52 سم شورت / 94 سم بنطلون</td>
                    <td className="p-3">45 - 54 كجم</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500">
              * جميع ملابس الأطفال مصنوعة من خامات قطن ناعم ومريح ومطاطي ومناسب للبشرة الحساسة.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
