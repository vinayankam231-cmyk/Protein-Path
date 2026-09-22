import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export interface QuantitySelectorProps {
  quantity: number;
  onIncrement: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDecrement: (e: React.MouseEvent<HTMLButtonElement>) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  allowDelete?: boolean;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  min = 0,
  max = 99,
  size = 'md',
  allowDelete = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: {
      container: 'h-7 px-1 rounded-full gap-1 text-xs',
      btn: 'w-5 h-5 rounded-full',
      icon: 'w-3 h-3',
      num: 'w-5 text-xs',
    },
    md: {
      container: 'h-9 px-1.5 rounded-full gap-1.5 text-sm',
      btn: 'w-6 h-6 rounded-full',
      icon: 'w-3.5 h-3.5',
      num: 'w-6 text-sm',
    },
    lg: {
      container: 'h-11 px-2 rounded-full gap-2 text-base',
      btn: 'w-7 h-7 rounded-full',
      icon: 'w-4 h-4',
      num: 'w-8 text-base',
    },
  };

  const current = sizeClasses[size];

  // If quantity is 0, show minimal clean "Add" pill
  if (quantity === 0) {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        onClick={(e) => onIncrement(e)}
        className={`
          inline-flex items-center justify-center gap-1.5 bg-[#0E6245] text-white
          hover:bg-[#094F37] transition-colors select-none font-semibold cursor-pointer
          shadow-[0_2px_6px_-1px_rgba(14,98,69,0.3)]
          ${size === 'sm' ? 'h-7 px-3 text-xs rounded-full' : 'h-9 px-4 text-xs sm:text-sm rounded-full'}
          ${className}
        `}
      >
        <Plus className={current.icon} />
        <span>Add</span>
      </motion.button>
    );
  }

  const isMin = quantity <= min;
  const isMax = quantity >= max;
  const showTrash = allowDelete && quantity === 1;

  return (
    <div
      className={`
        inline-flex items-center bg-[#F5F5F0] border border-[#EBEAE5] shadow-[0_1px_2px_rgba(0,0,0,0.02)]
        ${current.container}
        ${className}
      `}
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        onClick={(e) => onDecrement(e)}
        disabled={isMin}
        aria-label="Decrease quantity"
        className={`
          inline-flex items-center justify-center text-[#121312] bg-white border border-[#EBEAE5]
          hover:bg-[#EAEAE5] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed
          ${current.btn}
        `}
      >
        {showTrash ? (
          <Trash2 className={`${current.icon} text-rose-600`} />
        ) : (
          <Minus className={current.icon} />
        )}
      </motion.button>

      <span
        className={`font-semibold tabular-nums text-center text-[#121312] select-none ${current.num}`}
      >
        {quantity}
      </span>

      <motion.button
        type="button"
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        onClick={(e) => onIncrement(e)}
        disabled={isMax}
        aria-label="Increase quantity"
        className={`
          inline-flex items-center justify-center text-white bg-[#0E6245]
          hover:bg-[#094F37] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed
          ${current.btn}
        `}
      >
        <Plus className={current.icon} />
      </motion.button>
    </div>
  );
};

