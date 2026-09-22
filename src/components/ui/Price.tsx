import React from 'react';

export interface PriceProps {
  amount: number;
  originalAmount?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  unit?: string; // e.g. "per bowl", "portion"
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  originalAmount,
  currency = '$',
  size = 'md',
  unit,
  className = '',
}) => {
  const formattedAmount = amount.toFixed(2);
  const formattedOriginal = originalAmount ? originalAmount.toFixed(2) : null;

  const sizeClasses = {
    sm: {
      currency: 'text-xs',
      integer: 'text-sm font-semibold',
      decimal: 'text-xs font-semibold',
      original: 'text-xs',
      unit: 'text-[11px]',
    },
    md: {
      currency: 'text-xs font-semibold',
      integer: 'text-base font-bold',
      decimal: 'text-xs font-semibold',
      original: 'text-xs',
      unit: 'text-xs',
    },
    lg: {
      currency: 'text-sm font-semibold',
      integer: 'text-xl font-bold',
      decimal: 'text-sm font-semibold',
      original: 'text-sm',
      unit: 'text-xs',
    },
    xl: {
      currency: 'text-base font-semibold',
      integer: 'text-2xl font-bold',
      decimal: 'text-base font-semibold',
      original: 'text-sm',
      unit: 'text-xs',
    },
  };

  const currentSize = sizeClasses[size];
  const [intPart, decPart] = formattedAmount.split('.');

  return (
    <div className={`inline-flex items-baseline gap-1.5 tabular-nums ${className}`}>
      <div className="inline-flex items-baseline text-[#121312] tracking-tight">
        <span className={`text-[#121312] mr-0.5 select-none ${currentSize.currency}`}>
          {currency}
        </span>
        <span className={currentSize.integer}>{intPart}</span>
        <span className={currentSize.decimal}>.{decPart}</span>
      </div>

      {formattedOriginal && (
        <span
          className={`line-through text-[#8C8E8B] select-none font-normal ${currentSize.original}`}
        >
          {currency}{formattedOriginal}
        </span>
      )}

      {unit && (
        <span className={`text-[#5E605D] font-normal ${currentSize.unit}`}>
          /{unit}
        </span>
      )}
    </div>
  );
};
