import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'gold';
  customLogoUrl?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
  customLogoUrl,
  showSubtitle = true,
}) => {
  if (customLogoUrl) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <img
          src={customLogoUrl}
          alt="ملوك السعاده"
          className={`object-contain ${
            size === 'sm'
              ? 'h-10'
              : size === 'md'
              ? 'h-14'
              : size === 'lg'
              ? 'h-20'
              : 'h-28'
          }`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  const sizeClasses = {
    sm: { icon: 'w-7 h-7', title: 'text-lg', subtitle: 'text-[9px]' },
    md: { icon: 'w-10 h-10', title: 'text-2xl', subtitle: 'text-[11px]' },
    lg: { icon: 'w-16 h-16', title: 'text-3xl', subtitle: 'text-xs' },
    xl: { icon: 'w-24 h-24', title: 'text-4xl', subtitle: 'text-sm' },
  }[size];

  const colorStyles = {
    light: {
      crown: '#FFFFFF',
      gold: '#F59E0B',
      title: 'text-white',
      subtitle: 'text-neutral-300',
      line: 'bg-neutral-600',
    },
    dark: {
      crown: '#111827',
      gold: '#D97706',
      title: 'text-neutral-900',
      subtitle: 'text-neutral-600',
      line: 'bg-neutral-300',
    },
    gold: {
      crown: '#FBBF24',
      gold: '#F59E0B',
      title: 'text-amber-400',
      subtitle: 'text-amber-200/90',
      line: 'bg-amber-500/50',
    },
  }[variant];

  return (
    <div className={`flex flex-col items-center select-none text-center ${className}`}>
      {/* Crown SVG based faithfully on the user's logo */}
      <div className={`relative ${sizeClasses.icon} mb-1 flex items-center justify-center`}>
        <svg
          viewBox="0 0 200 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)]"
        >
          {/* Main Crown base sweeping arches */}
          <path
            d="M20 70 C 50 110, 150 110, 180 70 C 150 95, 50 95, 20 70 Z"
            fill="currentColor"
            className="text-white"
          />
          <path
            d="M30 85 C 60 115, 140 115, 170 85 C 145 102, 55 102, 30 85 Z"
            fill="currentColor"
            className="text-amber-400"
          />
          
          {/* Center Royal Spire with droplet */}
          <path
            d="M100 20 C 100 20, 88 55, 88 70 C 88 80, 112 80, 112 70 C 112 55, 100 20, 100 20 Z"
            fill="currentColor"
            className="text-white"
          />
          <circle cx="100" cy="18" r="8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
          
          {/* Inner Left Peak */}
          <path
            d="M70 28 C 70 28, 60 55, 60 70 C 60 78, 80 78, 80 70 C 80 55, 70 28, 70 28 Z"
            fill="currentColor"
            className="text-white"
          />
          <circle cx="70" cy="25" r="6.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Inner Right Peak */}
          <path
            d="M130 28 C 130 28, 120 55, 120 70 C 120 78, 140 78, 140 70 C 140 55, 130 28, 130 28 Z"
            fill="currentColor"
            className="text-white"
          />
          <circle cx="130" cy="25" r="6.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Outer Left Sweeping Horn */}
          <path
            d="M35 38 C 45 55, 50 68, 50 78 C 38 78, 30 65, 20 50 C 25 45, 30 40, 35 38 Z"
            fill="currentColor"
            className="text-white"
          />
          <circle cx="28" cy="38" r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Outer Right Sweeping Horn */}
          <path
            d="M165 38 C 155 55, 150 68, 150 78 C 162 78, 170 65, 180 50 C 175 45, 170 40, 165 38 Z"
            fill="currentColor"
            className="text-white"
          />
          <circle cx="172" cy="38" r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Decorative jewels inside base */}
          <circle cx="75" cy="85" r="3" fill="#F59E0B" />
          <circle cx="100" cy="88" r="3.5" fill="#FBBF24" />
          <circle cx="125" cy="85" r="3" fill="#F59E0B" />
        </svg>
      </div>

      {/* Brand Title: ملوك السعاده */}
      <div className="flex flex-col items-center">
        <span
          className={`font-black tracking-tight font-['Tajawal',sans-serif] ${sizeClasses.title} ${colorStyles.title}`}
          style={{ letterSpacing: '-0.02em' }}
        >
          ملوك السعاده
        </span>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`h-[1px] w-3 ${colorStyles.line}`} />
            <span
              className={`font-semibold ${sizeClasses.subtitle} ${colorStyles.subtitle} whitespace-nowrap`}
            >
              براند ملابس للجمله والقطاعي
            </span>
            <span className={`h-[1px] w-3 ${colorStyles.line}`} />
          </div>
        )}
      </div>
    </div>
  );
};
