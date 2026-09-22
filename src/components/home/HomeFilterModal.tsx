import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';

export interface FilterOptions {
  minProtein: number;
  maxCalories: number;
  sortBy: 'recommended' | 'protein-desc' | 'calories-asc' | 'price-asc';
}

export interface HomeFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onChangeFilters: (newFilters: FilterOptions) => void;
  onReset: () => void;
}

export const HomeFilterModal: React.FC<HomeFilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onChangeFilters,
  onReset,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="
              relative w-full max-w-sm sm:max-w-md bg-[#121214] border border-white/10
              rounded-t-[28px] sm:rounded-[24px] p-6 text-left shadow-2xl z-10
              overflow-hidden
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#30D158]/15 border border-[#30D158]/30 flex items-center justify-center text-[#30D158]">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5F5F7]">
                    Nutrition Filters
                  </h3>
                  <p className="text-xs text-[#86868B]">
                    Calibrate dishes to your target macros
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#86868B] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Controls */}
            <div className="py-5 space-y-5">
              {/* Sort By */}
              <div>
                <label className="block text-xs font-semibold text-[#86868B] mb-2 uppercase tracking-wider">
                  Sort Order
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'recommended', label: 'Curated First' },
                    { id: 'protein-desc', label: 'Highest Protein' },
                    { id: 'calories-asc', label: 'Lowest Calorie' },
                    { id: 'price-asc', label: 'Price: Low to High' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        onChangeFilters({
                          ...filters,
                          sortBy: option.id as FilterOptions['sortBy'],
                        })
                      }
                      className={`
                        h-9 px-3 rounded-xl text-xs font-medium text-left flex items-center justify-between
                        transition-all cursor-pointer border
                        ${
                          filters.sortBy === option.id
                            ? 'bg-[#18181B] text-white border-[#30D158]/60 shadow-[0_0_10px_rgba(48,209,88,0.15)]'
                            : 'bg-[#161617] text-[#86868B] border-white/6 hover:border-white/15 hover:text-[#F5F5F7]'
                        }
                      `}
                    >
                      <span className="truncate">{option.label}</span>
                      {filters.sortBy === option.id && (
                        <Check className="w-3.5 h-3.5 text-[#30D158] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimum Protein Target */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">
                    Minimum Protein
                  </label>
                  <span className="text-xs font-mono font-bold text-[#30D158]">
                    {filters.minProtein > 0 ? `${filters.minProtein}g+` : 'Any'}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[0, 40, 50, 60].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() =>
                        onChangeFilters({ ...filters, minProtein: val })
                      }
                      className={`
                        flex-1 h-9 rounded-xl text-xs font-medium transition-all cursor-pointer border
                        ${
                          filters.minProtein === val
                            ? 'bg-[#18181B] text-white border-[#30D158]/60'
                            : 'bg-[#161617] text-[#86868B] border-white/6 hover:text-white'
                        }
                      `}
                    >
                      {val === 0 ? 'Any' : `${val}g`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Maximum Calories */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">
                    Maximum Calories
                  </label>
                  <span className="text-xs font-mono font-bold text-[#30D158]">
                    {filters.maxCalories < 1000
                      ? `< ${filters.maxCalories} kcal`
                      : 'Any'}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1000, 650, 550, 480].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() =>
                        onChangeFilters({ ...filters, maxCalories: val })
                      }
                      className={`
                        flex-1 h-9 rounded-xl text-xs font-medium transition-all cursor-pointer border
                        ${
                          filters.maxCalories === val
                            ? 'bg-[#18181B] text-white border-[#30D158]/60'
                            : 'bg-[#161617] text-[#86868B] border-white/6 hover:text-white'
                        }
                      `}
                    >
                      {val === 1000 ? 'Any' : `<${val}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onReset}
                className="h-11 px-4 rounded-full bg-[#161617] border border-white/10 text-[#86868B] hover:text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-full bg-[#30D158] hover:bg-[#28B84D] text-black font-bold text-xs flex items-center justify-center transition-all cursor-pointer shadow-[0_0_16px_rgba(48,209,88,0.2)]"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
