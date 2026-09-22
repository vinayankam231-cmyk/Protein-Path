import React from 'react';
import { Star } from 'lucide-react';

export interface RatingBadgeProps {
  score: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  variant?: 'minimal' | 'solid' | 'outline';
  className?: string;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  score,
  reviewCount,
  size = 'md',
  variant = 'minimal',
  className = '',
}) => {
  const formattedScore = score.toFixed(1);

  const sizeClasses = {
    sm: {
      container: 'text-xs gap-1 py-0.5 px-1.5',
      star: 'w-3 h-3',
      text: 'text-xs font-semibold',
      count: 'text-[10px]',
    },
    md: {
      container: 'text-xs gap-1.5 py-1 px-2.5',
      star: 'w-3.5 h-3.5',
      text: 'text-xs font-bold',
      count: 'text-[11px]',
    },
  };

  const variantClasses = {
    minimal: 'bg-transparent text-[#121312]',
    solid: 'bg-[#F5F5F0] text-[#121312] border border-[#EBEAE5]',
    outline: 'bg-white text-[#121312] border border-[#EBEAE5] shadow-[0_1px_2px_rgba(0,0,0,0.02)]',
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={`
        inline-flex items-center rounded-full select-none tabular-nums
        ${currentSize.container}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <Star
        className={`${currentSize.star} fill-amber-500 text-amber-500 shrink-0`}
      />
      <span className={currentSize.text}>{formattedScore}</span>
      {reviewCount !== undefined && (
        <span className={`text-[#8C8E8B] font-normal ${currentSize.count}`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
