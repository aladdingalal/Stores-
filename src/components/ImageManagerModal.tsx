import React, { useState } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  Trash2, 
  Check, 
  Image as ImageIcon, 
  RefreshCw, 
  Crown, 
  Sparkles, 
  Layers, 
  Save, 
  Download, 
  AlertCircle 
} from 'lucide-react';
import { Product } from '../types';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProductImage: (productId: string, newImageUrl: string) => void;
  onResetAllImages: () => void;
  onCustomLogoUpload?: (logoUrl: string) => void;
  targetProduct?: Product | null;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProductImage,
  onResetAllImages,
  onCustomLogoUpload,
  targetProduct,
}) => {
  if (!isOpen) return null;

  const [selectedProductId, setSelectedProductId] = useState<string>(
    targetProduct?.id || products[0]?.id || ''
  );
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewUrl(dataUrl);
      setImageUrlInput(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyToProduct = () => {
    if (!selectedProductId || !imageUrlInput) return;
    onUpdateProductImage(selectedProductId, imageUrlInput);
    setSuccessToast(`تم تحديث صورة "${selectedProduct?.name}" بنجاح!`);
    setImageUrlInput('');
    setPreviewUrl(null);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleRemoveCustomImage = (productId: string) => {
    onUpdateProductImage(productId, '');
    setSuccessToast('تمت استعادة الصورة الأصلية');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleCustomLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onCustomLogoUpload) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onCustomLogoUpload(dataUrl);
      setSuccessToast('تم تحديث الشعار بنجاح!');
      setTimeout(() => setSuccessToast(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn text-right">
      <div 
        className="relative bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-700">
              <Camera className="w-6 h-6" />
              <h2 className="text-lg sm:text-2xl font-black text-slate-950 font-['Tajawal',sans-serif]">
                لوحة تحديث وتغيير صور المنتجات
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              يمكنك بسهولة رفع صور ملابسك الحقيقية أو إدخال روابط الصور لتظهر فوراً في المتجر
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition border border-slate-200"
            id="close-image-manager-btn"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast alert */}
        {successToast && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Product Selector & Upload Controls */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Step 1: Select Product */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                1. اختر الموديل الذي ترغب في تغيير صورته:
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-bold"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.subCategoryName}) {p.customImage ? '✓ معدلة' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Upload File or Insert URL */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                2. اختر الصورة الجديدة:
              </label>

              {/* Local File Upload */}
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl cursor-pointer bg-white transition">
                  <div className="flex flex-col items-center justify-center pt-4 pb-4">
                    <Upload className="w-7 h-7 text-amber-600 mb-1" />
                    <p className="text-xs font-bold text-slate-800">
                      اضغط لاختيار صورة من جهازك / هاتفك
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      (JPG, PNG, WebP)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Or direct URL */}
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 block">أو أدخل رابط صورة مباشر (URL):</span>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={imageUrlInput}
                  onChange={(e) => {
                    setImageUrlInput(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 dir-ltr text-left"
                />
              </div>

              {/* Submit update button */}
              <button
                type="button"
                onClick={handleApplyToProduct}
                disabled={!imageUrlInput}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>حفظ وتطبيق الصورة على الموديل فوراً</span>
              </button>
            </div>

            {/* Change Brand Logo section */}
            {onCustomLogoUpload && (
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 text-xs font-bold">
                  <Crown className="w-4 h-4 text-amber-700" />
                  <span>تغيير لوجو البراند الرئيسي:</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  يمكنك رفع ملف لوجو مخصص ليظهر في أعلى المتجر وأسفله
                </p>
                <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold cursor-pointer transition shadow-2xs">
                  <Upload className="w-4 h-4 text-amber-600" />
                  <span>رفع لوجو المتجر</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCustomLogoFile}
                  />
                </label>
              </div>
            )}

          </div>

          {/* Right Column: Live Comparison & Preview */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              معاينة الموديل المختار:
            </span>

            {selectedProduct && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-200 border border-slate-200">
                  <img
                    src={previewUrl || selectedProduct.customImage || selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {previewUrl && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                      معاينة قبل الحفظ
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    {selectedProduct.name}
                  </h4>
                  <span className="text-[11px] text-amber-800 font-bold block mt-0.5">
                    القسم: {selectedProduct.subCategoryName}
                  </span>
                </div>

                {selectedProduct.customImage && (
                  <button
                    onClick={() => handleRemoveCustomImage(selectedProduct.id)}
                    className="w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف الصورة المخصصة واستعادة الأصلية</span>
                  </button>
                )}
              </div>
            )}

            <button
              onClick={onResetAllImages}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center justify-center gap-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>استعادة جميع الصور الافتراضية للمتجر</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
