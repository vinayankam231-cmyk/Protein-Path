import React from 'react';
import { motion } from 'motion/react';

/**
 * BotanicalSpinner - A subtle, luxury dual-ring loading spinner
 * Minimalist and calibrated for clinical culinary precision.
 */
export const BotanicalSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Outer subtle ring */}
      <div className="absolute inset-0 rounded-full border border-[#EAF4EF]" />
      
      {/* Spinning Botanical accent arc */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 0.9,
        }}
        className="w-full h-full rounded-full border-2 border-transparent border-t-[#0E6245] border-r-[#0E6245]/40"
      />
    </div>
  );
};

/**
 * WarmPorcelainShimmer - Shimmer effect simulating light sweeping over porcelain ceramics
 */
export const WarmPorcelainShimmer: React.FC<{ className?: string; rounded?: string }> = ({
  className = 'h-4 w-full',
  rounded = 'rounded-lg',
}) => {
  return (
    <div className={`relative overflow-hidden bg-[#F5F5F0] ${rounded} ${className}`}>
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-full h-full"
      />
    </div>
  );
};

/**
 * FoodCardSkeleton - Placeholder skeleton during data fetch or kitchen filter update
 */
export const FoodCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#EBEAE5] overflow-hidden p-3.5 space-y-3 shadow-xs">
      <div className="relative h-40 w-full rounded-xl overflow-hidden bg-[#F5F5F0]">
        <WarmPorcelainShimmer className="h-full w-full" rounded="rounded-xl" />
      </div>

      <div className="space-y-2 pt-1">
        <WarmPorcelainShimmer className="h-4 w-3/4" />
        <WarmPorcelainShimmer className="h-3 w-1/2" />
      </div>

      <div className="grid grid-cols-4 gap-1.5 pt-1">
        <WarmPorcelainShimmer className="h-9" rounded="rounded-lg" />
        <WarmPorcelainShimmer className="h-9" rounded="rounded-lg" />
        <WarmPorcelainShimmer className="h-9" rounded="rounded-lg" />
        <WarmPorcelainShimmer className="h-9" rounded="rounded-lg" />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#EBEAE5]">
        <WarmPorcelainShimmer className="h-5 w-16" />
        <WarmPorcelainShimmer className="h-8 w-24" rounded="rounded-full" />
      </div>
    </div>
  );
};
