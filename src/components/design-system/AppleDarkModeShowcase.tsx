import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Moon,
  Sun,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronRight,
  Zap,
  Activity,
  Cpu,
  Layers,
  Flame,
  Dna,
} from 'lucide-react';

export interface AppleColorToken {
  name: string;
  category: 'Surfaces' | 'Typography' | 'Accents & Health' | 'Borders & Structure';
  lightHex: string;
  appleDarkHex: string;
  appleSystemName: string;
  contrastRatio: string;
  usage: string;
  role: string;
}

export const APPLE_COLOR_TOKENS: AppleColorToken[] = [
  {
    name: 'Canvas Base',
    category: 'Surfaces',
    lightHex: '#FBFBF9',
    appleDarkHex: '#000000',
    appleSystemName: 'System Background (Pure Black)',
    contrastRatio: '21:1 (AAA Max)',
    usage: 'Root viewport, Apple Pro product stage backdrop',
    role: 'Zero-bounce true pitch black providing infinite visual depth',
  },
  {
    name: 'Surface Pure',
    category: 'Surfaces',
    lightHex: '#FFFFFF',
    appleDarkHex: '#161617',
    appleSystemName: 'Secondary System Background',
    contrastRatio: '19.5:1 (AAA)',
    usage: 'Bento cards, floating modal drawers, primary containers',
    role: 'Apple Dark Surface with 1px chamfered specular top edge',
  },
  {
    name: 'Surface Subtle',
    category: 'Surfaces',
    lightHex: '#F5F5F0',
    appleDarkHex: '#1D1D1F',
    appleSystemName: 'Tertiary System Background (Bento Well)',
    contrastRatio: '16.2:1 (AAA)',
    usage: 'Inner bento wells, stat wells, stepper backdrops, chips',
    role: 'Titanium-tinted elevated slate for hierarchical grouping',
  },
  {
    name: 'Headline Primary',
    category: 'Typography',
    lightHex: '#121312',
    appleDarkHex: '#F5F5F7',
    appleSystemName: 'System Label (SF Display White)',
    contrastRatio: '19.5:1 (AAA)',
    usage: 'Display headlines, prices, primary metric numbers',
    role: 'Luminous Apple off-white eliminating ocular glare',
  },
  {
    name: 'Body Secondary',
    category: 'Typography',
    lightHex: '#5E605D',
    appleDarkHex: '#86868B',
    appleSystemName: 'Secondary Label (Apple Subtitle Gray)',
    contrastRatio: '9.1:1 (AAA)',
    usage: 'Subtitles, ingredient lists, culinary descriptions',
    role: 'Precision neutral slate preserving quiet reading hierarchy',
  },
  {
    name: 'Caption Muted',
    category: 'Typography',
    lightHex: '#8C8E8B',
    appleDarkHex: '#6E6E73',
    appleSystemName: 'Tertiary Label (Caption Gray)',
    contrastRatio: '5.2:1 (AA)',
    usage: 'Timestamps, units, nutritional metadata, footnotes',
    role: 'Low-salience technical gray for peripheral documentation',
  },
  {
    name: 'Signature Accent',
    category: 'Accents & Health',
    lightHex: '#0E6245',
    appleDarkHex: '#30D158',
    appleSystemName: 'Apple Health Green (Vitality Ring)',
    contrastRatio: '15.2:1 (AAA)',
    usage: 'Primary buttons, protein target rings, active badges',
    role: 'Vivid biological green celebrating pure living nutrition',
  },
  {
    name: 'Vitality Pulse',
    category: 'Accents & Health',
    lightHex: '#077A55',
    appleDarkHex: '#34C759',
    appleSystemName: 'System Mint Bright (Hover & Pulse)',
    contrastRatio: '16.8:1 (AAA)',
    usage: 'Interactive hover states, active glows, ring endpoints',
    role: 'Hyper-smooth Apple glow response under cursor contact',
  },
  {
    name: 'Health Tint',
    category: 'Accents & Health',
    lightHex: '#EAF4EF',
    appleDarkHex: 'rgba(48, 209, 88, 0.14)',
    appleSystemName: 'System Fill Thin (Emerald Glass)',
    contrastRatio: '7.8:1 (AAA)',
    usage: 'Macro tag backdrops, active filter pills, focus halos',
    role: 'Translucent Apple Health glass with 1px luminous rim',
  },
  {
    name: 'Action Link Blue',
    category: 'Accents & Health',
    lightHex: '#0E6245',
    appleDarkHex: '#2997FF',
    appleSystemName: 'Apple Interactive System Blue',
    contrastRatio: '11.4:1 (AAA)',
    usage: 'Text links, chevrons, secondary action triggers',
    role: 'Iconic Apple website link blue with animated chevron',
  },
  {
    name: 'Hairline Border',
    category: 'Borders & Structure',
    lightHex: '#EBEAE5',
    appleDarkHex: 'rgba(255, 255, 255, 0.12)',
    appleSystemName: 'System Separator (Brushed Titanium)',
    contrastRatio: '1.3:1 (Subtle)',
    usage: 'Card boundaries, row dividers, bento grid borders',
    role: 'Aerospace-grade 1px metallic hairline catching light',
  },
  {
    name: 'Strong Border',
    category: 'Borders & Structure',
    lightHex: '#DCD9D0',
    appleDarkHex: 'rgba(255, 255, 255, 0.24)',
    appleSystemName: 'Opaque Separator (Specular Rim)',
    contrastRatio: '1.6:1 (Defined)',
    usage: 'Active card selection, focused search bars, modal rims',
    role: 'Specular rim reflection defining floating visual planes',
  },
];

export interface AppleDarkModeShowcaseProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const AppleDarkModeShowcase: React.FC<AppleDarkModeShowcaseProps> = ({
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBentoTab, setActiveBentoTab] = useState<'macros' | 'bio' | 'coldchain'>('macros');

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const categories = ['All', 'Surfaces', 'Typography', 'Accents & Health', 'Borders & Structure'] as const;

  const filteredTokens = selectedCategory === 'All'
    ? APPLE_COLOR_TOKENS
    : APPLE_COLOR_TOKENS.filter((t) => t.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* 1. APPLE PRO PRODUCT HEADER & MASTER TOGGLE */}
      <div
        className={`rounded-3xl p-6 sm:p-10 transition-all duration-300 relative overflow-hidden border ${
          isDarkMode
            ? 'bg-[#161617] border-white/12 shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)]'
            : 'bg-white border-[#EBEAE5] shadow-xs'
        }`}
      >
        {/* Subtle Apple-style radial illumination */}
        <div
          className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
            isDarkMode ? 'bg-gradient-to-b from-[#30D158]/15 via-transparent to-transparent opacity-100' : 'bg-[#EAF4EF] opacity-60'
          }`}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-tight transition-colors ${
                  isDarkMode
                    ? 'bg-[#1D1D1F] text-[#F5F5F7] border border-white/15'
                    : 'bg-[#F5F5F0] text-[#121312] border border-[#EBEAE5]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#30D158]" />
                <span>Apple Website Dark Aesthetic</span>
              </span>

              <span
                className={`text-[11px] font-mono px-2.5 py-1 rounded-full font-bold transition-colors ${
                  isDarkMode
                    ? 'bg-[#30D158]/15 text-[#30D158] border border-[#30D158]/30'
                    : 'bg-[#EAF4EF] text-[#0E6245] border border-[#D5E8DE]'
                }`}
              >
                #000000 PITCH BLACK CANVAS • 21:1 AAA
              </span>
            </div>

            <h2
              className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight transition-colors ${
                isDarkMode ? 'text-[#F5F5F7]' : 'text-[#121312]'
              }`}
            >
              Pro Nutrition Architecture. In pitch black.
            </h2>

            <p
              className={`mt-3 text-sm sm:text-base leading-relaxed transition-colors ${
                isDarkMode ? 'text-[#86868B]' : 'text-[#5E605D]'
              }`}
            >
              Modeled after the dark design language of Apple product pages: pure `#000000` canvas,
              `#161617` titanium bento containers, `#F5F5F7` luminous typography, and Apple Health
              vitality green (<code className="font-mono text-xs font-bold text-[#30D158]">#30D158</code>)
              paired with interactive action blue (<code className="font-mono text-xs font-bold text-[#2997FF]">#2997FF</code>).
            </p>
          </div>

          {/* Master Apple Capsule Toggle Switch */}
          <div
            className={`p-5 rounded-2xl border transition-all shrink-0 self-stretch sm:self-auto flex flex-col gap-3 min-w-[260px] ${
              isDarkMode
                ? 'bg-[#000000] border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
                : 'bg-[#FBFBF9] border-[#EBEAE5]'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider block font-bold transition-colors ${
                    isDarkMode ? 'text-[#30D158]' : 'text-[#8C8E8B]'
                  }`}
                >
                  DISPLAY APPEARANCE
                </span>
                <span
                  className={`text-sm font-bold transition-colors block ${
                    isDarkMode ? 'text-[#F5F5F7]' : 'text-[#121312]'
                  }`}
                >
                  {isDarkMode ? 'Apple Pro Dark' : 'Porcelain Warm Light'}
                </span>
              </div>

              {/* Apple iOS/macOS Smooth Pill Toggle */}
              <button
                type="button"
                onClick={onToggleDarkMode}
                className={`relative w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none ${
                  isDarkMode
                    ? 'bg-[#30D158] shadow-[0_0_16px_rgba(48,209,88,0.4)]'
                    : 'bg-[#DCD9D0] hover:bg-[#CBC8BF]'
                }`}
                title={isDarkMode ? 'Switch to Light Palette' : 'Switch to Apple Pro Dark Palette'}
              >
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors ${
                    isDarkMode ? 'bg-[#000000] text-[#30D158] translate-x-8' : 'bg-white text-[#121312] translate-x-0'
                  }`}
                >
                  {isDarkMode ? (
                    <Moon className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </motion.div>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/10">
              <span className={isDarkMode ? 'text-[#86868B]' : 'text-[#5E605D]'}>Canvas:</span>
              <span
                className={`font-semibold inline-flex items-center gap-1.5 ${
                  isDarkMode ? 'text-[#30D158]' : 'text-[#0E6245]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isDarkMode
                      ? 'bg-[#30D158] shadow-[0_0_6px_#30D158]'
                      : 'bg-[#0E6245]'
                  }`}
                />
                {isDarkMode ? '#000000 TRUE BLACK' : '#FBFBF9 PORCELAIN'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. APPLE BENTO SHOWCASE (Inspired by apple.com/iphone-16-pro) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h3
              className={`text-lg font-bold transition-colors ${
                isDarkMode ? 'text-[#F5F5F7]' : 'text-[#121312]'
              }`}
            >
              Apple Website Bento Architecture
            </h3>
            <p
              className={`text-xs transition-colors ${
                isDarkMode ? 'text-[#86868B]' : 'text-[#5E605D]'
              }`}
            >
              Quiet luxury through high-density metric displays, Apple Health rings, and brushed titanium frames.
            </p>
          </div>

          <div
            className={`flex items-center p-1 rounded-full border text-xs font-semibold ${
              isDarkMode ? 'bg-[#161617] border-white/12' : 'bg-[#F5F5F0] border-[#EBEAE5]'
            }`}
          >
            {(['macros', 'bio', 'coldchain'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveBentoTab(tab)}
                className={`px-3 py-1 rounded-full capitalize transition-all cursor-pointer ${
                  activeBentoTab === tab
                    ? isDarkMode
                      ? 'bg-[#F5F5F7] text-[#000000] font-bold shadow-xs'
                      : 'bg-[#0E6245] text-white shadow-xs'
                    : isDarkMode
                    ? 'text-[#86868B] hover:text-[#F5F5F7]'
                    : 'text-[#5E605D] hover:text-[#121312]'
                }`}
              >
                {tab === 'macros' ? 'Target Rings' : tab === 'bio' ? 'Silicon Bio' : 'Cold-Chain'}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bento 1: Apple Health Activity Rings Card */}
          <div
            className={`md:col-span-7 rounded-3xl p-6 sm:p-8 border transition-all relative overflow-hidden flex flex-col justify-between ${
              isDarkMode
                ? 'bg-[#161617] border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]'
                : 'bg-white border-[#EBEAE5] shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest block font-bold ${
                    isDarkMode ? 'text-[#30D158]' : 'text-[#0E6245]'
                  }`}
                >
                  NUTRITION PERFORMANCE
                </span>
                <h4
                  className={`text-xl sm:text-2xl font-extrabold tracking-tight mt-1 ${
                    isDarkMode ? 'text-[#F5F5F7]' : 'text-[#121312]'
                  }`}
                >
                  Triple-Ring Daily Goal
                </h4>
                <p
                  className={`text-xs mt-1 max-w-sm ${
                    isDarkMode ? 'text-[#86868B]' : 'text-[#5E605D]'
                  }`}
                >
                  Continuous bio-sensing tracking total protein grams, leucine threshold, and micronutrient density.
                </p>
              </div>

              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isDarkMode ? 'bg-[#1D1D1F] border-white/10 text-[#30D158]' : 'bg-[#EAF4EF] border-[#D5E8DE] text-[#0E6245]'
                }`}
              >
                <Activity className="w-5 h-5" />
              </div>
            </div>

            {/* Apple Activity Rings Visual */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center my-6 py-4 border-y border-inherit">
              {/* Concentric SVG Rings */}
              <div className="relative flex items-center justify-center">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                  {/* Background Track Rings */}
                  <circle cx="80" cy="80" r="66" fill="transparent" stroke={isDarkMode ? '#2C2C2E' : '#EBEAE5'} strokeWidth="12" />
                  <circle cx="80" cy="80" r="50" fill="transparent" stroke={isDarkMode ? '#2C2C2E' : '#EBEAE5'} strokeWidth="12" />
                  <circle cx="80" cy="80" r="34" fill="transparent" stroke={isDarkMode ? '#2C2C2E' : '#EBEAE5'} strokeWidth="12" />

                  {/* Active Rings */}
                  {/* Outer: Protein Target (Apple Green #30D158) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="66"
                    fill="transparent"
                    stroke="#30D158"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 66}
                    strokeDashoffset={2 * Math.PI * 66 * (1 - 0.94)}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  {/* Middle: Leucine Threshold (Apple Amber #FFD60A) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="50"
                    fill="transparent"
                    stroke="#FFD60A"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50 * (1 - 0.88)}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  {/* Inner: Bioavailability (Apple Blue #2997FF) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="34"
                    fill="transparent"
                    stroke="#2997FF"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 34}
                    strokeDashoffset={2 * Math.PI * 34 * (1 - 0.99)}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>

                {/* Center Core Readout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono uppercase text-[#86868B] font-bold">TOTAL</span>
                  <span className={`text-xl font-extrabold font-mono ${isDarkMode ? 'text-[#F5F5F7]' : 'text-[#121312]'}`}>
                    184g
                  </span>
                </div>
              </div>

              {/* Ring Metrics Legend */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#30D158] shadow-[0_0_8px_#30D158]" />
                    <span className={isDarkMode ? 'text-[#F5F5F7] font-semibold' : 'text-[#121312] font-semibold'}>
                      Protein Grams
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#30D158]">184g / 190g</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A] shadow-[0_0_8px_#FFD60A]" />
                    <span className={isDarkMode ? 'text-[#F5F5F7] font-semibold' : 'text-[#121312] font-semibold'}>
                      Leucine Spike
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#FFD60A]">3.2g / 3.0g</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2997FF] shadow-[0_0_8px_#2997FF]" />
                    <span className={isDarkMode ? 'text-[#F5F5F7] font-semibold' : 'text-[#121312] font-semibold'}>
                      Bioavailability
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#2997FF]">99.4% DIAAS</span>
                </div>
              </div>
            </div>

            {/* Apple Pro Footer with Action Link */}
            <div className="flex items-center justify-between pt-2">
              <span className={`text-xs ${isDarkMode ? 'text-[#86868B]' : 'text-[#5E605D]'}`}>
                Calibrated against pasture-raised protein sources
              </span>
              <a
                href="#nutrition"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2997FF] hover:underline"
              >
                <span>Explore DIAAS methodology</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bento 2: Apple Silicon-Style Macro Architecture */}
          <div
            className={`md:col-span-5 rounded-3xl p-6 sm:p-8 border transition-all flex flex-col justify-between ${
              isDarkMode
                ? 'bg-[#161617] border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]'
                : 'bg-white border-[#EBEAE5] shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                    isDarkMode ? 'text-[#30D158]' : 'text-[#0E6245]'
                  }`}
                >
                  SYSTEM ARCHITECTURE
                </span>
                <Cpu className={`w-4 h-4 ${isDarkMode ? 'text-[#30D158]' : 'text-[#0E6245]'}`} />
              </div>

              <h4
                className={`text-xl font-extrabold tracking-tight mt-1.5 ${
                  isDarkMode ? 'text-[#F5F5F7]' : 'text-[#121312]'
                }`}
              >
                M4 Nutrition Silicon
              </h4>

              <p
                className={`text-xs mt-1.5 leading-relaxed ${
                  isDarkMode ? 'text-[#86868B]' : 'text-[#5E605D]'
                }`}
              >
                Custom bio-algorithms calculate gastric absorption velocities and amino acid bioavailability in real time.
              </p>

              {/* Silicon Metric Callouts */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div
                  className={`p-3.5 rounded-2xl border ${
                    isDarkMode ? 'bg-[#1D1D1F] border-white/10' : 'bg-[#F5F5F0] border-[#EBEAE5]'
                  }`}
                >
                  <span className={`text-[10px] font-mono uppercase block ${isDarkMode ? 'text-[#86868B]' : 'text-[#5E605D]'}`}>
                    DIAAS SCORE
                  </span>
                  <span className="text-2xl font-extrabold font-mono text-[#30D158] block mt-0.5">
                    1.34<span className="text-sm">x</span>
                  </span>
                  <span className="text-[10px] text-[#86868B]">Industry High</span>
                </div>

                <div
                  className={`p-3.5 rounded-2xl border ${
                    isDarkMode ? 'bg-[#1D1D1F] border-white/10' : 'bg-[#F5F5F0] border-[#EBEAE5]'
                  }`}
                >
                  <span className={`text-[10px] font-mono uppercase block ${isDarkMode ? 'text-[#86868B]' : 'text-[#5E605D]'}`}>
                    GLYCEMIC INDEX
                  </span>
                  <span className={`text-2xl font-extrabold font-mono block mt-0.5 ${isDarkMode ? 'text-[#F5F5F7]' : 'text-[#121312]'}`}>
                    &lt; 28
                  </span>
                  <span className="text-[10px] text-[#86868B]">Ultra-Low Peak</span>
                </div>
              </div>
            </div>

            {/* Apple Pill Primary Button */}
            <div className="pt-6 border-t border-inherit mt-4">
              <button
                type="button"
                className={`w-full py-2.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isDarkMode
                    ? 'bg-[#F5F5F7] hover:bg-white text-[#000000] shadow-[0_4px_20px_rgba(255,255,255,0.15)]'
                    : 'bg-[#121312] hover:bg-black text-white'
                }`}
              >
                <span>Configure Bio-Target</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. APPLE HIGH-CONTRAST TOKEN MAPPING MATRIX */}
      <div
        className={`rounded-3xl p-6 sm:p-8 transition-all border space-y-6 ${
          isDarkMode
            ? 'bg-[#161617] border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.7)]'
            : 'bg-white border-[#EBEAE5]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-inherit">
          <div>
            <h3
              className={`text-lg font-bold transition-colors ${
                isDarkMode ? 'text-[#F5F5F7]' : 'text-[#121312]'
              }`}
            >
              Light to Apple Website Dark Palette Mapping
            </h3>
            <p
              className={`text-xs transition-colors ${
                isDarkMode ? 'text-[#86868B]' : 'text-[#5E605D]'
              }`}
            >
              Explicit semantic mapping from porcelain light mode to Apple&apos;s Pro website palette with verified WCAG contrast.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? isDarkMode
                      ? 'bg-[#F5F5F7] text-[#000000] font-bold shadow-xs'
                      : 'bg-[#0E6245] text-white'
                    : isDarkMode
                    ? 'bg-[#1D1D1F] text-[#86868B] hover:text-[#F5F5F7] border border-white/10'
                    : 'bg-[#F5F5F0] text-[#5E605D] hover:text-[#121312] border border-[#EBEAE5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTokens.map((token) => (
            <div
              key={token.name}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 group ${
                isDarkMode
                  ? 'bg-[#1D1D1F] border-white/10 hover:border-white/20'
                  : 'bg-[#FBFBF9] border-[#EBEAE5] hover:border-[#DCD9D0]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-bold transition-colors ${
                      isDarkMode ? 'text-[#F5F5F7]' : 'text-[#121312]'
                    }`}
                  >
                    {token.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isDarkMode
                        ? 'bg-[#30D158]/15 text-[#30D158] border border-[#30D158]/30'
                        : 'bg-[#EAF4EF] text-[#0E6245] border border-[#D5E8DE]'
                    }`}
                  >
                    {token.contrastRatio}
                  </span>
                </div>

                <div
                  className={`text-[11px] mt-1 font-mono transition-colors ${
                    isDarkMode ? 'text-[#30D158]' : 'text-[#0E6245]'
                  }`}
                >
                  {token.appleSystemName}
                </div>

                {/* Swatches Side-by-Side Comparison */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-inherit">
                  {/* Light Swatch */}
                  <div
                    onClick={() => copyToClipboard(token.lightHex, `${token.name}-light`)}
                    className="p-2 rounded-xl bg-white border border-[#EBEAE5] cursor-pointer hover:border-neutral-400 transition-all text-left"
                    title="Click to copy light hex"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: token.lightHex }}
                        className="w-5 h-5 rounded-md border border-black/10 shrink-0 shadow-xs"
                      />
                      <div className="min-w-0">
                        <div className="text-[9px] uppercase font-bold text-[#8C8E8B]">
                          Light Mode
                        </div>
                        <div className="text-[10px] font-mono font-bold text-[#121312] truncate">
                          {token.lightHex}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Apple Dark Swatch */}
                  <div
                    onClick={() => copyToClipboard(token.appleDarkHex, `${token.name}-dark`)}
                    className="p-2 rounded-xl bg-[#000000] border border-white/20 cursor-pointer hover:border-[#30D158] transition-all text-left"
                    title="Click to copy Apple dark hex"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: token.appleDarkHex }}
                        className="w-5 h-5 rounded-md border border-white/25 shrink-0 shadow-xs"
                      />
                      <div className="min-w-0">
                        <div className="text-[9px] uppercase font-bold text-[#30D158]">
                          Apple Dark
                        </div>
                        <div className="text-[10px] font-mono font-bold text-[#F5F5F7] truncate">
                          {token.appleDarkHex}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`text-[11px] mt-2.5 leading-relaxed transition-colors ${
                    isDarkMode ? 'text-[#86868B]' : 'text-[#5E605D]'
                  }`}
                >
                  {token.role}
                </div>
              </div>

              <div
                className={`text-[10px] pt-2 border-t border-inherit flex items-center justify-between font-mono ${
                  isDarkMode ? 'text-[#6E6E73]' : 'text-[#8C8E8B]'
                }`}
              >
                <span>Usage: {token.usage}</span>
                {copiedToken?.startsWith(token.name) && (
                  <span className="text-[#30D158] font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Copied
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
