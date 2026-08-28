import React, { useState } from 'react';

export const DEFAULT_BRAND_LOGO =
  'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0717.jpeg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'brand';
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
      img: 'h-10 w-10 sm:h-12 sm:w-12', 
      title: 'text-base sm:text-lg', 
      subtitle: 'text-[10px]' 
    },
    md: { 
      img: 'h-12 w-12 sm:h-14 sm:w-14', 
      title: 'text-lg sm:text-xl', 
      subtitle: 'text-xs' 
    },
    lg: { 
      img: 'h-16 w-16 sm:h-20 sm:w-20', 
      title: 'text-xl sm:text-2xl', 
      subtitle: 'text-xs sm:text-sm' 
    },
    xl: { 
      img: 'h-24 w-24 sm:h-28 sm:w-28', 
      title: 'text-2xl sm:text-3xl', 
      subtitle: 'text-sm sm:text-base' 
    },
  }[size];

  const colorStyles = {
    dark: {
      title: 'text-neutral-950',
      sub: 'text-neutral-600',
      badge: 'bg-neutral-950 text-white',
    },
    light: {
      title: 'text-white',
      sub: 'text-neutral-400',
      badge: 'bg-white/10 text-white backdrop-blur-md',
    },
    brand: {
      title: 'text-neutral-950',
      sub: 'text-blue-600',
      badge: 'bg-gradient-to-r from-blue-600 to-pink-600 text-white',
    },
  }[variant];

  return (
    <div
      className={`flex select-none items-center gap-2.5 sm:gap-3.5 ${
        inline ? 'flex-row' : 'flex-row'
      } ${className}`}
    >
      {/* Brand Emblem with Dual Electric Blue & Rose Pink Glow Accent */}
      <div
        className={`relative ${sizeClasses.img} shrink-0 overflow-hidden rounded-2xl bg-white p-1 shadow-sm border border-neutral-200/80 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 via-pink-500/20 to-transparent pointer-events-none" />
        {!imgError ? (
          <img
            src={logoSrc}
            alt="J&S - Junior & Senior"
            className="w-full h-full object-contain rounded-xl bg-white relative z-10"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 text-white font-black text-xs rounded-xl relative z-10">
            <span className="text-blue-400">J<span className="text-pink-400">&amp;</span>S</span>
          </div>
        )}
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-right justify-center">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span
            className={`font-black font-['Tajawal',sans-serif] tracking-tight ${sizeClasses.title} ${colorStyles.title} flex items-center gap-1.5 leading-none`}
          >
            <span className="font-black tracking-wider font-sans bg-gradient-to-r from-blue-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              J&amp;S
            </span>
            <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-950 text-white tracking-normal font-sans">
              Junior &amp; Senior
            </span>
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 animate-pulse" />
            <span
              className={`font-medium ${sizeClasses.subtitle} ${colorStyles.sub} whitespace-nowrap`}
            >
              أزياء شباب وأطفال • ملابس عصرية
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
