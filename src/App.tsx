/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FoodItem, CartItem } from './types';
import { FOOD_ITEMS } from './data/mockData';
import { MobileAppSimulator } from './components/mobile/MobileAppSimulator';
import { DesignSystemViewer } from './components/design-system/DesignSystemViewer';
import { AuthProvider } from './context/AuthContext';
import {
  Smartphone,
  Layers,
  Sparkles,
  ShoppingBag,
  Dna,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'mobile' | 'system' | 'split'>('mobile');
  const [isPhoneFramed, setIsPhoneFramed] = useState<boolean>(true);
  const [isGlobalDark, setIsGlobalDark] = useState<boolean>(true);
  const [globalDarkStyle, setGlobalDarkStyle] = useState<'apple' | 'cred'>('apple');

  // Shared cart state between simulator and design system
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { foodItem: FOOD_ITEMS[0], quantity: 1 },
  ]);

  const handleIncrement = (foodItem: FoodItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.foodItem.id === foodItem.id);
      if (existing) {
        return prev.map((i) =>
          i.foodItem.id === foodItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { foodItem, quantity: 1 }];
    });
  };

  const handleDecrement = (foodItem: FoodItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.foodItem.id === foodItem.id);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((i) => i.foodItem.id !== foodItem.id);
      }
      return prev.map((i) =>
        i.foodItem.id === foodItem.id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalProtein = cartItems.reduce(
    (sum, item) => sum + item.foodItem.macros.protein * item.quantity,
    0
  );

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isApple = globalDarkStyle === 'apple';

  return (
    <AuthProvider>
      <div className={`min-h-screen transition-colors duration-300 ${
        isGlobalDark
          ? isApple
            ? 'dark apple-dark bg-[#000000] text-[#F5F5F7]'
            : 'dark cred-dark bg-[#0A0B0E] text-white'
          : 'bg-[#FBFBF9] text-[#121312]'
      } flex flex-col antialiased`}>
      {/* Top Application Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-8 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors ${
        isGlobalDark
          ? isApple
            ? 'bg-[#000000]/85 border-white/12'
            : 'bg-[#0A0B0E]/95 border-white/10'
          : 'bg-white/95 border-[#EBEAE5]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm shadow-sm select-none transition-colors ${
              isGlobalDark
                ? isApple
                  ? 'bg-[#30D158] text-[#000000] shadow-[0_0_14px_rgba(48,209,88,0.4)]'
                  : 'bg-[#00E599] text-[#0A0B0E] shadow-[0_0_12px_rgba(0,229,153,0.35)]'
                : 'bg-[#0E6245] text-white'
            }`}>
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-extrabold text-base tracking-tight transition-colors ${
                  isGlobalDark ? 'text-[#F5F5F7]' : 'text-[#121312]'
                }`}>
                  PROTEIN<span className={isGlobalDark ? (isApple ? 'text-[#30D158]' : 'text-[#00E599]') : 'text-[#0E6245]'}>PATH</span>
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border hidden sm:inline-block transition-colors ${
                  isGlobalDark
                    ? isApple
                      ? 'bg-[#30D158]/15 text-[#30D158] border-[#30D158]/30'
                      : 'bg-[#00E599]/15 text-[#00E599] border-[#00E599]/30'
                    : 'bg-[#EAF4EF] text-[#0E6245] border-[#D5E8DE]'
                }`}>
                  Design System & App
                </span>
              </div>
              <p className={`text-[11px] hidden md:block transition-colors ${
                isGlobalDark ? (isApple ? 'text-[#86868B]' : 'text-[#9EA3AE]') : 'text-[#5E605D]'
              }`}>
                Foundational design system for a nutrition-first food marketplace
              </p>
            </div>
          </div>

          {/* Central Mode Switcher */}
          <div className={`flex items-center p-1 rounded-full border transition-colors ${
            isGlobalDark
              ? isApple
                ? 'bg-[#161617] border-white/12'
                : 'bg-[#181B22] border-white/10'
              : 'bg-[#F5F5F0] border-[#EBEAE5]'
          }`}>
            <button
              type="button"
              onClick={() => setActiveView('mobile')}
              className={`
                flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer
                ${
                  activeView === 'mobile'
                    ? isGlobalDark
                      ? isApple
                        ? 'bg-[#30D158] text-[#000000] font-bold shadow-xs'
                        : 'bg-[#00E599] text-[#0A0B0E] shadow-xs'
                      : 'bg-[#0E6245] text-white shadow-xs'
                    : isGlobalDark ? 'text-[#86868B] hover:text-[#F5F5F7]' : 'text-[#5E605D] hover:text-[#121312]'
                }
              `}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile App</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('system')}
              className={`
                flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer
                ${
                  activeView === 'system'
                    ? isGlobalDark
                      ? isApple
                        ? 'bg-[#30D158] text-[#000000] font-bold shadow-xs'
                        : 'bg-[#00E599] text-[#0A0B0E] shadow-xs'
                      : 'bg-[#0E6245] text-white shadow-xs'
                    : isGlobalDark ? 'text-[#86868B] hover:text-[#F5F5F7]' : 'text-[#5E605D] hover:text-[#121312]'
                }
              `}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Design System Spec</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('split')}
              className={`
                hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer
                ${
                  activeView === 'split'
                    ? isGlobalDark
                      ? isApple
                        ? 'bg-[#30D158] text-[#000000] font-bold shadow-xs'
                        : 'bg-[#00E599] text-[#0A0B0E] shadow-xs'
                      : 'bg-[#0E6245] text-white shadow-xs'
                    : isGlobalDark ? 'text-[#86868B] hover:text-[#F5F5F7]' : 'text-[#5E605D] hover:text-[#121312]'
                }
              `}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
          </div>

          {/* Right Status / Device Frame Toggle & Dark Mode Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Apple Website / High-Contrast Dark Mode Switcher */}
            <button
              type="button"
              onClick={() => setIsGlobalDark(!isGlobalDark)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                isGlobalDark
                  ? isApple
                    ? 'bg-[#30D158] text-[#000000] border-[#30D158]/40 shadow-[0_0_14px_rgba(48,209,88,0.4)]'
                    : 'bg-[#00E599] text-[#0A0B0E] border-[#00E599]/40 shadow-[0_0_12px_rgba(0,229,153,0.35)]'
                  : 'bg-[#121312] text-white border-transparent hover:bg-black'
              }`}
              title="Toggle High-Contrast Luxury Dark Palette (Apple Website Inspired)"
            >
              {isGlobalDark ? <Moon className="w-3.5 h-3.5 fill-current" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              <span className="hidden sm:inline">
                {isGlobalDark ? (isApple ? 'APPLE DARK' : 'CRED DARK') : 'LIGHT'}
              </span>
            </button>

            {activeView !== 'system' && (
              <button
                type="button"
                onClick={() => setIsPhoneFramed(!isPhoneFramed)}
                className={`hidden sm:inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  isGlobalDark
                    ? 'bg-[#181B22] text-[#9EA3AE] hover:text-white border-white/10'
                    : 'bg-[#F5F5F0] hover:bg-[#EAEAE5] text-[#5E605D] hover:text-[#121312] border-[#EBEAE5]'
                }`}
                title={isPhoneFramed ? 'Remove phone frame' : 'Apply phone frame'}
              >
                {isPhoneFramed ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Flat View</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Phone Bezel</span>
                  </>
                )}
              </button>
            )}

            {/* Protein & Cart Summary Pill */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-colors ${
              isGlobalDark
                ? isApple
                  ? 'bg-[#30D158]/15 border-[#30D158]/30 text-[#30D158]'
                  : 'bg-[#00E599]/15 border-[#00E599]/30 text-[#00E599]'
                : 'bg-[#EAF4EF] border-[#D5E8DE] text-[#0E6245]'
            }`}>
              <Dna className="w-3.5 h-3.5" />
              <span className="font-bold tabular-nums">
                {totalProtein}g
              </span>
              <span className="opacity-75 hidden sm:inline">Protein</span>
              <span className="opacity-40">•</span>
              <span className={`font-semibold tabular-nums ${isGlobalDark ? 'text-[#F5F5F7]' : 'text-[#121312]'}`}>
                {totalCount}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Presentation Area */}
      <main className="flex-1 p-4 sm:p-8">
        {activeView === 'mobile' && (
          <div className="max-w-md mx-auto py-2">
            <MobileAppSimulator
              cartItems={cartItems}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onClearCart={handleClearCart}
              isFramed={isPhoneFramed}
            />
          </div>
        )}

        {activeView === 'system' && (
          <div className="py-2">
            <DesignSystemViewer />
          </div>
        )}

        {activeView === 'split' && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-2">
            {/* Left: Mobile App Simulator */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="text-center mb-3">
                <span className="text-xs uppercase font-bold text-[#8C8E8B] tracking-wider">
                  Live Mobile Simulator
                </span>
              </div>
              <MobileAppSimulator
                cartItems={cartItems}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onClearCart={handleClearCart}
                isFramed={true}
              />
            </div>

            {/* Right: Design System Documentation */}
            <div className="lg:col-span-7">
              <DesignSystemViewer />
            </div>
          </div>
        )}
      </main>

      {/* Subtle Design System Footer */}
      <footer className={`border-t py-4 px-6 text-center text-xs transition-colors ${
        isGlobalDark
          ? isApple
            ? 'bg-[#161617] border-white/12 text-[#86868B]'
            : 'bg-[#121418] border-white/10 text-[#9EA3AE]'
          : 'bg-white border-[#EBEAE5] text-[#5E605D]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            PROTEINPATH™ Design System • Nutrition-First Food Delivery Marketplace
          </span>
          <div className="flex items-center gap-4 text-[#8C8E8B]">
            <span>{isGlobalDark ? (isApple ? 'Apple Pure Black #000000' : 'Obsidian #0A0B0E') : 'Off-White #FBFBF9'}</span>
            <span>•</span>
            <span>{isGlobalDark ? (isApple ? 'Display White #F5F5F7' : 'Pure White #FFFFFF') : 'Obsidian Charcoal #121312'}</span>
            <span>•</span>
            <span className={`font-semibold ${isGlobalDark ? (isApple ? 'text-[#30D158]' : 'text-[#00E599]') : 'text-[#0E6245]'}`}>
              {isGlobalDark ? (isApple ? 'Apple Health Green #30D158' : 'CRED Neo-Mint #00E599') : 'Botanical Emerald #0E6245'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  </AuthProvider>
);
}
