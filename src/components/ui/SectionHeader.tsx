import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  actionText,
  onActionClick,
  className = '',
}) => {
  return (
    <div className={`flex items-end justify-between gap-4 mb-3.5 ${className}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-bold tracking-[-0.015em] text-[#121312] truncate">
            {title}
          </h2>
          {badge && (
            <span className="text-[11px] font-semibold bg-[#EAF4EF] text-[#0E6245] px-2 py-0.5 rounded-full border border-[#D5E8DE] shrink-0">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#5E605D] mt-0.5 truncate font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && (
        <button
          type="button"
          onClick={onActionClick}
          className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#0E6245] hover:text-[#094F37] transition-colors py-1 shrink-0 cursor-pointer"
        >
          <span>{actionText}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
