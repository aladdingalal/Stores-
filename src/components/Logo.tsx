import React, { useState } from 'react';

export const DEFAULT_BRAND_LOGO =
  'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0717.jpeg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'gold' | 'monochrome';
  customLogoUrl?: string;
  showSubtitle?: boolean;
  inline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  customLogoUrl = DEFAULT_BRAND_LOGO,
  showSubtitle = true,
  inline = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const logoSrc = customLogoUrl || DEFAULT_BRAND_LOGO;

  const sizeClasses = {
    sm: { img: 'h-9 w-9 sm:h-10 sm:w-10', title: 'text-base sm:text-lg', subtitle: 'text-[10px]' },
    md: { img: 'h-11 w-11 sm:h-13 sm:w-13', title: 'text-lg sm:text-xl', subtitle: 'text-xs' },
    lg: { img: 'h-16 w-16 sm:h-20 sm:w-20', title: 'text-2xl sm:text-3xl', subtitle: 'text-sm' },
    xl: { img: 'h-24 w-24 sm:h-28 sm:w-28', title: 'text-3xl sm:text-4xl', subtitle: 'text-base' },
  }[size];

  const colorStyles = {
    dark: {
      title: 'text-slate-950',
      subtitle: 'text-amber-800',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    light: {
      title: 'text-white',
      subtitle: 'text-amber-300',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    gold: {
      title: 'text-amber-600',
      subtitle: 'text-amber-700',
      badge: 'bg-amber-500 text-slate-950 border-amber-600',
    },
    monochrome: {
      title: 'text-black',
      subtitle: 'text-neutral-700',
      badge: 'bg-neutral-200 text-neutral-900 border-neutral-300',
    },
  }[variant];

  return (
    <div
      className={`flex select-none items-center gap-2.5 sm:gap-3.5 ${
        inline ? 'flex-row' : 'flex-row'
      } ${className}`}
    >
      {/* Brand Floating Logo Image */}
      <div
        className={`relative ${sizeClasses.img} shrink-0 overflow-hidden rounded-2xl bg-white p-0.5 shadow-md ring-2 ring-amber-400/70 hover:ring-amber-500 transition-all duration-300 hover:shadow-lg group-hover:scale-105`}
      >
        {!imgError ? (
          <img
            src={logoSrc}
            alt="J&S - Junior & Senior"
            className="w-full h-full object-cover rounded-xl"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-950 text-amber-400 font-black text-sm rounded-xl">
            J&S
          </div>
        )}
      </div>

      {/* Brand Title: J&S (Junior & Senior) */}
      <div className="flex flex-col text-right justify-center">
        <div className="flex items-center gap-2">
          <span
            className={`font-black font-['Tajawal',sans-serif] tracking-tight ${sizeClasses.title} ${colorStyles.title} flex items-center gap-1.5 leading-none`}
          >
            <span className="font-extrabold tracking-wider font-sans">J&amp;S</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 shadow-2xs">
              Junior &amp; Senior
            </span>
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span
              className={`font-bold ${sizeClasses.subtitle} ${colorStyles.subtitle} whitespace-nowrap`}
            >
              اختصار Junior &amp; Senior • جملة وقطاعي
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
