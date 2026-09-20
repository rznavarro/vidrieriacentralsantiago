import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'w-8 h-8',
  showText = true,
  textColor = 'text-[#06192f]',
}) => {
  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <svg
        className={className}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* House Outline */}
        <path
          d="M32 6L8 25V56C8 57.1046 8.89543 58 10 58H54C55.1046 58 56 57.1046 56 56V25L32 6Z"
          stroke="#0E8C80"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* 4-Pane Window Frame */}
        <rect
          x="20"
          y="27"
          width="24"
          height="24"
          rx="2"
          stroke="#0E8C80"
          strokeWidth="3"
          fill="rgba(14, 140, 128, 0.14)"
        />
        
        {/* Internal Crossbars (4 panes) */}
        <line
          x1="32"
          y1="27"
          x2="32"
          y2="51"
          stroke="#0E8C80"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="39"
          x2="44"
          y2="39"
          stroke="#0E8C80"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Subtle glass gleam */}
        <path d="M22 29L26 29L23 37L21 37Z" fill="white" fillOpacity="0.75" />
        <path d="M34 29L38 29L35 37L33 37Z" fill="white" fillOpacity="0.75" />
      </svg>
      {showText && (
        <span
          className={`text-[17px] sm:text-[18px] font-medium tracking-tight whitespace-nowrap ${textColor}`}
        >
          Vidriería Central Santiago
        </span>
      )}
    </div>
  );
};
