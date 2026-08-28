import React from 'react';

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
  variant = 'dark', // Default to crisp modern dark text on light backgrounds
  customLogoUrl,
  showSubtitle = true,
  inline = false,
}) => {
  if (customLogoUrl) {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <img
          src={customLogoUrl}
          alt="ملوك السعادة"
          className={`object-contain ${
            size === 'sm'
              ? 'h-9'
              : size === 'md'
              ? 'h-13'
              : size === 'lg'
              ? 'h-18'
              : 'h-24'
          }`}
          referrerPolicy="no-referrer"
        />
        {showSubtitle && (
          <div className="text-right">
            <span className="font-black text-slate-900 block text-base font-['Tajawal',sans-serif]">
              ملوك السعادة
            </span>
            <span className="text-[10px] text-amber-700 font-bold block">
              براند ملابس للجملة والقطاعي
            </span>
          </div>
        )}
      </div>
    );
  }

  const sizeClasses = {
    sm: { icon: 'w-8 h-8', title: 'text-base sm:text-lg', subtitle: 'text-[9px]' },
    md: { icon: 'w-11 h-11', title: 'text-xl sm:text-2xl', subtitle: 'text-[10px]' },
    lg: { icon: 'w-16 h-16', title: 'text-2xl sm:text-3xl', subtitle: 'text-xs' },
    xl: { icon: 'w-24 h-24', title: 'text-3xl sm:text-4xl', subtitle: 'text-sm' },
  }[size];

  const colorStyles = {
    // For light mode pages (slate/dark text with black & white lion and gold accents)
    dark: {
      lionFill: '#0F172A',
      lionAccent: '#FFFFFF',
      crownGold: '#D97706',
      title: 'text-slate-950',
      subtitle: 'text-amber-800',
      line: 'bg-amber-400',
      badgeBg: 'bg-slate-950 text-white',
    },
    // For dark headers or dark accents
    light: {
      lionFill: '#FFFFFF',
      lionAccent: '#0F172A',
      crownGold: '#F59E0B',
      title: 'text-white',
      subtitle: 'text-amber-300',
      line: 'bg-amber-500/60',
      badgeBg: 'bg-white text-slate-950',
    },
    gold: {
      lionFill: '#F59E0B',
      lionAccent: '#000000',
      crownGold: '#FBBF24',
      title: 'text-amber-600',
      subtitle: 'text-slate-600',
      line: 'bg-amber-500',
      badgeBg: 'bg-amber-500 text-slate-950',
    },
    monochrome: {
      lionFill: '#000000',
      lionAccent: '#FFFFFF',
      crownGold: '#000000',
      title: 'text-black',
      subtitle: 'text-neutral-600',
      line: 'bg-black',
      badgeBg: 'bg-black text-white',
    },
  }[variant];

  return (
    <div
      className={`flex select-none items-center gap-2.5 ${
        inline ? 'flex-row' : 'flex-row sm:flex-row'
      } ${className}`}
    >
      {/* Majestic Black & White Lion Head Vector Emblem with Crown */}
      <div
        className={`relative ${sizeClasses.icon} shrink-0 flex items-center justify-center rounded-2xl bg-slate-950 p-1.5 shadow-sm border border-slate-800 transition-transform duration-300 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Royal Crown atop Lion */}
          <path
            d="M26 28 L35 15 L50 24 L65 15 L74 28 L62 26 L50 28 L38 26 Z"
            fill="#F59E0B"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />
          <circle cx="35" cy="14" r="2" fill="#FFFFFF" />
          <circle cx="50" cy="11" r="2.5" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="65" cy="14" r="2" fill="#FFFFFF" />

          {/* Lion Mane Outline / Fur Flames */}
          <path
            d="M50 24 C36 24 24 34 20 46 C16 58 20 72 30 82 C38 90 50 94 50 94 C50 94 62 90 70 82 C80 72 84 58 80 46 C76 34 64 24 50 24 Z"
            fill="#FFFFFF"
          />

          {/* Outer Mane Silhouette (Black) */}
          <path
            d="M50 26 C38 26 27 35 24 46 C21 56 24 67 32 76 L36 70 C30 63 28 54 31 46 C34 38 42 32 50 32 C58 32 66 38 69 46 C72 54 70 63 64 70 L68 76 C76 67 79 56 76 46 C73 35 62 26 50 26 Z"
            fill="#0F172A"
          />

          {/* Lion Ears */}
          <path d="M22 34 C19 28 26 24 30 29 C28 34 25 36 22 34 Z" fill="#0F172A" />
          <path d="M78 34 C81 28 74 24 70 29 C72 34 75 36 78 34 Z" fill="#0F172A" />

          {/* Lion Face Mask & Brow */}
          <path
            d="M36 44 C42 42 47 46 50 48 C53 46 58 42 64 44 C67 48 64 54 62 58 C58 54 54 52 50 52 C46 52 42 54 38 58 C36 54 33 48 36 44 Z"
            fill="#0F172A"
          />

          {/* Piercing Noble Eyes */}
          <path d="M38 48 Q43 45 46 49 Q43 51 38 48 Z" fill="#F59E0B" />
          <circle cx="42" cy="48" r="1.2" fill="#0F172A" />
          <path d="M62 48 Q57 45 54 49 Q57 51 62 48 Z" fill="#F59E0B" />
          <circle cx="58" cy="48" r="1.2" fill="#0F172A" />

          {/* Lion Nose & Snout */}
          <polygon points="50,56 45,63 55,63" fill="#0F172A" />
          <path
            d="M50 63 L50 71 M50 71 C46 71 42 69 40 66 M50 71 C54 71 58 69 60 66"
            stroke="#0F172A"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Lion Chin & Whiskers Dots */}
          <circle cx="44" cy="67" r="0.9" fill="#0F172A" />
          <circle cx="42" cy="69" r="0.9" fill="#0F172A" />
          <circle cx="56" cy="67" r="0.9" fill="#0F172A" />
          <circle cx="58" cy="69" r="0.9" fill="#0F172A" />
          <path d="M47 75 Q50 78 53 75" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Ornate Arabic Calligraphy Brand Name: ملوك السعادة */}
      <div className="flex flex-col text-right">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight font-['Tajawal',sans-serif] ${sizeClasses.title} ${colorStyles.title} flex items-center gap-1 leading-none`}
            style={{ letterSpacing: '-0.03em' }}
          >
            <span>ملوك السعادة</span>
            <span className="text-amber-500 font-serif text-sm">👑</span>
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`h-[2px] w-2.5 ${colorStyles.line} rounded-full`} />
            <span
              className={`font-bold ${sizeClasses.subtitle} ${colorStyles.subtitle} whitespace-nowrap tracking-wide`}
            >
              براند ملابس • جملة وقطاعي
            </span>
            <span className={`h-[2px] w-2.5 ${colorStyles.line} rounded-full`} />
          </div>
        )}
      </div>
    </div>
  );
};
