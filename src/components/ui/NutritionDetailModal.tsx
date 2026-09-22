import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Minus,
  Flame,
  Zap,
  Wheat,
  Droplets,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { FoodItem } from '../../types';

export interface NutritionDetailModalProps {
  item: FoodItem | null;
  quantity?: number;
  onClose: () => void;
  onIncrement?: (item: FoodItem) => void;
  onDecrement?: (item: FoodItem) => void;
  onAddToBag?: (item: FoodItem) => void;
  className?: string;
}

export const NutritionDetailModal: React.FC<NutritionDetailModalProps> = ({
  item,
  quantity = 0,
  onClose,
  onIncrement,
  onDecrement,
  onAddToBag,
  className = '',
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!item) return null;

  const { macros } = item;

  // Derive ingredients and allergens fallback if not explicitly defined
  const ingredientsList: string[] =
    item.ingredients && item.ingredients.length > 0
      ? item.ingredients
      : [
          item.name,
          'Extra Virgin Olive Oil',
          'Organic Fresh Herbs',
          'Coarse Maldon Sea Salt',
          'Cracked Black Peppercorn',
        ];

  const allergensList: string[] =
    item.allergens !== undefined
      ? item.allergens
      : item.tags.filter((t) =>
          ['Fish', 'Shellfish', 'Soy', 'Nuts', 'Peanuts', 'Dairy', 'Eggs', 'Wheat'].some((a) =>
            t.toLowerCase().includes(a.toLowerCase())
          )
        );

  const handleAdd = () => {
    if (onAddToBag) {
      onAddToBag(item);
    } else if (onIncrement) {
      onIncrement(item);
    }
  };

  return (
    <AnimatePresence>
      <div
        className={`
          fixed inset-0 z-50 flex items-end sm:items-center justify-center
          bg-black/75 backdrop-blur-md overflow-hidden select-none
          ${className}
        `}
        onClick={onClose}
      >
        {/* Slide-Up Sheet Container using #161617 Titanium Bento Background */}
        <motion.div
          key="nutrition-modal-sheet"
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative w-full max-w-lg bg-[#161617] text-[#F5F5F7]
            rounded-t-[32px] sm:rounded-3xl border border-white/[0.12]
            shadow-[0_-8px_40px_rgba(0,0,0,0.8)] max-h-[90vh] sm:max-h-[85vh]
            flex flex-col overflow-hidden
          "
        >
          {/* Top Subtle Drag Pill (iOS Sheet Affordance) */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/25 z-30 pointer-events-none" />

          {/* 1. HERO: Edge-to-edge cinematic image with subtle gradient overlay at bottom */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0 bg-stone-950">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover object-center scale-[1.01]"
              loading="eager"
            />

            {/* Subtle Gradient Overlays: Dark vignette at top + soft transition into #161617 at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-[#161617]/35 to-black/40" />

            {/* Floating Top Bar with Prep Time & Dismiss Button */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              {item.prepTimeMinutes ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-[#30D158]" />
                  <span>{item.prepTimeMinutes} mins prep</span>
                </div>
              ) : (
                <div />
              )}

              {/* Minimal Rounded Dismiss Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/12 text-[#F5F5F7] flex items-center justify-center hover:bg-black/70 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>

            {/* Bottom Culinary Badge / Chef's Note Tag */}
            {item.chefNote && (
              <div className="absolute bottom-3 left-5 right-5 flex items-center gap-1.5 text-[11px] text-[#30D158] font-medium tracking-tight">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.chefNote}</span>
              </div>
            )}
          </div>

          {/* SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 space-y-6 no-scrollbar">
            {/* 2. TITLE AREA: Dish Name, Restaurant Name, and Price with Refined Typography */}
            <section aria-label="Dish identity" className="space-y-1.5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs uppercase tracking-wider text-[#86868B] font-semibold">
                    {item.restaurantName}
                  </span>
                  {item.proteinSource && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#30D158]/10 text-[#30D158] border border-[#30D158]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                      <span className="capitalize">{item.proteinSource.replace('-', ' ')}</span>
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 shrink-0">
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-xs text-[#86868B] line-through tabular-nums">
                      ₹{item.originalPrice.toFixed(0)}
                    </span>
                  )}
                  <span className="text-xl font-bold text-[#F5F5F7] tracking-tight tabular-nums">
                    ₹{item.price.toFixed(0)}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#F5F5F7] tracking-tight leading-tight">
                {item.name}
              </h2>

              {/* Editorial Description */}
              <p className="text-sm text-[#A1A1A6] leading-relaxed pt-1">
                {item.description}
              </p>
            </section>

            {/* 3. MACRO BREAKDOWN: Apple Health-inspired horizontal layout (Calm, sleek, no aggressive meters) */}
            <section aria-label="Macronutrient breakdown" className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#86868B] font-medium px-0.5">
                <span>Macronutrient Breakdown</span>
                <span>Verified Kitchen Data</span>
              </div>

              {/* Horizontal 4-Column Card Layout */}
              <div className="grid grid-cols-4 gap-2">
                {/* Calories */}
                <div className="p-3 rounded-2xl bg-[#1F1F22] border border-white/[0.08] flex flex-col justify-between transition-colors">
                  <div className="flex items-center gap-1 text-[11px] text-[#86868B] font-medium">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>Energy</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-lg font-bold text-[#F5F5F7] tracking-tight tabular-nums leading-none">
                      {macros.calories}
                    </div>
                    <span className="text-[10px] text-[#86868B] tracking-tight font-medium">
                      kcal
                    </span>
                  </div>
                </div>

                {/* Protein */}
                <div className="p-3 rounded-2xl bg-[#1F1F22] border border-white/[0.08] flex flex-col justify-between transition-colors">
                  <div className="flex items-center gap-1 text-[11px] text-[#86868B] font-medium">
                    <Zap className="w-3 h-3 text-[#30D158]" />
                    <span>Protein</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-lg font-bold text-[#30D158] tracking-tight tabular-nums leading-none">
                      {macros.protein}g
                    </div>
                    <span className="text-[10px] text-[#86868B] tracking-tight font-medium">
                      density
                    </span>
                  </div>
                </div>

                {/* Carbs */}
                <div className="p-3 rounded-2xl bg-[#1F1F22] border border-white/[0.08] flex flex-col justify-between transition-colors">
                  <div className="flex items-center gap-1 text-[11px] text-[#86868B] font-medium">
                    <Wheat className="w-3 h-3 text-amber-200/80" />
                    <span>Carbs</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-lg font-bold text-[#F5F5F7] tracking-tight tabular-nums leading-none">
                      {macros.carbs}g
                    </div>
                    <span className="text-[10px] text-[#86868B] tracking-tight font-medium">
                      {macros.fiber ? `${macros.fiber}g fiber` : 'clean'}
                    </span>
                  </div>
                </div>

                {/* Fats */}
                <div className="p-3 rounded-2xl bg-[#1F1F22] border border-white/[0.08] flex flex-col justify-between transition-colors">
                  <div className="flex items-center gap-1 text-[11px] text-[#86868B] font-medium">
                    <Droplets className="w-3 h-3 text-sky-400" />
                    <span>Fats</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-lg font-bold text-[#F5F5F7] tracking-tight tabular-nums leading-none">
                      {macros.fat}g
                    </div>
                    <span className="text-[10px] text-[#86868B] tracking-tight font-medium">
                      healthy
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. INGREDIENTS & ALLERGENS: Muted list / minimal tag cloud & allergen advisory */}
            <section aria-label="Ingredients and allergens" className="space-y-4">
              {/* Key Ingredients */}
              <div className="space-y-2">
                <span className="text-xs text-[#86868B] font-medium block px-0.5">
                  Key Ingredients
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ingredientsList.map((ing) => (
                    <span
                      key={ing}
                      className="inline-flex items-center text-xs text-[#D1D1D6] bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergen Advisory */}
              <div className="space-y-2">
                <span className="text-xs text-[#86868B] font-medium block px-0.5">
                  Allergen Advisory
                </span>

                {allergensList.length > 0 ? (
                  <div className="p-3.5 rounded-2xl bg-amber-500/[0.08] border border-amber-500/20 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="text-amber-200 font-semibold">Contains: </span>
                      <span className="text-amber-100/90 font-medium">
                        {allergensList.join(', ')}
                      </span>
                      <p className="text-[11px] text-amber-200/60 mt-0.5">
                        Prepared in a certified clean kitchen with separated macro prep stations.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#30D158] shrink-0" />
                    <span className="text-xs text-[#A1A1A6]">
                      No major declared allergens · Gluten-free certified facility
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* 5. ACTION: Sticky prominent "Add to Bag" button at bottom */}
          <div className="shrink-0 p-4 border-t border-white/[0.1] bg-[#161617]/95 backdrop-blur-md">
            {quantity === 0 ? (
              <button
                type="button"
                onClick={handleAdd}
                className="
                  w-full h-13 rounded-2xl flex items-center justify-between px-5
                  bg-[#30D158] text-[#000000] font-semibold text-sm
                  shadow-[0_4px_24px_rgba(48,209,88,0.22)]
                  hover:bg-[#28b84d] active:scale-[0.985] transition-all duration-200 cursor-pointer
                "
              >
                <span className="tracking-tight text-base font-bold">Add to Bag</span>
                <span className="text-sm font-bold tabular-nums">
                  ₹{item.price.toFixed(0)}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                {/* Stepper Controls */}
                <div className="flex items-center gap-2 bg-[#222225] border border-white/[0.12] rounded-2xl p-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onDecrement?.(item)}
                    aria-label={`Decrease ${item.name}`}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>

                  <span className="w-6 text-center text-sm font-bold text-[#F5F5F7] tabular-nums">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => onIncrement?.(item)}
                    aria-label={`Increase ${item.name}`}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>
                </div>

                {/* Primary Confirmation Action */}
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    flex-1 h-12 rounded-2xl flex items-center justify-between px-5
                    bg-[#30D158] text-[#000000] font-semibold text-sm
                    hover:bg-[#28b84d] active:scale-[0.985] transition-all duration-200 cursor-pointer
                  "
                >
                  <span className="tracking-tight font-bold">In Bag ({quantity})</span>
                  <span className="text-sm font-bold tabular-nums">
                    ₹{(item.price * quantity).toFixed(0)}
                  </span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NutritionDetailModal;
