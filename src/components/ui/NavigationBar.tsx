import React from 'react';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { NavigationTab } from '../../types';

export interface NavigationBarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  cartCount?: number;
  totalProteinGrams?: number;
  className?: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activeTab,
  onTabChange,
  cartCount = 0,
  className = '',
}) => {
  const tabs = [
    { id: 'home' as NavigationTab, label: 'Home', icon: Home },
    { id: 'search' as NavigationTab, label: 'Search', icon: Search },
    { id: 'orders' as NavigationTab, label: 'Orders', icon: ShoppingBag },
    { id: 'favorites' as NavigationTab, label: 'Favourites', icon: Heart },
    { id: 'profile' as NavigationTab, label: 'Profile', icon: User },
  ];

  return (
    <nav
      className={`
        relative w-full bg-white/95 dark:bg-[#121315]/95 backdrop-blur-xl border-t border-[#EBEAE5] dark:border-white/10
        px-4 py-2.5 flex items-center justify-between select-none shadow-[0_-4px_20px_rgba(0,0,0,0.02)]
        ${className}
      `}
      aria-label="Bottom Navigation"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id || (tab.id === 'home' && activeTab === 'discover');
        const isOrders = tab.id === 'orders';

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex-1 flex flex-col items-center justify-center py-1 rounded-xl cursor-pointer
              transition-all duration-200 outline-none
              ${
                isActive
                  ? 'text-[#0E6245] dark:text-[#30D158]'
                  : 'text-[#8C8E8B] hover:text-[#121312] dark:hover:text-[#F5F5F7]'
              }
            `}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.6]'
                }`}
              />

              {/* Order/Cart Badge indicator if items exist */}
              {isOrders && cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-[#0E6245] dark:bg-[#30D158] text-white dark:text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center tabular-nums shadow-xs"
                >
                  {cartCount}
                </span>
              )}
            </div>

            <span
              className={`text-[10px] tracking-tight mt-1 transition-colors ${
                isActive ? 'font-semibold' : 'font-normal'
              }`}
            >
              {tab.label}
            </span>

            {/* Subtle active indicator dot */}
            {isActive && (
              <span className="w-1 h-1 bg-[#0E6245] dark:bg-[#30D158] rounded-full mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
