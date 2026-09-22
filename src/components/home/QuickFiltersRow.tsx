import React from 'react';
import { SlidersHorizontal, Zap, Check } from 'lucide-react';

export interface QuickFilterState {
  filtersOpen: boolean;
  nearAndFast: boolean;
  noDeliveryFees: boolean;
}

export interface QuickFiltersRowProps {
  filters: QuickFilterState;
  onToggleFilter: (key: keyof QuickFilterState) => void;
  onOpenFilterModal?: () => void;
  className?: string;
}

export const QuickFiltersRow: React.FC<QuickFiltersRowProps> = ({
  filters,
  onToggleFilter,
  onOpenFilterModal,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar px-4 py-1">
        {/* Filters Button with Slider Icon */}
        <button
          type="button"
          onClick={() => {
            if (onOpenFilterModal) {
              onOpenFilterModal();
            } else {
              onToggleFilter('filtersOpen');
            }
          }}
          className={`
            h-9 px-3.5 rounded-full flex items-center gap-2 shrink-0 cursor-pointer
            text-xs font-medium transition-all duration-200 active:scale-95
            ${
              filters.filtersOpen
                ? 'bg-[#121214] text-[#F5F5F7] border border-[#30D158]/50 shadow-[0_0_10px_rgba(48,209,88,0.15)]'
                : 'bg-[#121214] text-[#F5F5F7] border border-white/[0.12] hover:border-white/25 hover:bg-[#18181B]'
            }
          `}
        >
          <SlidersHorizontal
            className={`w-3.5 h-3.5 transition-colors ${
              filters.filtersOpen ? 'text-[#30D158]' : 'text-[#86868B]'
            }`}
          />
          <span className="whitespace-nowrap">Filters</span>
          {filters.filtersOpen && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] ml-0.5 animate-pulse" />
          )}
        </button>

        {/* Near & Fast with subtle #30D158 lightning icon */}
        <button
          type="button"
          onClick={() => onToggleFilter('nearAndFast')}
          className={`
            h-9 px-3.5 rounded-full flex items-center gap-2 shrink-0 cursor-pointer
            text-xs font-medium transition-all duration-200 active:scale-95
            ${
              filters.nearAndFast
                ? 'bg-[#121214] text-[#F5F5F7] border border-[#30D158]/60 shadow-[0_0_12px_rgba(48,209,88,0.2)]'
                : 'bg-[#121214] text-[#F5F5F7] border border-white/[0.12] hover:border-white/25 hover:bg-[#18181B]'
            }
          `}
        >
          <Zap
            className={`w-3.5 h-3.5 transition-colors ${
              filters.nearAndFast
                ? 'text-[#30D158] fill-[#30D158]/30'
                : 'text-[#30D158]'
            }`}
          />
          <span className="whitespace-nowrap">Near & Fast</span>
          {filters.nearAndFast && (
            <Check className="w-3 h-3 text-[#30D158] ml-0.5 stroke-[2.5]" />
          )}
        </button>

        {/* No delivery fees */}
        <button
          type="button"
          onClick={() => onToggleFilter('noDeliveryFees')}
          className={`
            h-9 px-3.5 rounded-full flex items-center gap-2 shrink-0 cursor-pointer
            text-xs font-medium transition-all duration-200 active:scale-95
            ${
              filters.noDeliveryFees
                ? 'bg-[#121214] text-[#F5F5F7] border border-[#30D158]/60 shadow-[0_0_12px_rgba(48,209,88,0.2)]'
                : 'bg-[#121214] text-[#F5F5F7] border border-white/[0.12] hover:border-white/25 hover:bg-[#18181B]'
            }
          `}
        >
          <span className="whitespace-nowrap">No delivery fees</span>
          {filters.noDeliveryFees && (
            <Check className="w-3 h-3 text-[#30D158] ml-0.5 stroke-[2.5]" />
          )}
        </button>
      </div>
    </div>
  );
};
