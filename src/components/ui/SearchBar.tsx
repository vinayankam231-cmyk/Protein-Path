import React from 'react';
import { Search, X, SlidersHorizontal, Dna } from 'lucide-react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onFilterClick?: () => void;
  filterActive?: boolean;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  onFilterClick,
  filterActive = false,
  placeholder = 'Search high-protein dishes, wild catch, macros...',
  className = '',
}) => {
  return (
    <div
      className={`
        relative flex items-center w-full bg-white border border-[#EBEAE5] rounded-full
        focus-within:border-[#0E6245] focus-within:ring-2 focus-within:ring-[#0E6245]/15
        shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] transition-all duration-200 h-11 px-3.5
        ${className}
      `}
    >
      <Search className="w-4 h-4 text-[#8C8E8B] shrink-0 mr-2.5" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[#121312] text-sm placeholder:text-[#8C8E8B] outline-none font-normal"
      />

      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          className="p-1 rounded-full text-[#8C8E8B] hover:text-[#121312] hover:bg-[#F5F5F0] transition-colors mr-1"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {onFilterClick && (
        <button
          type="button"
          onClick={onFilterClick}
          className={`
            p-1.5 rounded-full transition-all shrink-0 ml-1 cursor-pointer
            ${
              filterActive
                ? 'bg-[#0E6245] text-white shadow-sm'
                : 'text-[#5E605D] hover:text-[#121312] hover:bg-[#F5F5F0]'
            }
          `}
          aria-label="Open macro filters"
          title="Macro filter"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
