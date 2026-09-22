import React from 'react';
import {
  CalendarSync,
  Sparkles,
  Compass,
  Users,
  ArrowUpRight,
} from 'lucide-react';

export interface ExploreCardItem {
  id: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  iconBg: string;
  badge?: string;
  description: string;
}

export const EXPLORE_CARDS: ExploreCardItem[] = [
  {
    id: 'subscriptions',
    title: 'Subscriptions',
    tagline: 'Macro-locked weekly meal drops',
    icon: CalendarSync,
    accentColor: '#30D158',
    iconBg: 'bg-[#30D158]/10 text-[#30D158]',
    badge: 'Save 15%',
    description:
      'Curate recurring weekly high-protein drops calibrated to your precise daily caloric & gram targets.',
  },
  {
    id: 'exclusive-offers',
    title: 'Exclusive Offers',
    tagline: 'Private chef collaborations',
    icon: Sparkles,
    accentColor: '#E5C46D',
    iconBg: 'bg-[#E5C46D]/10 text-[#E5C46D]',
    badge: 'VIP Only',
    description:
      'Access member-only seasonal cuts, bespoke protein bowls, and zero-fee priority concierge deliveries.',
  },
  {
    id: 'travel-dining',
    title: 'Travel Dining',
    tagline: 'Hotel & terminal delivery',
    icon: Compass,
    accentColor: '#A1A1A6',
    iconBg: 'bg-white/8 text-[#F5F5F7]',
    badge: 'Concierge',
    description:
      'Ensure zero nutritional compromise on the road. Pre-scheduled delivery direct to premium hotels and private terminals.',
  },
  {
    id: 'group-events',
    title: 'Group Events',
    tagline: 'Athletic recovery & meetings',
    icon: Users,
    accentColor: '#63E2B7',
    iconBg: 'bg-[#63E2B7]/10 text-[#63E2B7]',
    badge: 'Catering',
    description:
      'Nutritional catering for fitness teams, athletic board meetings, and performance-oriented gatherings.',
  },
];

export interface ExploreMoreSectionProps {
  onSelectCard?: (card: ExploreCardItem) => void;
  className?: string;
}

export const ExploreMoreSection: React.FC<ExploreMoreSectionProps> = ({
  onSelectCard,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Refined Section Header */}
      <div className="px-4 mb-3 flex items-center justify-between">
        <h2 className="text-xs font-bold tracking-[0.16em] uppercase text-[#86868B] dark:text-[#86868B]">
          Explore More
        </h2>
        <span className="text-[10px] text-[#5E605D] dark:text-[#636366] font-medium tracking-wider">
          Curated Services
        </span>
      </div>

      {/* Horizontal Scrollable Feature Cards Container (120x140px, Titanium Bento #161617) */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-4 py-1">
        {EXPLORE_CARDS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCard?.(item)}
              className="
                w-[120px] h-[140px] shrink-0 rounded-[16px]
                bg-[#161617] border border-white/[0.08] hover:border-white/[0.22]
                p-3.5 flex flex-col justify-between items-center text-center
                group cursor-pointer transition-all duration-200
                hover:-translate-y-0.5 active:scale-[0.98] shadow-sm
                focus:outline-none relative overflow-hidden
              "
            >
              {/* Subtle top ambient sheen */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              {/* Optional Subtle Badge */}
              {item.badge && (
                <div className="absolute top-2 right-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3 h-3 text-[#86868B] group-hover:text-white transition-colors" />
                </div>
              )}

              {/* Top Half: Centered Muted Sophisticated Icon */}
              <div className="w-full flex-1 flex items-center justify-center pt-1">
                <div
                  className={`w-11 h-11 rounded-full ${item.iconBg} flex items-center justify-center transition-transform duration-200 group-hover:scale-105 border border-white/5`}
                >
                  <Icon className="w-5 h-5 transition-colors" />
                </div>
              </div>

              {/* Bottom Half: Label in small, clean font */}
              <div className="w-full pb-0.5">
                <span className="block text-[12px] font-semibold text-[#F5F5F7] tracking-tight leading-tight group-hover:text-white transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </span>
                <span className="block text-[9.5px] text-[#86868B] mt-0.5 tracking-tight truncate">
                  {item.badge || 'Discover'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
