import React from 'react';
import { FoodItem } from '../../types';
import { Star, Plus, Minus, Heart } from 'lucide-react';

export interface FoodCardProps {
  item: FoodItem;
  quantity?: number;
  onIncrement?: (item: FoodItem) => void;
  onDecrement?: (item: FoodItem) => void;
  onClickDetail?: (item: FoodItem) => void;
  variant?: 'vertical' | 'horizontal';
  className?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (item: FoodItem) => void;
}

const getSourceLabel = (src?: string) => {
  if (!src) return '';
  switch (src) {
    case 'wild-seafood':
      return 'Wild Seafood';
    case 'poultry':
      return 'Free-Range Poultry';
    case 'artisanal-dairy':
      return 'Artisanal Dairy';
    case 'pasture-eggs':
      return 'Pasture Eggs';
    case 'plant-power':
      return 'Plant Power';
    case 'lean-red':
      return 'Lean Red';
    default:
      return src.replace('-', ' ');
  }
};

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  quantity = 0,
  onIncrement,
  onDecrement,
  onClickDetail,
  variant = 'vertical',
  className = '',
  isFavorite = false,
  onToggleFavorite,
}) => {
  const nutritionLine = `${item.macros.calories} kcal · ${item.macros.protein}g protein`;

  // Horizontal Card Variant (used in lists, search, recommendations)
  if (variant === 'horizontal') {
    return (
      <div
        className={`
          group relative flex bg-white dark:bg-[#161618] rounded-2xl border border-[#EBEAE5] dark:border-white/8
          hover:border-[#D5D3CB] dark:hover:border-white/16 transition-all duration-200 overflow-hidden p-3 gap-3.5
          shadow-[0_2px_12px_rgba(0,0,0,0.02)]
          ${className}
        `}
      >
        {/* Large Food Image */}
        <div
          onClick={() => onClickDetail?.(item)}
          className="relative w-28 sm:w-32 h-28 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 cursor-pointer"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {item.proteinSource && (
            <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-semibold text-[#F5F5F7] tracking-tight border border-white/10 z-10 select-none">
              {getSourceLabel(item.proteinSource)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
          <div>
            {/* Restaurant & Rating */}
            <div className="flex items-center justify-between text-xs text-[#8C8E8B] dark:text-[#86868B] mb-1">
              <span className="truncate font-medium">{item.restaurantName}</span>
              <div className="flex items-center gap-1 shrink-0 ml-1.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-[#121312] dark:text-[#F5F5F7] text-[11px]">
                  4.9
                </span>
              </div>
            </div>

            {/* Food Name */}
            <h3
              onClick={() => onClickDetail?.(item)}
              className="text-sm sm:text-base font-semibold text-[#121312] dark:text-[#F5F5F7] hover:text-[#0E6245] dark:hover:text-[#30D158] transition-colors leading-snug cursor-pointer line-clamp-1"
            >
              {item.name}
            </h3>

            {/* Compact Nutrition Line */}
            <p
              onClick={() => onClickDetail?.(item)}
              className="text-xs text-[#5E605D] dark:text-[#86868B] mt-1 cursor-pointer font-medium"
            >
              {nutritionLine}
            </p>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F5F5F0] dark:border-white/6">
            <span className="text-sm font-semibold text-[#121312] dark:text-[#F5F5F7]">
              ₹{item.price.toFixed(0)}
            </span>

            {quantity === 0 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIncrement?.(item);
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#121312] dark:bg-white text-white dark:text-black hover:bg-[#0E6245] dark:hover:bg-[#30D158] dark:hover:text-black transition-all cursor-pointer shadow-2xs"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-[#F5F5F0] dark:bg-white/10 rounded-full px-2 py-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDecrement?.(item);
                  }}
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-white/20 text-[#121312] dark:text-white transition-colors cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-semibold tabular-nums text-[#121312] dark:text-white min-w-3 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onIncrement?.(item);
                  }}
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-white/20 text-[#121312] dark:text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard Vertical Luxury Card
  return (
    <div
      className={`
        group relative flex flex-col bg-white dark:bg-[#161618] rounded-2xl border border-[#EBEAE5] dark:border-white/8
        hover:border-[#D5D3CB] dark:hover:border-white/16 transition-all duration-300 overflow-hidden
        shadow-[0_2px_14px_rgba(0,0,0,0.02)]
        ${className}
      `}
    >
      {/* Large Food Image */}
      <div
        onClick={() => onClickDetail?.(item)}
        className="relative w-full aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-900 cursor-pointer"
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
          loading="lazy"
        />

        {/* Source Badge (Discrete Luxury) */}
        {item.proteinSource && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-[#F5F5F7] tracking-tight flex items-center gap-1.5 z-10 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
            <span>{getSourceLabel(item.proteinSource)}</span>
          </div>
        )}

        {/* Favorite Button (Discrete Luxury) */}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer z-10"
            aria-label="Add to favourites"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>
        )}
      </div>

      {/* Card Body with Restrained Hierarchy */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Restaurant & Rating Row */}
          <div className="flex items-center justify-between text-xs text-[#8C8E8B] dark:text-[#86868B] mb-1">
            <span className="truncate font-medium">{item.restaurantName}</span>
            <div className="flex items-center gap-1 shrink-0 ml-1.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-[#121312] dark:text-[#F5F5F7] text-[11px]">
                4.9
              </span>
            </div>
          </div>

          {/* Food Name */}
          <h3
            onClick={() => onClickDetail?.(item)}
            className="text-[15px] font-semibold text-[#121312] dark:text-[#F5F5F7] group-hover:text-[#0E6245] dark:group-hover:text-[#30D158] transition-colors leading-snug cursor-pointer line-clamp-1"
          >
            {item.name}
          </h3>

          {/* Compact Nutrition Line: “520 kcal · 42g protein” */}
          <p
            onClick={() => onClickDetail?.(item)}
            className="text-xs text-[#5E605D] dark:text-[#86868B] mt-1 font-medium cursor-pointer"
          >
            {nutritionLine}
          </p>
        </div>

        {/* Bottom Price & Add CTA */}
        <div className="mt-3.5 pt-3 border-t border-[#F5F5F0] dark:border-white/6 flex items-center justify-between">
          <span className="text-base font-semibold text-[#121312] dark:text-[#F5F5F7]">
            ₹{item.price.toFixed(0)}
          </span>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIncrement?.(item);
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#121312] dark:bg-white text-white dark:text-black hover:bg-[#0E6245] dark:hover:bg-[#30D158] dark:hover:text-black transition-all cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-[#F5F5F0] dark:bg-white/10 rounded-full px-2.5 py-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDecrement?.(item);
                }}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-white/20 text-[#121312] dark:text-white transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-semibold tabular-nums text-[#121312] dark:text-white min-w-3 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIncrement?.(item);
                }}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-white/20 text-[#121312] dark:text-white transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
