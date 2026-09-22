import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard,
  Moon,
  Sun,
  Zap,
  Sparkles,
  ShieldCheck,
  Check,
  Copy,
  ArrowUpRight,
  Lock,
  Dna,
  Flame,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export interface ColorMappingToken {
  name: string;
  category: 'Canvas & Surfaces' | 'Typography' | 'Accent & Status' | 'Borders & Lines';
  lightHex: string;
  darkHex: string;
  cssVar: string;
  contrastRatio: string;
  usage: string;
  role: string;
}

export const CRED_COLOR_MAPPINGS: ColorMappingToken[] = [
  {
    name: 'Canvas Base',
    category: 'Canvas & Surfaces',
    lightHex: '#FBFBF9',
    darkHex: '#0A0B0E',
    cssVar: '--color-canvas',
    contrastRatio: '20.4:1 (AAA)',
    usage: 'App background, root viewport canvas',
    role: 'Obsidian Pitch Black depth replacing warm porcelain',
  },
  {
    name: 'Surface Pure',
    category: 'Canvas & Surfaces',
    lightHex: '#FFFFFF',
    darkHex: '#121418',
    cssVar: '--color-surface',
    contrastRatio: '18.2:1 (AAA)',
    usage: 'Primary cards, elevated modal layers, input fields',
    role: 'High-density obsidian card with 1px micro-sheen',
  },
  {
    name: 'Surface Subtle',
    category: 'Canvas & Surfaces',
    lightHex: '#F5F5F0',
    darkHex: '#181B22',
    cssVar: '--color-surface-subtle',
    contrastRatio: '15.6:1 (AAA)',
    usage: 'Secondary tags, stat wells, table headers, steppers',
    role: 'Matte slate elevation with distinct visual separation',
  },
  {
    name: 'Text Primary',
    category: 'Typography',
    lightHex: '#121312',
    darkHex: '#FFFFFF',
    cssVar: '--color-text-primary',
    contrastRatio: '18.2:1 (AAA)',
    usage: 'Display headlines, prices, critical macro numbers',
    role: 'Pure luminous white with razor-sharp readability',
  },
  {
    name: 'Text Secondary',
    category: 'Typography',
    lightHex: '#5E605D',
    darkHex: '#9EA3AE',
    cssVar: '--color-text-secondary',
    contrastRatio: '8.5:1 (AAA)',
    usage: 'Body descriptions, chef notes, secondary specs',
    role: 'Refined platinum slate maintaining soft hierarchy',
  },
  {
    name: 'Text Muted',
    category: 'Typography',
    lightHex: '#8C8E8B',
    darkHex: '#626673',
    cssVar: '--color-text-muted',
    contrastRatio: '4.8:1 (AA)',
    usage: 'Metadata, timestamps, subtle dividers, units',
    role: 'Cool graphite for zero-distraction peripheral data',
  },
  {
    name: 'Signature Accent',
    category: 'Accent & Status',
    lightHex: '#0E6245',
    darkHex: '#00E599',
    cssVar: '--color-pp-accent',
    contrastRatio: '14.1:1 (AAA)',
    usage: 'Primary buttons, active indicators, protein heroes',
    role: 'CRED Electric Neo-Mint: high-chroma biological vitality',
  },
  {
    name: 'Vibrant Vitality',
    category: 'Accent & Status',
    lightHex: '#077A55',
    darkHex: '#2EFAA8',
    cssVar: '--color-pp-accent-vibrant',
    contrastRatio: '16.3:1 (AAA)',
    usage: 'Hover states, glowing edges, focus rings',
    role: 'Hyper-vibrant mint flare for active micro-interactions',
  },
  {
    name: 'Delicate Tint',
    category: 'Accent & Status',
    lightHex: '#EAF4EF',
    darkHex: 'rgba(0, 229, 153, 0.12)',
    cssVar: '--color-pp-accent-light',
    contrastRatio: '7.2:1 (AAA)',
    usage: 'Protein tag backdrops, active filter pills, glow halos',
    role: 'Deep emerald onyx with glowing neon boundary',
  },
  {
    name: 'Deep Spruce',
    category: 'Accent & Status',
    lightHex: '#083D2A',
    darkHex: '#04271A',
    cssVar: '--color-pp-accent-dark',
    contrastRatio: '1.8:1 (Base)',
    usage: 'Active button depression, dark card interior well',
    role: 'Ultra-deep forest black providing tactile grounding',
  },
  {
    name: 'Hairline Border',
    category: 'Borders & Lines',
    lightHex: '#EBEAE5',
    darkHex: 'rgba(255, 255, 255, 0.08)',
    cssVar: '--color-border',
    contrastRatio: '1.2:1 (Subtle)',
    usage: 'Card perimeters, row separators, subtle boundaries',
    role: 'Razor-thin 1px metallic edge catching diffuse light',
  },
  {
    name: 'Strong Border',
    category: 'Borders & Lines',
    lightHex: '#DCD9D0',
    darkHex: 'rgba(255, 255, 255, 0.18)',
    cssVar: '--color-border-strong',
    contrastRatio: '1.5:1 (Defined)',
    usage: 'Active selection borders, hover boundaries, inputs',
    role: 'Luminous platinum hairline for selected elements',
  },
];

export interface CredDarkModeShowcaseProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const CredDarkModeShowcase: React.FC<CredDarkModeShowcaseProps> = ({
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cardRewardClaimed, setCardRewardClaimed] = useState<boolean>(false);

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const categories = ['All', 'Canvas & Surfaces', 'Typography', 'Accent & Status', 'Borders & Lines'] as const;

  const filteredTokens = selectedCategory === 'All'
    ? CRED_COLOR_MAPPINGS
    : CRED_COLOR_MAPPINGS.filter((t) => t.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* 1. CRED HERO BANNER & INTERACTIVE TOGGLE CARD */}
      <div
        className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden border ${
          isDarkMode
            ? 'bg-[#121418] border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)]'
            : 'bg-white border-[#EBEAE5] shadow-xs'
        }`}
      >
        {/* Subtle background ambient glow */}
        <div
          className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
            isDarkMode ? 'bg-[#00E599]/15 opacity-100' : 'bg-[#EAF4EF] opacity-80'
          }`}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-colors ${
                  isDarkMode
                    ? 'bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/30'
                    : 'bg-[#EAF4EF] text-[#0E6245] border border-[#D5E8DE]'
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>CRED LUXURY DESIGN INSPIRATION</span>
              </span>

              <span
                className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-semibold border ${
                  isDarkMode
                    ? 'bg-[#181B22] text-[#9EA3AE] border-white/10'
                    : 'bg-[#F5F5F0] text-[#5E605D] border-[#EBEAE5]'
                }`}
              >
                12 HIGH-CONTRAST MAPPED TOKENS
              </span>
            </div>

            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight transition-colors ${
                isDarkMode ? 'text-white' : 'text-[#121312]'
              }`}
            >
              High-Contrast CRED Luxury Dark Mode
            </h2>

            <p
              className={`mt-2 text-sm sm:text-base leading-relaxed transition-colors ${
                isDarkMode ? 'text-[#9EA3AE]' : 'text-[#5E605D]'
              }`}
            >
              Inspired by CRED&apos;s celebrated fintech dark aesthetic: deep obsidian pitch blacks,
              razor-sharp 1px metallic chamfers, pure luminous white typography (18.2:1 AAA contrast),
              and an electric Neo-Mint signature accent (<code className="font-mono text-xs font-bold">#00E599</code>).
              Preserves absolute visual prestige with zero muddy grays.
            </p>
          </div>

          {/* Master CRED-Style Toggle Switch */}
          <div
            className={`p-4 rounded-2xl border transition-all shrink-0 self-stretch sm:self-auto flex flex-col gap-3 ${
              isDarkMode
                ? 'bg-[#0A0B0E] border-[#00E599]/30 shadow-[0_0_24px_rgba(0,229,153,0.15)]'
                : 'bg-[#FBFBF9] border-[#EBEAE5]'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider block font-bold transition-colors ${
                    isDarkMode ? 'text-[#00E599]' : 'text-[#8C8E8B]'
                  }`}
                >
                  PALETTE CONTROLLER
                </span>
                <span
                  className={`text-sm font-bold transition-colors block ${
                    isDarkMode ? 'text-white' : 'text-[#121312]'
                  }`}
                >
                  {isDarkMode ? 'CRED Obsidian Dark' : 'Porcelain Warm Light'}
                </span>
              </div>

              {/* CRED Pill Toggle Slider */}
              <button
                type="button"
                onClick={onToggleDarkMode}
                className={`relative w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none ${
                  isDarkMode
                    ? 'bg-[#00E599] shadow-[0_0_12px_rgba(0,229,153,0.4)]'
                    : 'bg-[#EBEAE5] hover:bg-[#DCD9D0]'
                }`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to CRED Dark Mode'}
              >
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors ${
                    isDarkMode ? 'bg-[#0A0B0E] text-[#00E599] translate-x-8' : 'bg-white text-[#121312] translate-x-0'
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
              <span className={isDarkMode ? 'text-[#9EA3AE]' : 'text-[#5E605D]'}>Status:</span>
              <span
                className={`font-semibold inline-flex items-center gap-1.5 ${
                  isDarkMode ? 'text-[#00E599]' : 'text-[#0E6245]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isDarkMode
                      ? 'bg-[#00E599] animate-pulse shadow-[0_0_6px_#00E599]'
                      : 'bg-[#0E6245]'
                  }`}
                />
                {isDarkMode ? 'HIGH-CONTRAST ACTIVE' : 'LIGHT CANVAS ACTIVE'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE CRED "BLACK METAL" LUXURY CARD SHOWCASE */}
      <div
        className={`rounded-3xl p-6 sm:p-8 transition-all border ${
          isDarkMode
            ? 'bg-[#121418] border-white/10'
            : 'bg-white border-[#EBEAE5]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3
              className={`text-lg font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-[#121312]'
              }`}
            >
              CRED Aesthetic Showcase: &quot;Black Metal&quot; Reserve Card
            </h3>
            <p
              className={`text-xs transition-colors ${
                isDarkMode ? 'text-[#9EA3AE]' : 'text-[#5E605D]'
              }`}
            >
              Demonstrating pitch-black chamfered layering, holographic micro-borders, and high-chroma mint readouts.
            </p>
          </div>
          <span
            className={`text-xs font-mono px-3 py-1 rounded-full font-bold self-start sm:self-auto border ${
              isDarkMode
                ? 'bg-[#00E599]/15 text-[#00E599] border-[#00E599]/30'
                : 'bg-[#EAF4EF] text-[#0E6245] border-[#D5E8DE]'
            }`}
          >
            BIOAVAILABLE MEMBER TIER
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* CRED Obsidian Card Visual */}
          <div className="lg:col-span-7">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#181B22] via-[#0E1015] to-[#07080A] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.2)] overflow-hidden text-white group"
            >
              {/* Card Holographic Sheen Layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Neon Mint Corner Flare */}
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#00E599]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#00E599] text-[#0A0B0E] flex items-center justify-center font-black text-base shadow-[0_0_15px_rgba(0,229,153,0.4)]">
                      P
                    </div>
                    <div>
                      <div className="font-extrabold text-sm tracking-widest uppercase">
                        PROTEIN<span className="text-[#00E599]">PATH</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#9EA3AE] tracking-wider uppercase">
                        CRED BLACK METAL EDITION
                      </div>
                    </div>
                  </div>

                  {/* Contactless / Chip indicator */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-6 rounded-md bg-gradient-to-br from-amber-200/40 via-amber-400/30 to-amber-600/40 border border-amber-300/30 flex items-center justify-center p-1">
                      <div className="w-full h-full border border-amber-200/40 rounded-xs" />
                    </div>
                    <CreditCard className="w-5 h-5 text-white/70" />
                  </div>
                </div>

                {/* Macro Balance & Score */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#9EA3AE]">
                    AVAILABLE PROTEIN RESERVE
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#00E599] tracking-tight drop-shadow-[0_0_16px_rgba(0,229,153,0.3)]">
                      184.5<span className="text-xl">g</span>
                    </span>
                    <span className="text-xs font-semibold text-[#9EA3AE] bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                      Target 190g (97%)
                    </span>
                  </div>
                </div>

                {/* Card Number & Member specs */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/10">
                  <div>
                    <div className="text-[10px] font-mono text-[#626673] tracking-widest">
                      CARD MEMBER
                    </div>
                    <div className="text-sm font-semibold tracking-wider uppercase text-white mt-0.5">
                      ALEXANDER VANCE
                    </div>
                    <div className="text-[11px] font-mono text-[#9EA3AE] tracking-widest mt-0.5">
                      •••• •••• •••• 9482
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-[#626673]">BIO-SCORE</div>
                      <div className="text-sm font-mono font-bold text-[#00E599]">99.4%</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00E599]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Cred Action Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                isDarkMode
                  ? 'bg-[#181B22] border-white/10'
                  : 'bg-[#FBFBF9] border-[#EBEAE5]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-white' : 'text-[#121312]'
                  }`}
                >
                  Daily Macro Reward
                </span>
                <span className="text-xs font-mono font-bold text-[#00E599] bg-[#00E599]/15 px-2 py-0.5 rounded-full border border-[#00E599]/30">
                  +350 CRED COINS
                </span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDarkMode ? 'text-[#9EA3AE]' : 'text-[#5E605D]'
                }`}
              >
                Achieved target bioavailable leucine threshold (3.2g) across pasture-raised meals today.
              </p>

              <button
                type="button"
                onClick={() => setCardRewardClaimed(true)}
                disabled={cardRewardClaimed}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  cardRewardClaimed
                    ? 'bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/40 cursor-default'
                    : 'bg-[#00E599] hover:bg-[#2EFAA8] text-[#0A0B0E] shadow-[0_4px_16px_rgba(0,229,153,0.3)]'
                }`}
              >
                {cardRewardClaimed ? (
                  <>
                    <Check className="w-4 h-4 text-[#00E599]" />
                    <span>Reward Credited to Reserve</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Claim via CRED 1-Tap</span>
                  </>
                )}
              </button>
            </div>

            <div
              className={`p-4 rounded-2xl border text-xs space-y-2 ${
                isDarkMode
                  ? 'bg-[#121418] border-white/10 text-[#9EA3AE]'
                  : 'bg-white border-[#EBEAE5] text-[#5E605D]'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00E599] shrink-0" />
                <span className="font-bold text-white">High-Contrast Micro-Bevels</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                CRED-inspired interfaces utilize 1px semi-transparent borders (<code className="font-mono">rgba(255,255,255,0.08)</code>)
                coupled with subtle top-edge specular catches to render metallic density without adding visual clutter.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LIGHT TO DARK TOKEN MAPPING SPECIFICATION MATRIX */}
      <div
        className={`rounded-3xl p-6 sm:p-8 transition-all border space-y-6 ${
          isDarkMode
            ? 'bg-[#121418] border-white/10'
            : 'bg-white border-[#EBEAE5]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-inherit">
          <div>
            <h3
              className={`text-lg font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-[#121312]'
              }`}
            >
              Light to CRED Dark Palette Mapping Matrix
            </h3>
            <p
              className={`text-xs transition-colors ${
                isDarkMode ? 'text-[#9EA3AE]' : 'text-[#5E605D]'
              }`}
            >
              Exact semantic translations, contrast verification, and live hex copying for design tokens.
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
                      ? 'bg-[#00E599] text-[#0A0B0E] font-bold shadow-xs'
                      : 'bg-[#0E6245] text-white'
                    : isDarkMode
                    ? 'bg-[#181B22] text-[#9EA3AE] hover:text-white border border-white/10'
                    : 'bg-[#F5F5F0] text-[#5E605D] hover:text-[#121312] border border-[#EBEAE5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTokens.map((token) => (
            <div
              key={token.name}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 group ${
                isDarkMode
                  ? 'bg-[#181B22] border-white/10 hover:border-white/20'
                  : 'bg-[#FBFBF9] border-[#EBEAE5] hover:border-[#DCD9D0]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-bold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-[#121312]'
                    }`}
                  >
                    {token.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isDarkMode
                        ? 'bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/30'
                        : 'bg-[#EAF4EF] text-[#0E6245] border border-[#D5E8DE]'
                    }`}
                  >
                    {token.contrastRatio}
                  </span>
                </div>

                <div
                  className={`text-[11px] mt-1 font-mono transition-colors ${
                    isDarkMode ? 'text-[#00E599]' : 'text-[#0E6245]'
                  }`}
                >
                  {token.cssVar}
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

                  {/* Dark Swatch */}
                  <div
                    onClick={() => copyToClipboard(token.darkHex, `${token.name}-dark`)}
                    className="p-2 rounded-xl bg-[#0A0B0E] border border-white/15 cursor-pointer hover:border-[#00E599] transition-all text-left"
                    title="Click to copy CRED dark hex"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: token.darkHex }}
                        className="w-5 h-5 rounded-md border border-white/20 shrink-0 shadow-xs"
                      />
                      <div className="min-w-0">
                        <div className="text-[9px] uppercase font-bold text-[#00E599]">
                          CRED Dark
                        </div>
                        <div className="text-[10px] font-mono font-bold text-white truncate">
                          {token.darkHex}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`text-[11px] mt-2.5 leading-relaxed transition-colors ${
                    isDarkMode ? 'text-[#9EA3AE]' : 'text-[#5E605D]'
                  }`}
                >
                  {token.role}
                </div>
              </div>

              <div
                className={`text-[10px] pt-2 border-t border-inherit flex items-center justify-between font-mono ${
                  isDarkMode ? 'text-[#626673]' : 'text-[#8C8E8B]'
                }`}
              >
                <span>Usage: {token.usage}</span>
                {copiedToken?.startsWith(token.name) && (
                  <span className="text-[#00E599] font-bold flex items-center gap-0.5">
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
