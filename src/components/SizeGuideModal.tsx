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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn text-right">
      <div 
        className="relative bg-neutral-900 border border-neutral-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
          <div className="flex items-center gap-2 text-amber-400">
            <SlidersHorizontal className="w-5 h-5" />
            <h2 className="text-xl font-black text-white">دليل المقاسات المعتمد (بالسنتيمتر)</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-800 text-neutral-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1.5 bg-neutral-950 rounded-2xl border border-neutral-800 mb-6">
          <button
            onClick={() => setActiveTab('men')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'men'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>مقاسات الملابس الرجالي المودرن</span>
          </button>

          <button
            onClick={() => setActiveTab('kids')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'kids'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Baby className="w-4 h-4" />
            <span>مقاسات الأطفال الكاجوال (من 5 إلى 14 سنة)</span>
          </button>
        </div>

        {/* Tables */}
        {activeTab === 'men' ? (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-neutral-950 text-amber-400 border-b border-neutral-800">
                    <th className="p-3">المقاس</th>
                    <th className="p-3">عرض الصدر (سم)</th>
                    <th className="p-3">الطول (سم)</th>
                    <th className="p-3">الوزن التقريبي (كجم)</th>
                    <th className="p-3">الطول التقريبي (سم)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  <tr className="hover:bg-neutral-800/40">
                    <td className="p-3 font-bold text-white">M (وسط)</td>
                    <td className="p-3">52 - 54 سم</td>
                    <td className="p-3">70 سم</td>
                    <td className="p-3">55 - 68 كجم</td>
                    <td className="p-3">160 - 170 سم</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="p-3 font-bold text-white">L (كبير)</td>
                    <td className="p-3">55 - 57 سم</td>
                    <td className="p-3">72 سم</td>
                    <td className="p-3">69 - 80 كجم</td>
                    <td className="p-3">170 - 178 سم</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="p-3 font-bold text-white">XL (كبير جداً)</td>
                    <td className="p-3">58 - 60 سم</td>
                    <td className="p-3">74 سم</td>
                    <td className="p-3">81 - 92 كجم</td>
                    <td className="p-3">175 - 185 سم</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="p-3 font-bold text-white">2XL (دبل إكس)</td>
                    <td className="p-3">61 - 64 سم</td>
                    <td className="p-3">76 سم</td>
                    <td className="p-3">93 - 105 كجم</td>
                    <td className="p-3">178 - 190 سم</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="p-3 font-bold text-white">3XL (ثلاثي إكس)</td>
                    <td className="p-3">65 - 68 سم</td>
                    <td className="p-3">78 سم</td>
                    <td className="p-3">106 - 120 كجم</td>
                    <td className="p-3">180 - 195 سم</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-neutral-400">
              * ملحوظة: مقاسات التيشرتات الأوفر سايز مصممة لتكون واسعة ومريحة بحوالي 4 إلى 6 سم إضافية عند الصدر والكتف.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-neutral-950 text-amber-400 border-b border-neutral-800">
                    <th className="p-3">الفئة العمرية</th>
                    <th className="p-3">طول الطفل (سم)</th>
                    <th className="p-3">عرض صدر التيشرت</th>
                    <th className="p-3">طول البنطلون/الشورت</th>
                    <th className="p-3">الوزن التقديري</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  <tr className="hover:bg-neutral-800/40">
                    <td className="p-3 font-bold text-white">5 - 6 سنوات</td>
                    <td className="p-3">110 - 116 سم</td>
                    <td className="p-3">36 سم</td>
                    <td className="p-3">38 سم شورت / 65 سم بنطلون</td>
                    <td className="p-3">18 - 22 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="p-3 font-bold text-white">7 - 8 سنوات</td>
                    <td className="p-3">122 - 128 سم</td>
                    <td className="p-3">39 سم</td>
                    <td className="p-3">41 سم شورت / 72 سم بنطلون</td>
                    <td className="p-3">23 - 28 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="p-3 font-bold text-white">9 - 10 سنوات</td>
                    <td className="p-3">134 - 140 سم</td>
                    <td className="p-3">42 سم</td>
                    <td className="p-3">44 سم شورت / 80 سم بنطلون</td>
                    <td className="p-3">29 - 35 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="p-3 font-bold text-white">11 - 12 سنة</td>
                    <td className="p-3">146 - 152 سم</td>
                    <td className="p-3">45 سم</td>
                    <td className="p-3">47 سم شورت / 88 سم بنطلون</td>
                    <td className="p-3">36 - 44 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="p-3 font-bold text-white">13 - 14 سنة</td>
                    <td className="p-3">158 - 164 سم</td>
                    <td className="p-3">48 سم</td>
                    <td className="p-3">50 سم شورت / 95 سم بنطلون</td>
                    <td className="p-3">45 - 55 كجم</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-neutral-400">
              * ملابس الأطفال مصممة بخامات قطنية نقية 100% وأستك مرن يسمح بالنمو والراحة التامة أثناء اللعب والحركة.
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs hover:brightness-110 transition"
          >
            فهمت، العودة للتسوق
          </button>
        </div>

      </div>
    </div>
  );
};
