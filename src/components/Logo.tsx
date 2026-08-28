import React, { useState } from 'react';

export const DEFAULT_BRAND_LOGO =
  'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0717.jpeg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'pink' | 'monochrome';
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
    sm: { 
      img: 'h-11 w-11 sm:h-13 sm:w-13', 
      title: 'text-lg sm:text-xl', 
      subtitle: 'text-[11px]' 
    },
    md: { 
      img: 'h-14 w-14 sm:h-16 sm:w-16', 
      title: 'text-xl sm:text-2xl', 
      subtitle: 'text-xs' 
    },
    lg: { 
      img: 'h-20 w-20 sm:h-24 sm:w-24', 
      title: 'text-2xl sm:text-3xl', 
      subtitle: 'text-sm' 
    },
    xl: { 
      img: 'h-28 w-28 sm:h-32 sm:w-32', 
      title: 'text-3xl sm:text-4xl', 
      subtitle: 'text-base' 
    },
  }[size];

  const colorStyles = {
    dark: {
      title: 'text-slate-950',
      sub: 'text-pink-600',
      badge: 'bg-pink-600 text-white border-pink-700',
    },
    light: {
      title: 'text-white',
      sub: 'text-pink-400',
      badge: 'bg-pink-500 text-white border-pink-400',
    },
    pink: {
      title: 'text-pink-600',
      sub: 'text-slate-800',
      badge: 'bg-slate-950 text-white border-pink-500',
    },
    monochrome: {
      title: 'text-black',
      sub: 'text-neutral-700',
      badge: 'bg-neutral-900 text-white border-neutral-800',
    },
  }[variant];

  return (
    <div
      className={`flex select-none items-center gap-3 sm:gap-4 ${
        inline ? 'flex-row' : 'flex-row'
      } ${className}`}
    >
      {/* Brand Floating Logo Image with Pink, White & Black Accent */}
      <div
        className={`relative ${sizeClasses.img} shrink-0 overflow-hidden rounded-2xl bg-white p-1 shadow-md ring-2 ring-pink-500 hover:ring-pink-600 transition-all duration-300 hover:shadow-xl group-hover:scale-105`}
      >
        {!imgError ? (
          <img
            src={logoSrc}
            alt="J&S - Junior & Senior"
            className="w-full h-full object-contain rounded-xl bg-white"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-pink-500 font-black text-sm rounded-xl">
            <span>J&amp;S</span>
          </div>
        )}
      </div>

      {/* Brand Title: J&S (Junior & Senior) with high clarity */}
      <div className="flex flex-col text-right justify-center">
        <div className="flex items-center gap-2">
          <span
            className={`font-black font-['Tajawal',sans-serif] tracking-tight ${sizeClasses.title} ${colorStyles.title} flex items-center gap-2 leading-none`}
          >
            <span className="font-black text-2xl sm:text-3xl tracking-wider font-sans text-pink-600 drop-shadow-xs">
              J&amp;S
            </span>
            <span className="text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-lg bg-pink-600 text-white shadow-sm border border-pink-700">
              Junior &amp; Senior
            </span>
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
            <span
              className={`font-bold ${sizeClasses.subtitle} ${colorStyles.sub} whitespace-nowrap`}
            >
              أزياء شباب وأطفال • جملة وقطاعي
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
