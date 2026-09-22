import React from 'react';
import { Restaurant } from '../../types';
import { Star, Clock } from 'lucide-react';

export interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
  className?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        group relative flex flex-col bg-white dark:bg-[#161618] rounded-2xl border border-[#EBEAE5] dark:border-white/8
        hover:border-[#D5D3CB] dark:hover:border-white/16 transition-all duration-300 overflow-hidden cursor-pointer select-none
        shadow-[0_2px_14px_rgba(0,0,0,0.02)]
        ${className}
      `}
    >
      {/* Large Imagery */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-stone-100 dark:bg-stone-900">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-600 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* Minimal Delivery Time Pill */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-medium flex items-center gap-1 shadow-xs">
          <Clock className="w-3 h-3 text-white/80" />
          <span>{restaurant.deliveryTimeRange}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-3.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-base font-semibold text-[#121312] dark:text-[#F5F5F7] group-hover:text-[#0E6245] dark:group-hover:text-[#30D158] transition-colors truncate">
            {restaurant.name}
          </h3>

          {/* Minimal Rating */}
          <div className="flex items-center gap-1 shrink-0 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-[#121312] dark:text-[#F5F5F7]">
              {restaurant.rating.toFixed(1)}
            </span>
            <span className="text-[#8C8E8B] dark:text-[#86868B]">
              ({restaurant.reviewCount})
            </span>
          </div>
        </div>

        {/* Cuisine & Delivery Note */}
        <div className="flex items-center justify-between text-xs text-[#5E605D] dark:text-[#86868B] mt-1">
          <span className="truncate">{restaurant.cuisine}</span>
          <span className="shrink-0 text-[11px] text-[#8C8E8B]">
            {restaurant.deliveryFee === 0 ? 'Free delivery' : `₹${restaurant.deliveryFee.toFixed(0)} delivery`}
          </span>
        </div>
      </div>
    </div>
  );
};
