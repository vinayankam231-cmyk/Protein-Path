import React from 'react';
import { motion } from 'motion/react';
import {
  Fish,
  Drumstick,
  Sparkles,
  Egg,
  Leaf,
  Beef,
  Layers,
  X,
} from 'lucide-react';
import { ProteinSourceId } from '../../types';
import { PROTEIN_SOURCES } from '../../data/mockData';

export interface ProteinSourcesSectionProps {
  selectedSource: ProteinSourceId | string;
  onSelectSource: (sourceId: ProteinSourceId | string) => void;
  className?: string;
}

const SOURCE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'wild-seafood': Fish,
  'poultry': Drumstick,
  'artisanal-dairy': Sparkles,
  'pasture-eggs': Egg,
  'plant-power': Leaf,
  'lean-red': Beef,
};

export const ProteinSourcesSection: React.FC<ProteinSourcesSectionProps> = ({
  selectedSource,
  onSelectSource,
  className = '',
}) => {
  const isFiltered = selectedSource !== 'all';

  const handleCardClick = (id: ProteinSourceId | string) => {
    // Tapping again resets to 'all'
    if (selectedSource === id) {
      onSelectSource('all');
    } else {
      onSelectSource(id);
    }
  };

  return (
    <div className={`w-full ${className}`} id="protein-sources-section">
      {/* Section Header */}
      <div className="px-4 mb-2.5 flex items-end justify-between">
        <div>
          <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#86868B] select-none">
            Choose By Source
          </h3>
          <p className="text-xs text-[#86868B]/80 mt-0.5 select-none">
            Single-origin & bioavailable ingredients
          </p>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={() => onSelectSource('all')}
            className="flex items-center gap-1 text-xs font-semibold text-[#30D158] hover:text-[#28b84d] transition-colors cursor-pointer select-none"
          >
            <span>Reset</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Horizontal Food Source Cards Strip */}
      <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar px-4 py-1.5 scroll-smooth">
        {/* "All Sources" Bento Card */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelectSource('all')}
          className={`shrink-0 text-left min-w-[140px] sm:min-w-[150px] p-3.5 rounded-2xl transition-all duration-200 cursor-pointer focus:outline-none flex flex-col justify-between select-none ${
            selectedSource === 'all'
              ? 'bg-[#161617] border border-[#30D158] ring-1 ring-[#30D158] shadow-[0_0_18px_rgba(48,209,88,0.18)]'
              : 'bg-[#161617] border border-white/[0.1] hover:border-white/20 hover:bg-[#1A1A1C]'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                selectedSource === 'all'
                  ? 'bg-[#30D158]/15 text-[#30D158] ring-1 ring-[#30D158]/30'
                  : 'bg-white/[0.06] text-[#A1A1A6] ring-1 ring-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[#86868B] tabular-nums">
              All Items
            </span>
          </div>

          <div className="mt-3">
            <div className="text-[13px] font-semibold text-[#F5F5F7] tracking-tight leading-tight">
              All Sources
            </div>
            <div className="text-[11px] text-[#86868B] truncate mt-0.5">
              Full nutrient spectrum
            </div>
          </div>
        </motion.button>

        {/* Dynamic Protein Source Bento Cards */}
        {PROTEIN_SOURCES.map((source) => {
          const isSelected = selectedSource === source.id;
          const IconComponent = SOURCE_ICON_MAP[source.id] || Layers;

          return (
            <motion.button
              key={source.id}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => handleCardClick(source.id)}
              className={`shrink-0 text-left min-w-[175px] sm:min-w-[190px] p-3.5 rounded-2xl transition-all duration-200 cursor-pointer focus:outline-none flex flex-col justify-between select-none ${
                isSelected
                  ? 'bg-[#161617] border border-[#30D158] ring-1 ring-[#30D158] shadow-[0_0_20px_rgba(48,209,88,0.22)]'
                  : 'bg-[#161617] border border-white/[0.1] hover:border-white/20 hover:bg-[#1A1A1C]'
              }`}
            >
              {/* Top Row: Micro-photo with Icon Badge + Protein Density Tag */}
              <div className="flex items-center justify-between w-full gap-2">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10 shrink-0">
                  {source.imageUrl && (
                    <img
                      src={source.imageUrl}
                      alt={source.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  )}
                  {/* Subtle Dark Gradient & Mini Floating Lucide Icon */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-white drop-shadow-sm" />
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border tabular-nums transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#30D158]/15 border-[#30D158]/30 text-[#30D158]'
                      : 'bg-white/[0.05] border-white/[0.08] text-[#30D158]'
                  }`}
                >
                  {source.proteinDensityTag}
                </span>
              </div>

              {/* Bottom Row: Source Name & Sublabel */}
              <div className="mt-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold text-[#F5F5F7] tracking-tight leading-tight">
                    {source.label}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] shrink-0" />
                  )}
                </div>
                <div className="text-[11px] text-[#86868B] truncate mt-0.5 leading-snug">
                  {source.sublabel}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
