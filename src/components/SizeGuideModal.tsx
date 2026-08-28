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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn text-right">
      <div 
        className="relative bg-white border-2 border-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2 text-pink-600">
            <SlidersHorizontal className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-black text-slate-950 font-['Tajawal',sans-serif]">دليل المقاسات المعتمد لبراند J&amp;S (بالسنتيمتر)</h2>
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
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border-2 border-slate-200 mb-5">
          <button
            onClick={() => setActiveTab('kids')}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'kids'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Baby className="w-4 h-4 text-pink-400" />
            <span>مقاسات الأطفال (كود 21kids)</span>
          </button>

          <button
            onClick={() => setActiveTab('men')}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'men'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-pink-400" />
            <span>مقاسات الشباب والرجالي</span>
          </button>
        </div>

        {/* Tables */}
        {activeTab === 'kids' ? (
          <div className="space-y-4">
            <div className="overflow-x-auto border-2 border-slate-900 rounded-2xl">
              <table className="w-full text-xs text-center border-collapse">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-3 border-b border-slate-800">المقاس (السن)</th>
                    <th className="p-3 border-b border-slate-800">عرض الصدر (سم)</th>
                    <th className="p-3 border-b border-slate-800">طول القميص (سم)</th>
                    <th className="p-3 border-b border-slate-800">طول الكم (سم)</th>
                    <th className="p-3 border-b border-slate-800">الوزن التقريبي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-bold text-slate-800">
                  <tr className="hover:bg-pink-50">
                    <td className="p-3 bg-slate-50 font-black text-slate-950">4 - 6 سنوات</td>
                    <td className="p-3">36 سم</td>
                    <td className="p-3">48 سم</td>
                    <td className="p-3">40 سم</td>
                    <td className="p-3">16 - 22 كجم</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="p-3 bg-slate-50 font-black text-slate-950">6 - 8 سنوات</td>
                    <td className="p-3">39 سم</td>
                    <td className="p-3">52 سم</td>
                    <td className="p-3">44 سم</td>
                    <td className="p-3">22 - 28 كجم</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="p-3 bg-slate-50 font-black text-slate-950">8 - 10 سنوات</td>
                    <td className="p-3">42 سم</td>
                    <td className="p-3">56 سم</td>
                    <td className="p-3">48 سم</td>
                    <td className="p-3">28 - 35 كجم</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="p-3 bg-slate-50 font-black text-slate-950">10 - 12 سنة</td>
                    <td className="p-3">45 سم</td>
                    <td className="p-3">60 سم</td>
                    <td className="p-3">52 سم</td>
                    <td className="p-3">35 - 44 كجم</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="p-3 bg-slate-50 font-black text-slate-950">12 - 14 سنة</td>
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
            <div className="overflow-x-auto border-2 border-slate-900 rounded-2xl">
              <table className="w-full text-xs text-center border-collapse">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-3 border-b border-slate-800">المقاس</th>
                    <th className="p-3 border-b border-slate-800">عرض الصدر (سم)</th>
                    <th className="p-3 border-b border-slate-800">الطول الكلي (سم)</th>
                    <th className="p-3 border-b border-slate-800">الوزن الموصى به</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-bold text-slate-800">
                  <tr className="hover:bg-pink-50">
                    <td className="p-3 bg-slate-50 font-black text-slate-950">M</td>
                    <td className="p-3">52 سم</td>
                    <td className="p-3">70 سم</td>
                    <td className="p-3">55 - 68 كجم</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="p-3 bg-slate-50 font-black text-slate-950">L</td>
                    <td className="p-3">55 سم</td>
                    <td className="p-3">72 سم</td>
                    <td className="p-3">68 - 78 كجم</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="p-3 bg-slate-50 font-black text-slate-950">XL</td>
                    <td className="p-3">58 سم</td>
                    <td className="p-3">75 سم</td>
                    <td className="p-3">78 - 90 كجم</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="p-3 bg-slate-50 font-black text-slate-950">2XL</td>
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
        <div className="mt-5 p-3.5 rounded-2xl bg-pink-50 border border-pink-200 flex items-center gap-2.5 text-xs text-slate-800">
          <Check className="w-4 h-4 text-pink-600 shrink-0" />
          <span>
            <strong>ملاحظة هامة:</strong> الشحنة تصلك مع إمكانية المعاينة والقياس الكامل قبل دفع المبلغ للمندوب.
          </span>
        </div>

      </div>
    </div>
  );
};
