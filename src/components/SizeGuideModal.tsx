import React, { useState } from 'react';
import { X, SlidersHorizontal, User, Baby, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'kids' | 'men'>('kids');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn text-right">
      <div 
        className="relative bg-white border border-neutral-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
          <div className="flex items-center gap-2 text-blue-600">
            <SlidersHorizontal className="w-5 h-5" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-950 font-['Tajawal',sans-serif]">دليل المقاسات المعتمد لبراند J&amp;S (بالسنتيمتر)</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 bg-neutral-100 rounded-full mb-5">
          <button
            onClick={() => setActiveTab('kids')}
            className={`flex-1 py-2 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'kids'
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Baby className="w-3.5 h-3.5 text-pink-400" />
            <span>مقاسات الأطفال (كود 21kids)</span>
          </button>

          <button
            onClick={() => setActiveTab('men')}
            className={`flex-1 py-2 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'men'
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>مقاسات الشباب والرجالي</span>
          </button>
        </div>

        {/* Tables */}
        {activeTab === 'kids' ? (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-neutral-200 rounded-2xl">
              <table className="w-full text-xs text-center border-collapse">
                <thead className="bg-neutral-950 text-white">
                  <tr>
                    <th className="p-3 border-b border-neutral-800">المقاس (السن)</th>
                    <th className="p-3 border-b border-neutral-800">عرض الصدر (سم)</th>
                    <th className="p-3 border-b border-neutral-800">طول القميص (سم)</th>
                    <th className="p-3 border-b border-neutral-800">طول الكم (سم)</th>
                    <th className="p-3 border-b border-neutral-800">الوزن التقريبي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-bold text-neutral-800">
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 bg-neutral-50 font-black text-neutral-950">4 - 6 سنوات</td>
                    <td className="p-3">36 سم</td>
                    <td className="p-3">48 سم</td>
                    <td className="p-3">40 سم</td>
                    <td className="p-3">16 - 22 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 bg-neutral-50 font-black text-neutral-950">6 - 8 سنوات</td>
                    <td className="p-3">39 سم</td>
                    <td className="p-3">52 سم</td>
                    <td className="p-3">44 سم</td>
                    <td className="p-3">22 - 28 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 bg-neutral-50 font-black text-neutral-950">8 - 10 سنوات</td>
                    <td className="p-3">42 سم</td>
                    <td className="p-3">56 سم</td>
                    <td className="p-3">48 سم</td>
                    <td className="p-3">28 - 35 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 bg-neutral-50 font-black text-neutral-950">10 - 12 سنة</td>
                    <td className="p-3">45 سم</td>
                    <td className="p-3">60 سم</td>
                    <td className="p-3">52 سم</td>
                    <td className="p-3">35 - 44 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 bg-neutral-50 font-black text-neutral-950">12 - 14 سنة</td>
                    <td className="p-3">48 سم</td>
                    <td className="p-3">64 سم</td>
                    <td className="p-3">56 سم</td>
                    <td className="p-3">44 - 52 كجم</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-neutral-200 rounded-2xl">
              <table className="w-full text-xs text-center border-collapse">
                <thead className="bg-neutral-950 text-white">
                  <tr>
                    <th className="p-3 border-b border-neutral-800">المقاس</th>
                    <th className="p-3 border-b border-neutral-800">عرض الصدر (سم)</th>
                    <th className="p-3 border-b border-neutral-800">الطول الكلي (سم)</th>
                    <th className="p-3 border-b border-neutral-800">الوزن الموصى به</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-bold text-neutral-800">
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 bg-neutral-50 font-black text-neutral-950">M</td>
                    <td className="p-3">52 سم</td>
                    <td className="p-3">70 سم</td>
                    <td className="p-3">55 - 68 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 bg-neutral-50 font-black text-neutral-950">L</td>
                    <td className="p-3">55 سم</td>
                    <td className="p-3">72 سم</td>
                    <td className="p-3">68 - 78 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 bg-neutral-50 font-black text-neutral-950">XL</td>
                    <td className="p-3">58 سم</td>
                    <td className="p-3">75 سم</td>
                    <td className="p-3">78 - 90 كجم</td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 bg-neutral-50 font-black text-neutral-950">2XL</td>
                    <td className="p-3">62 سم</td>
                    <td className="p-3">78 سم</td>
                    <td className="p-3">90 - 105 كجم</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tip */}
        <div className="mt-5 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-2.5 text-xs text-neutral-800">
          <Check className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>ملاحظة هامة:</strong> الشحنة تصلك مع إمكانية المعاينة والقياس الكامل قبل دفع المبلغ للمندوب.
          </span>
        </div>

      </div>
    </div>
  );
};
