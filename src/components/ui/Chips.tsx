import React from 'react';
import {
  Sparkles,
  Flame,
  Fish,
  Beef,
  Drumstick,
  Leaf,
  Zap,
  Check,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';

// Icon resolver for category icons
const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Flame,
  Fish,
  Beef,
  Drumstick,
  Leaf,
  Zap,
};

export interface CategoryChipProps {
  id: string;
  label: string;
  iconName?: string;
  targetProtein?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  iconName,
  targetProtein,
  selected = false,
  onClick,
  className = '',
}) => {
  const Icon = iconName ? iconMap[iconName] || Sparkles : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 py-2 px-3.5 rounded-full text-xs font-medium cursor-pointer
        transition-all duration-200 select-none whitespace-nowrap outline-none
        ${
          selected
            ? 'bg-[#0E6245] text-white shadow-[0_2px_8px_-2px_rgba(14,98,69,0.35)]'
            : 'bg-white text-[#121312] border border-[#EBEAE5] hover:bg-[#F5F5F0] hover:border-[#DCD9D0]'
        }
        ${className}
      `}
    >
      {Icon && (
        <Icon
          className={`w-3.5 h-3.5 shrink-0 ${
            selected ? 'text-emerald-200' : 'text-[#5E605D]'
          }`}
        />
      )}
      <span className="font-semibold">{label}</span>
      {targetProtein && (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono tabular-nums ${
            selected
              ? 'bg-[#0A4732] text-emerald-200'
              : 'bg-[#F5F5F0] text-[#5E605D]'
          }`}
        >
          {targetProtein}
        </span>
      )}
    </button>
  );
};

export interface FilterChipProps {
  id?: string;
  label: string;
  active?: boolean;
  selected?: boolean;
  count?: number;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active = false,
  selected = false,
  count,
  onClick,
  icon,
  className = '',
}) => {
  const isSelected = active || selected;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium cursor-pointer
        transition-all duration-150 select-none whitespace-nowrap outline-none
        ${
          isSelected
            ? 'bg-[#EAF4EF] text-[#0E6245] border border-[#0E6245]/40 font-semibold'
            : 'bg-white text-[#5E605D] border border-[#EBEAE5] hover:text-[#121312] hover:border-[#DCD9D0]'
        }
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {isSelected && !icon && (
        <Check className="w-3 h-3 text-[#0E6245] shrink-0" />
      )}
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`text-[10px] w-4 h-4 rounded-full inline-flex items-center justify-center tabular-nums ${
            isSelected ? 'bg-[#0E6245] text-white' : 'bg-[#EBEAE5] text-[#5E605D]'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};
