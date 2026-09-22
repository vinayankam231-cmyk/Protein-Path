import React from 'react';
import { Flame, Dna, Wheat, Droplets, Leaf } from 'lucide-react';
import { MacroNutrients } from '../../types';

export interface NutritionBadgeProps {
  type: 'calories' | 'protein' | 'carbs' | 'fat' | 'fiber';
  value: number;
  size?: 'sm' | 'md' | 'lg';
  highlight?: boolean;
  showIcon?: boolean;
  className?: string;
}

export const NutritionBadge: React.FC<NutritionBadgeProps> = ({
  type,
  value,
  size = 'md',
  highlight = false,
  showIcon = true,
  className = '',
}) => {
  const configs = {
    calories: {
      label: 'Calories',
      shortLabel: 'Cal',
      unit: 'kcal',
      icon: Flame,
      baseColor: 'text-[#121312]',
      bgColor: 'bg-white',
      borderColor: 'border-[#EBEAE5]',
      accentBg: 'bg-amber-50/70 text-amber-900 border-amber-200/60',
    },
    protein: {
      label: 'Protein',
      shortLabel: 'Protein',
      unit: 'g',
      icon: Dna,
      baseColor: 'text-[#0E6245]',
      bgColor: 'bg-[#EAF4EF]',
      borderColor: 'border-[#D5E8DE]',
      accentBg: 'bg-[#0E6245] text-white border-transparent',
    },
    carbs: {
      label: 'Carbs',
      shortLabel: 'Carb',
      unit: 'g',
      icon: Wheat,
      baseColor: 'text-[#5E605D]',
      bgColor: 'bg-[#FBFBF9]',
      borderColor: 'border-[#EBEAE5]',
      accentBg: 'bg-stone-100 text-[#121312] border-stone-300',
    },
    fat: {
      label: 'Fat',
      shortLabel: 'Fat',
      unit: 'g',
      icon: Droplets,
      baseColor: 'text-[#5E605D]',
      bgColor: 'bg-[#FBFBF9]',
      borderColor: 'border-[#EBEAE5]',
      accentBg: 'bg-stone-100 text-[#121312] border-stone-300',
    },
    fiber: {
      label: 'Fiber',
      shortLabel: 'Fiber',
      unit: 'g',
      icon: Leaf,
      baseColor: 'text-[#0E6245]',
      bgColor: 'bg-emerald-50/50',
      borderColor: 'border-emerald-200/60',
      accentBg: 'bg-emerald-100/70 text-emerald-900 border-emerald-300',
    },
  };

  const config = configs[type];
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] py-0.5 px-2 rounded-md gap-1',
    md: 'text-xs py-1 px-2.5 rounded-lg gap-1.5',
    lg: 'text-sm py-1.5 px-3 rounded-lg gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  // If highlighted (e.g. protein-first emphasis)
  const isSpecialProtein = type === 'protein' || highlight;

  return (
    <div
      className={`
        inline-flex items-center font-medium border transition-colors select-none
        ${sizeClasses[size]}
        ${isSpecialProtein ? config.bgColor + ' ' + config.borderColor : 'bg-white border-[#EBEAE5]'}
        ${className}
      `}
      title={`${config.label}: ${value}${config.unit}`}
    >
      {showIcon && (
        <IconComponent
          className={`shrink-0 ${iconSizes[size]} ${
            isSpecialProtein ? 'text-[#0E6245]' : 'text-[#8C8E8B]'
          }`}
        />
      )}
      <span className="tabular-nums tracking-tight font-semibold text-[#121312]">
        {value}
        <span className="text-[10px] font-normal text-[#5E605D] ml-0.5">{config.unit}</span>
      </span>
      <span className="text-[10px] uppercase tracking-wider text-[#8C8E8B] font-medium hidden sm:inline">
        {config.shortLabel}
      </span>
    </div>
  );
};

// Compact Macro Ribbon for Cards and Detail Views
export interface NutritionRibbonProps {
  macros: MacroNutrients;
  variant?: 'compact' | 'detailed' | 'minimal';
  className?: string;
  onClickInspect?: () => void;
}

export const NutritionRibbon: React.FC<NutritionRibbonProps> = ({
  macros,
  variant = 'compact',
  className = '',
  onClickInspect,
}) => {
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 text-xs tabular-nums ${className}`}>
        <span className="inline-flex items-center font-bold text-[#0E6245] bg-[#EAF4EF] px-1.5 py-0.5 rounded-md">
          {macros.protein}g Prot
        </span>
        <span className="text-[#5E605D]">{macros.calories} kcal</span>
        <span className="text-[#8C8E8B]">•</span>
        <span className="text-[#707371]">{macros.fiber}g Fib</span>
      </div>
    );
  }

  return (
    <div
      onClick={onClickInspect}
      className={`
        bg-[#FBFBF9] border border-[#EBEAE5] rounded-xl p-2.5 transition-all
        ${onClickInspect ? 'cursor-pointer hover:border-[#0E6245]/40 hover:bg-[#F8FAF8]' : ''}
        ${className}
      `}
    >
      {/* 5 Macro Points: Calories, Protein, Carbs, Fat, Fiber */}
      <div className="grid grid-cols-5 divide-x divide-[#EBEAE5] text-center">
        {/* Protein (First priority for ProteinPath) */}
        <div className="px-1.5 py-0.5">
          <div className="text-[10px] font-medium text-[#0E6245] uppercase tracking-wider flex items-center justify-center gap-0.5">
            <Dna className="w-2.5 h-2.5" />
            <span>Protein</span>
          </div>
          <div className="text-sm font-bold text-[#0E6245] tabular-nums mt-0.5">
            {macros.protein}
            <span className="text-[10px] font-normal text-[#0E6245]/80">g</span>
          </div>
        </div>

        {/* Calories */}
        <div className="px-1.5 py-0.5">
          <div className="text-[10px] font-medium text-[#5E605D] uppercase tracking-wider flex items-center justify-center gap-0.5">
            <Flame className="w-2.5 h-2.5 text-amber-600/80" />
            <span>Energy</span>
          </div>
          <div className="text-sm font-semibold text-[#121312] tabular-nums mt-0.5">
            {macros.calories}
            <span className="text-[9px] font-normal text-[#8C8E8B]">cal</span>
          </div>
        </div>

        {/* Carbs */}
        <div className="px-1.5 py-0.5">
          <div className="text-[10px] font-medium text-[#5E605D] uppercase tracking-wider">
            Carbs
          </div>
          <div className="text-sm font-medium text-[#121312] tabular-nums mt-0.5">
            {macros.carbs}
            <span className="text-[9px] font-normal text-[#8C8E8B]">g</span>
          </div>
        </div>

        {/* Fat */}
        <div className="px-1.5 py-0.5">
          <div className="text-[10px] font-medium text-[#5E605D] uppercase tracking-wider">
            Fat
          </div>
          <div className="text-sm font-medium text-[#121312] tabular-nums mt-0.5">
            {macros.fat}
            <span className="text-[9px] font-normal text-[#8C8E8B]">g</span>
          </div>
        </div>

        {/* Fiber */}
        <div className="px-1.5 py-0.5">
          <div className="text-[10px] font-medium text-[#5E605D] uppercase tracking-wider flex items-center justify-center gap-0.5">
            <Leaf className="w-2.5 h-2.5 text-emerald-600" />
            <span>Fiber</span>
          </div>
          <div className="text-sm font-semibold text-[#121312] tabular-nums mt-0.5">
            {macros.fiber}
            <span className="text-[9px] font-normal text-[#8C8E8B]">g</span>
          </div>
        </div>
      </div>

      {/* Proportional Macro Energy Split Line */}
      <div className="mt-2 pt-2 border-t border-[#EBEAE5]/60 flex items-center gap-2">
        <div className="text-[10px] text-[#8C8E8B] font-medium shrink-0">Macro Split</div>
        <div className="h-1.5 w-full bg-[#EBEAE5] rounded-full overflow-hidden flex">
          {(() => {
            const proteinCal = macros.protein * 4;
            const carbCal = macros.carbs * 4;
            const fatCal = macros.fat * 9;
            const total = proteinCal + carbCal + fatCal || 1;
            const pPct = Math.round((proteinCal / total) * 100);
            const cPct = Math.round((carbCal / total) * 100);
            const fPct = 100 - pPct - cPct;
            return (
              <>
                <div
                  style={{ width: `${pPct}%` }}
                  className="bg-[#0E6245] h-full"
                  title={`Protein: ${pPct}% of calories`}
                />
                <div
                  style={{ width: `${cPct}%` }}
                  className="bg-[#D8D7CE] h-full"
                  title={`Carbs: ${cPct}% of calories`}
                />
                <div
                  style={{ width: `${fPct}%` }}
                  className="bg-[#B5B4A8] h-full"
                  title={`Fat: ${fPct}% of calories`}
                />
              </>
            );
          })()}
        </div>
        <div className="text-[10px] font-semibold text-[#0E6245] shrink-0">
          {Math.round(((macros.protein * 4) / ((macros.protein * 4) + (macros.carbs * 4) + (macros.fat * 9) || 1)) * 100)}% Prot
        </div>
      </div>
    </div>
  );
};
