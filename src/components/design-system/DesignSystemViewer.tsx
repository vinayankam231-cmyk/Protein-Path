import React, { useState } from 'react';
import {
  Button,
  PrimaryButton,
  SecondaryButton,
} from '../ui/Button';
import {
  LargeHeading,
  SectionHeading,
  Subheading,
  BodyText,
  SecondaryText,
  NutritionNumber,
  ButtonText,
} from '../ui/Typography';
import { Price } from '../ui/Price';
import { RatingBadge } from '../ui/RatingBadge';
import { NutritionBadge, NutritionRibbon } from '../ui/NutritionBadge';
import { CategoryChip, FilterChip } from '../ui/Chips';
import { QuantitySelector } from '../ui/QuantitySelector';
import { SearchBar } from '../ui/SearchBar';
import { SectionHeader } from '../ui/SectionHeader';
import { FoodCard } from '../ui/FoodCard';
import { RestaurantCard } from '../ui/RestaurantCard';
import { NavigationBar } from '../ui/NavigationBar';
import { CartAndCheckout } from '../checkout/CartAndCheckout';
import { NutritionDetailModal } from '../ui/NutritionDetailModal';
import { RestaurantProfile } from '../restaurant/RestaurantProfile';
import { CategorySlider } from '../home/CategorySlider';
import { QuickFiltersRow, QuickFilterState } from '../home/QuickFiltersRow';
import { ExploreMoreSection } from '../home/ExploreMoreSection';
import { FOOD_ITEMS, RESTAURANTS } from '../../data/mockData';
import { AppleDarkModeShowcase } from './AppleDarkModeShowcase';
import { CredDarkModeShowcase } from './CredDarkModeShowcase';
import { MotionSpecViewer } from './MotionSpecViewer';
import {
  Palette,
  Type,
  LayoutGrid,
  Dna,
  Layers,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Flame,
  Wheat,
  Droplets,
  Leaf,
  ShieldCheck,
  Moon,
  Sun,
  Zap,
} from 'lucide-react';

export const DesignSystemViewer: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('colors');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [darkStyle, setDarkStyle] = useState<'apple' | 'cred'>('apple');

  // Interactive component states for playground
  const [testQuantity, setTestQuantity] = useState<number>(2);
  const [testSearch, setTestSearch] = useState<string>('');
  const [testCategory, setTestCategory] = useState<string>('high-protein');
  const [testQuickFilters, setTestQuickFilters] = useState<QuickFilterState>({
    filtersOpen: false,
    nearAndFast: true,
    noDeliveryFees: false,
  });
  const [testFilter, setTestFilter] = useState<boolean>(true);
  const [testNavTab, setTestNavTab] = useState<any>('discover');
  const [showNutritionModal, setShowNutritionModal] = useState<boolean>(false);

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const COLOR_TOKENS = [
    {
      category: 'Canvas & Backgrounds',
      description: 'Warm white / off-white palette conveying pure porcelain luxury and culinary warmth',
      swatches: [
        { name: 'Canvas Base', hex: '#FBFBF9', css: '--color-canvas', usage: 'Main app screen backdrop, clean organic feel' },
        { name: 'Surface Pure', hex: '#FFFFFF', css: '--color-surface', usage: 'Card surfaces, input boxes, modal overlays' },
        { name: 'Surface Subtle', hex: '#F5F5F0', css: '--color-surface-subtle', usage: 'Steppers, tags, badge backings, table striping' },
      ],
    },
    {
      category: 'Charcoal & Typography',
      description: 'Deep obsidian and refined warm slates replacing harsh pure black',
      swatches: [
        { name: 'Charcoal Obsidian', hex: '#121312', css: '--color-text-primary', usage: 'Primary headlines, prices, critical emphasis' },
        { name: 'Refined Slate', hex: '#5E605D', css: '--color-text-secondary', usage: 'Body descriptions, chefs notes, ingredient lists' },
        { name: 'Whisper Gray', hex: '#8C8E8B', css: '--color-text-muted', usage: 'Metadata, timestamps, subtle dividers, units' },
      ],
    },
    {
      category: 'Signature ProteinPath Accent',
      description: 'The single distinctive botanical vitality green representing living nutrition and quiet luxury',
      swatches: [
        { name: 'Botanical Emerald', hex: '#0E6245', css: '--color-pp-accent', usage: 'Primary buttons, active states, key protein badges' },
        { name: 'Vibrant Vitality', hex: '#077A55', css: '--color-pp-accent-vibrant', usage: 'Hover states, high-priority pulses, focus rings' },
        { name: 'Delicate Tint', hex: '#EAF4EF', css: '--color-pp-accent-light', usage: 'Protein tag backdrops, active filter chips' },
        { name: 'Deep Spruce', hex: '#083D2A', css: '--color-pp-accent-dark', usage: 'Active button press, dark card accents' },
      ],
    },
    {
      category: 'Borders & Structure',
      description: 'Subtle 1px warm borders providing architectural definition without harsh outlines',
      swatches: [
        { name: 'Hairline Border', hex: '#EBEAE5', css: '--color-border', usage: 'Standard card borders, row dividers, input rings' },
        { name: 'Strong Border', hex: '#DCD9D0', css: '--color-border-strong', usage: 'Hovered card borders, active input boundaries' },
      ],
    },
  ];

  return (
    <div className={`w-full max-w-6xl mx-auto space-y-12 pb-24 transition-colors duration-300 ${
      isDarkMode ? (darkStyle === 'apple' ? 'apple-dark' : 'cred-dark') : ''
    }`}>
      {/* Design System Manifesto & Header */}
      <section className="bg-white rounded-3xl border border-[#EBEAE5] p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 bg-[#EAF4EF] text-[#0E6245] px-3 py-1 rounded-full text-xs font-bold border border-[#D5E8DE]">
              <Sparkles className="w-3.5 h-3.5 text-[#0E6245]" />
              <span>PROTEINPATH FOUNDATIONAL DESIGN SYSTEM v1.0</span>
            </div>

            {/* Header Dark Mode Quick Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                  isDarkMode
                    ? darkStyle === 'apple'
                      ? 'bg-[#30D158] text-[#000000] shadow-[0_0_16px_rgba(48,209,88,0.4)]'
                      : 'bg-[#00E599] text-[#0A0B0E] shadow-[0_0_16px_rgba(0,229,153,0.35)]'
                    : 'bg-[#121312] text-white hover:bg-black'
                }`}
                title="Toggle High-Contrast Luxury Dark Palette"
              >
                {isDarkMode ? <Moon className="w-3.5 h-3.5 fill-current" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                <span>
                  {isDarkMode
                    ? darkStyle === 'apple'
                      ? 'APPLE DARK: ACTIVE'
                      : 'CRED DARK: ACTIVE'
                    : 'SWITCH TO DARK'}
                </span>
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#121312] leading-[1.15]">
            Nutrition-First Luxury Food Marketplace
          </h1>

          <p className="mt-3 text-base sm:text-lg text-[#5E605D] leading-relaxed">
            ProteinPath fuses high-end wellness living with modern culinary delivery.
            Engineered with a warm porcelain palette, obsidian typography, and our signature
            Botanical Emerald accent—providing athletes and health-conscious individuals with
            clinical nutritional clarity packaged in quiet luxury.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#EBEAE5]">
            <div>
              <span className="text-xs uppercase font-bold text-[#8C8E8B] tracking-wider block">
                Visual Personality
              </span>
              <span className="text-sm font-semibold text-[#121312] mt-0.5 block">
                Calm, Confident, Modern
              </span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-[#8C8E8B] tracking-wider block">
                Grid & Spacing
              </span>
              <span className="text-sm font-semibold text-[#121312] mt-0.5 block">
                4pt / 8pt Strict Rhythm
              </span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-[#8C8E8B] tracking-wider block">
                Signature Accent
              </span>
              <span className="text-sm font-semibold text-[#0E6245] mt-0.5 block">
                Botanical Emerald #0E6245
              </span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-[#8C8E8B] tracking-wider block">
                Dark Mode Standard
              </span>
              <span className="text-sm font-semibold text-[#30D158] mt-0.5 block">
                Apple Website Pro (21:1 AAA)
              </span>
            </div>
          </div>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#EAF4EF]/60 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Navigation Sub-bar for Design System Specs */}
      <div className="sticky top-4 z-30 bg-white/90 backdrop-blur-md rounded-2xl border border-[#EBEAE5] p-1.5 shadow-sm flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 shrink-0">
          {[
            { id: 'dark-palette', label: 'Dark Palette (Apple & CRED)', icon: Moon },
            { id: 'colors', label: 'Color System', icon: Palette },
            { id: 'typography', label: 'Typography Scale', icon: Type },
            { id: 'nutrition', label: 'Nutrition Micro-System', icon: Dna },
            { id: 'components', label: 'Reusable Components', icon: LayoutGrid },
            { id: 'spacing', label: 'Spacing & Elevation', icon: Layers },
            { id: 'motion', label: 'Motion & Physics', icon: Zap },
          ].map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => {
                  setActiveSection(sec.id);
                  document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`
                  flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer
                  ${
                    isActive
                      ? 'bg-[#0E6245] text-white shadow-xs'
                      : 'text-[#5E605D] hover:text-[#121312] hover:bg-[#F5F5F0]'
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sticky Quick Theme Toggle */}
        <div className="pl-2 border-l border-inherit shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isDarkMode
                ? darkStyle === 'apple'
                  ? 'bg-[#30D158] text-[#000000] shadow-[0_0_12px_rgba(48,209,88,0.4)]'
                  : 'bg-[#00E599] text-[#0A0B0E] shadow-[0_0_12px_rgba(0,229,153,0.35)]'
                : 'bg-[#121312] text-white hover:bg-black'
            }`}
            title="Toggle between Porcelain Light and High-Contrast Dark"
          >
            {isDarkMode ? <Moon className="w-3.5 h-3.5 fill-current" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">
              {isDarkMode ? (darkStyle === 'apple' ? 'APPLE DARK' : 'CRED DARK') : 'LIGHT'}
            </span>
          </button>
        </div>
      </div>

      {/* 0. HIGH-CONTRAST DARK PALETTE SPEC & MATRIX (Apple Website Standard) */}
      <section id="dark-palette" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SectionHeader
            title={darkStyle === 'apple' ? 'Apple Website High-Contrast Dark Palette' : 'CRED-Inspired High-Contrast Dark Palette'}
            subtitle={darkStyle === 'apple'
              ? 'True #000000 pitch black canvas, #161617 titanium bento surfaces, 19.5:1 AAA SF Pro typography, and Apple Health green #30D158'
              : 'Precision mapping of warm porcelain colors to deep obsidian pitch black, 18.2:1 AAA typography, and electric Neo-Mint'}
            badge={darkStyle === 'apple' ? 'Apple Website Standard' : 'CRED Luxury Standard'}
          />

          {/* Aesthetic Toggle between Apple Website and CRED */}
          <div className="flex items-center p-1 rounded-full border self-start sm:self-auto text-xs font-semibold bg-[#F5F5F0] border-[#EBEAE5]">
            <button
              type="button"
              onClick={() => setDarkStyle('apple')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                darkStyle === 'apple'
                  ? 'bg-[#121312] text-white font-bold shadow-xs'
                  : 'text-[#5E605D] hover:text-[#121312]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#30D158]" />
              <span>Apple Website Style</span>
            </button>

            <button
              type="button"
              onClick={() => setDarkStyle('cred')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                darkStyle === 'cred'
                  ? 'bg-[#121312] text-white font-bold shadow-xs'
                  : 'text-[#5E605D] hover:text-[#121312]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#00E599]" />
              <span>CRED Style</span>
            </button>
          </div>
        </div>

        {darkStyle === 'apple' ? (
          <AppleDarkModeShowcase
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        ) : (
          <CredDarkModeShowcase
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        )}
      </section>

      {/* 1. COLOR SYSTEM SPEC */}
      <section id="colors" className="space-y-6 scroll-mt-24">
        <SectionHeader
          title="Color System & Tokens"
          subtitle="Warm white backdrop, obsidian charcoal text, and ONE distinctive ProteinPath accent"
          badge="WCAG AAA Compliant"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COLOR_TOKENS.map((group) => (
            <div
              key={group.category}
              className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-[#121312]">{group.category}</h3>
                <p className="text-xs text-[#5E605D] mt-0.5 mb-4">{group.description}</p>

                <div className="space-y-2.5">
                  {group.swatches.map((swatch) => (
                    <div
                      key={swatch.name}
                      onClick={() => copyToClipboard(swatch.hex, swatch.name)}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-[#EBEAE5] hover:border-[#DCD9D0] bg-[#FBFBF9] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          style={{ backgroundColor: swatch.hex }}
                          className="w-10 h-10 rounded-lg border border-black/10 shrink-0 shadow-inner"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#121312] flex items-center gap-1.5">
                            <span>{swatch.name}</span>
                            <span className="text-[10px] text-[#8C8E8B] font-mono">
                              {swatch.hex}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#5E605D] mt-0.5">
                            {swatch.usage}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="text-xs text-[#8C8E8B] group-hover:text-[#0E6245] p-1.5 rounded-lg hover:bg-white transition-colors"
                        title="Copy hex code"
                      >
                        {copiedToken === swatch.name ? (
                          <Check className="w-4 h-4 text-[#0E6245]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TYPOGRAPHY SCALE SPEC */}
      <section id="typography" className="space-y-6 scroll-mt-24">
        <SectionHeader
          title="Typography Hierarchy"
          subtitle="Set in Plus Jakarta Sans with tabular numerical alignment for macros and pricing"
          badge="7 Distinct Roles"
        />

        <div className="bg-white rounded-2xl border border-[#EBEAE5] p-6 shadow-xs space-y-6 divide-y divide-[#EBEAE5]">
          {/* Large Heading */}
          <div className="pt-2 first:pt-0">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C8E8B]">
                Large Heading (Display / Hero) • 28–32px / Bold / -0.02em
              </span>
              <span className="text-xs font-mono text-[#5E605D]">&lt;LargeHeading /&gt;</span>
            </div>
            <LargeHeading>Nutritionist-Crafted Bioavailable Gastronomy</LargeHeading>
          </div>

          {/* Section Heading */}
          <div className="pt-5">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C8E8B]">
                Section Heading • 18–20px / Semibold / -0.015em
              </span>
              <span className="text-xs font-mono text-[#5E605D]">&lt;SectionHeading /&gt;</span>
            </div>
            <SectionHeading>Daily High-Protein Curations</SectionHeading>
          </div>

          {/* Body Text */}
          <div className="pt-5">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C8E8B]">
                Body Text • 15–16px / Regular / 1.6 Line-Height
              </span>
              <span className="text-xs font-mono text-[#5E605D]">&lt;BodyText /&gt;</span>
            </div>
            <BodyText>
              Every meal on ProteinPath undergoes rigorous nutritional profiling.
              We calibrate the protein-to-calorie ratio to guarantee maximum muscular synthesis
              without excess inflammatory additives or refined seed oils.
            </BodyText>
          </div>

          {/* Secondary Text */}
          <div className="pt-5">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C8E8B]">
                Secondary Text • 13–14px / Regular / Slate #5E605D
              </span>
              <span className="text-xs font-mono text-[#5E605D]">&lt;SecondaryText /&gt;</span>
            </div>
            <SecondaryText>
              Delivered fresh within 25 minutes in temperature-monitored recyclable insulation.
            </SecondaryText>
          </div>

          {/* Prices & Nutrition Numbers Showcase */}
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C8E8B]">
                  Price Typography (Tabular, Baselines)
                </span>
                <span className="text-xs font-mono text-[#5E605D]">&lt;Price /&gt;</span>
              </div>
              <div className="flex items-center gap-4">
                <Price amount={26.50} originalAmount={29.00} size="lg" />
                <Price amount={19.00} size="md" unit="portion" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C8E8B]">
                  Nutrition Number (Tabular, Emerald Highlight)
                </span>
                <span className="text-xs font-mono text-[#5E605D]">&lt;NutritionNumber /&gt;</span>
              </div>
              <div className="flex items-center gap-5">
                <NutritionNumber value={52} unit="g" label="Protein" isHero />
                <NutritionNumber value={540} unit="kcal" label="Calories" />
                <NutritionNumber value={9} unit="g" label="Fiber" />
              </div>
            </div>
          </div>

          {/* Button Text */}
          <div className="pt-5">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C8E8B]">
                Button Typography • 14–16px / Semibold / +0.01em Tracking
              </span>
              <span className="text-xs font-mono text-[#5E605D]">&lt;ButtonText /&gt;</span>
            </div>
            <div className="flex items-center gap-3">
              <ButtonText size="sm" className="text-[#0E6245]">Small Action (12px)</ButtonText>
              <ButtonText size="md" className="text-[#121312]">Medium Standard (14px)</ButtonText>
              <ButtonText size="lg" className="text-[#121312]">Large Call-to-Action (16px)</ButtonText>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NUTRITION MICRO-SYSTEM */}
      <section id="nutrition" className="space-y-6 scroll-mt-24">
        <SectionHeader
          title="Nutrition Micro-Design System"
          subtitle="Compact, zero-clutter nutrition displays for Calories, Protein, Carbs, Fat, and Fiber"
          badge="Integrated Brand Identity"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Individual Compact Nutrition Badges */}
          <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#121312]">
              Compact Nutrient Badges
            </h3>
            <p className="text-xs text-[#5E605D]">
              Individual glyph-reinforced pills for instant cognitive parsing. Protein is given distinct visual priority with our Botanical Emerald tint.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <NutritionBadge type="protein" value={48} highlight />
              <NutritionBadge type="calories" value={540} />
              <NutritionBadge type="carbs" value={22} />
              <NutritionBadge type="fat" value={18} />
              <NutritionBadge type="fiber" value={9} />
            </div>

            <div className="pt-3 border-t border-[#EBEAE5]">
              <span className="text-xs font-semibold text-[#8C8E8B] block mb-2">
                Size Variants (sm, md, lg):
              </span>
              <div className="flex items-center gap-2">
                <NutritionBadge type="protein" value={48} size="sm" />
                <NutritionBadge type="protein" value={48} size="md" />
                <NutritionBadge type="protein" value={48} size="lg" />
              </div>
            </div>
          </div>

          {/* Complete 5-Macro Ribbon & Split */}
          <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#121312]">
              Macro Ribbon & Energy Split
            </h3>
            <p className="text-xs text-[#5E605D]">
              A compact 5-column grid featuring proportional energy distribution bar that immediately reveals protein density.
            </p>

            <NutritionRibbon
              macros={{
                protein: 52,
                calories: 490,
                carbs: 20,
                fat: 14,
                fiber: 8,
              }}
            />

            <div className="pt-2 text-xs text-[#5E605D] flex items-center justify-between">
              <span>Minimal Inline Variant:</span>
              <NutritionRibbon
                macros={{
                  protein: 52,
                  calories: 490,
                  carbs: 20,
                  fat: 14,
                  fiber: 8,
                }}
                variant="minimal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. REUSABLE COMPONENTS GALLERY */}
      <section id="components" className="space-y-6 scroll-mt-24">
        <SectionHeader
          title="Reusable Component Suite"
          subtitle="Standardized building blocks engineered for consistent mobile screens"
          badge="13 Core Components"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary & Secondary Buttons */}
          <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#121312]">Buttons & Actions</h3>
              <p className="text-xs text-[#5E605D] mt-0.5">
                Primary Botanical Emerald, Luxury Muted Stone Secondary, and Obsidian
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <PrimaryButton size="md">Add to Cart</PrimaryButton>
              <SecondaryButton size="md">View Nutrition</SecondaryButton>
              <Button variant="dark" size="md">Track Order</Button>
              <Button variant="accent-soft" size="md">Filter Macros</Button>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-[#8C8E8B] block">States:</span>
              <div className="flex flex-wrap gap-2">
                <PrimaryButton size="sm" isLoading>Loading</PrimaryButton>
                <PrimaryButton size="sm" disabled>Disabled</PrimaryButton>
                <PrimaryButton size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  With Icon
                </PrimaryButton>
              </div>
            </div>
          </div>

          {/* Search Bar Component */}
          <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#121312]">Search Bar</h3>
              <p className="text-xs text-[#5E605D] mt-0.5">
                Integrated macro filtering trigger, active clear, and smooth focus states
              </p>
            </div>

            <SearchBar
              value={testSearch}
              onChange={setTestSearch}
              onFilterClick={() => setTestFilter(!testFilter)}
              filterActive={testFilter}
              placeholder="Try: >40g protein salmon bowl..."
            />

            <div className="text-xs text-[#5E605D] flex items-center justify-between">
              <span>Interactive input state:</span>
              <span className="font-mono text-[#0E6245]">
                {testSearch ? `"${testSearch}"` : '(empty query)'}
              </span>
            </div>
          </div>

          {/* Category & Filter Chips */}
          <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#121312]">Chips (Category & Filter)</h3>
              <p className="text-xs text-[#5E605D] mt-0.5">
                Pill tags with iconography, count badges, and target protein benchmarks
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-[#8C8E8B] block mb-1.5">
                  Category Chips:
                </span>
                <div className="flex flex-wrap gap-2">
                  <CategoryChip
                    id="high-protein"
                    label="High Protein"
                    iconName="Flame"
                    targetProtein="45g+"
                    selected={testCategory === 'high-protein'}
                    onClick={() => setTestCategory('high-protein')}
                  />
                  <CategoryChip
                    id="wild-seafood"
                    label="Wild Seafood"
                    iconName="Fish"
                    targetProtein="38g+"
                    selected={testCategory === 'wild-seafood'}
                    onClick={() => setTestCategory('wild-seafood')}
                  />
                  <CategoryChip
                    id="plant-muscle"
                    label="Plant Muscle"
                    iconName="Leaf"
                    targetProtein="32g+"
                    selected={testCategory === 'plant-muscle'}
                    onClick={() => setTestCategory('plant-muscle')}
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#8C8E8B] block mb-1.5">
                  Filter Chips (Active & Inactive):
                </span>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    id="p40"
                    label=">45g Protein"
                    active={testFilter}
                    count={14}
                    onClick={() => setTestFilter(!testFilter)}
                  />
                  <FilterChip
                    id="cal"
                    label="<500 kcal"
                    active={false}
                    count={8}
                  />
                  <FilterChip
                    id="fib"
                    label="High Fiber"
                    active={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Luxury Image-Based Category Slider */}
          <div className="bg-[#000000] rounded-2xl border border-white/10 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#F5F5F7]">
                    Image-Based Category Slider
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#30D158]/15 text-[#30D158] border border-[#30D158]/30">
                    #30D158 Active Accent
                  </span>
                </div>
                <p className="text-xs text-[#86868B] mt-0.5">
                  64x64px circular culinary photography, centered typography, and 2px emerald underline
                </p>
              </div>
            </div>

            <div className="pt-2 bg-[#000000] rounded-xl border border-white/5 py-4 overflow-hidden">
              <CategorySlider
                selectedCategory={testCategory}
                onSelectCategory={(id) => setTestCategory(id)}
              />
            </div>
          </div>

          {/* Minimal Luxury Quick Filters Row */}
          <div className="bg-[#000000] rounded-2xl border border-white/10 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#F5F5F7]">
                    Quick Filters Row
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#121214] text-[#F5F5F7] border border-white/10">
                    #121214 Charcoal Pills
                  </span>
                </div>
                <p className="text-xs text-[#86868B] mt-0.5">
                  Filters (slider icon), Near & Fast (emerald lightning), and No delivery fees pills
                </p>
              </div>
            </div>

            <div className="pt-2 bg-[#000000] rounded-xl border border-white/5 py-3 overflow-hidden">
              <QuickFiltersRow
                filters={testQuickFilters}
                onToggleFilter={(key) =>
                  setTestQuickFilters((prev) => ({ ...prev, [key]: !prev[key] }))
                }
              />
            </div>
          </div>

          {/* Minimal Luxury Explore More Bento Cards */}
          <div className="bg-[#000000] rounded-2xl border border-white/10 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#F5F5F7]">
                    Explore More (Titanium Bento 120x140px)
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#161617] text-[#30D158] border border-white/10">
                    #161617 Bento
                  </span>
                </div>
                <p className="text-xs text-[#86868B] mt-0.5">
                  Subscriptions, Exclusive Offers, Travel Dining, and Group Events cards with 16px radius
                </p>
              </div>
            </div>

            <div className="pt-2 bg-[#000000] rounded-xl border border-white/5 py-3 overflow-hidden">
              <ExploreMoreSection />
            </div>
          </div>

          {/* Quantity Selector & Rating Badge */}
          <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#121312]">
                Quantity Selector & Rating Badge
              </h3>
              <p className="text-xs text-[#5E605D] mt-0.5">
                Zero-state add transition, tactile stepper buttons, and calm star rating
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#8C8E8B] block">Interactive Stepper:</span>
                <QuantitySelector
                  quantity={testQuantity}
                  onIncrement={() => setTestQuantity((q) => q + 1)}
                  onDecrement={() => setTestQuantity((q) => Math.max(0, q - 1))}
                  size="md"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#8C8E8B] block">Zero State (Add):</span>
                <QuantitySelector
                  quantity={0}
                  onIncrement={() => setTestQuantity(1)}
                  onDecrement={() => {}}
                  size="md"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#EBEAE5] space-y-2">
              <span className="text-xs font-semibold text-[#8C8E8B] block">Rating Badges:</span>
              <div className="flex items-center gap-3">
                <RatingBadge score={4.94} reviewCount={428} variant="solid" />
                <RatingBadge score={4.85} reviewCount={192} variant="outline" />
                <RatingBadge score={5.0} variant="minimal" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Header Component Demonstration */}
        <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#8C8E8B] block mb-3">
            Section Header Component (&lt;SectionHeader /&gt;):
          </span>
          <SectionHeader
            title="Bioavailable Protein Bowls"
            subtitle="Formulated with complete amino acid balance"
            badge="Laboratory Verified"
            actionText="See all (18)"
            onActionClick={() => alert('View all clicked')}
          />
        </div>

        {/* Navigation Bar Preview */}
        <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8C8E8B]">
              Mobile Bottom Navigation Bar (&lt;NavigationBar /&gt;):
            </span>
            <span className="text-xs font-mono text-[#0E6245]">
              Active: {testNavTab} • Cart count: {testQuantity}
            </span>
          </div>
          <div className="border border-[#EBEAE5] rounded-2xl overflow-hidden shadow-xs">
            <NavigationBar
              activeTab={testNavTab}
              onTabChange={setTestNavTab}
              cartCount={testQuantity}
              totalProteinGrams={testQuantity * 48}
            />
          </div>
        </div>

        {/* Full Card Demos (Restaurant & Food Card) */}
        <div className="space-y-4">
          <SectionHeader
            title="Card Components in Context"
            subtitle="Full-scale Restaurant Card and Food Card showcasing integrated nutrition"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-xs font-bold text-[#8C8E8B] uppercase tracking-wider block mb-2">
                Restaurant Card
              </span>
              <RestaurantCard restaurant={RESTAURANTS[0]} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#8C8E8B] uppercase tracking-wider block">
                  Food Card (Vertical)
                </span>
                <button
                  type="button"
                  onClick={() => setShowNutritionModal(true)}
                  className="text-xs text-[#30D158] hover:underline font-semibold cursor-pointer"
                >
                  Open Nutrition Modal →
                </button>
              </div>
              <FoodCard
                item={FOOD_ITEMS[0]}
                quantity={testQuantity}
                onIncrement={() => setTestQuantity((q) => q + 1)}
                onDecrement={() => setTestQuantity((q) => Math.max(0, q - 1))}
                onClickDetail={() => setShowNutritionModal(true)}
              />
            </div>
          </div>
        </div>

        {/* Nutrition Detail Modal Instance */}
        <NutritionDetailModal
          item={showNutritionModal ? FOOD_ITEMS[0] : null}
          quantity={testQuantity}
          onClose={() => setShowNutritionModal(false)}
          onIncrement={() => setTestQuantity((q) => q + 1)}
          onDecrement={() => setTestQuantity((q) => Math.max(0, q - 1))}
        />

        {/* Cart & Checkout Component Showcase */}
        <div className="space-y-4 pt-4">
          <SectionHeader
            title="Cart & Checkout Component"
            subtitle="Minimal luxury bag view with pitch-black #000000 styling, macro line, delivery card, right-aligned summary, and sticky emerald CTA"
            badge="New Component"
          />

          <div className="max-w-sm mx-auto rounded-3xl overflow-hidden border border-white/[0.12] shadow-2xl h-[680px]">
            <CartAndCheckout
              cartItems={[
                { foodItem: FOOD_ITEMS[0], quantity: 1 },
                { foodItem: FOOD_ITEMS[1], quantity: 1 },
              ]}
              deliveryAddress="482 Broome St, SoHo, NY"
              estimatedTime="25–35 mins"
            />
          </div>
        </div>

        {/* Restaurant Profile Page Showcase */}
        <div className="space-y-4 pt-6">
          <SectionHeader
            title="Restaurant Profile Page"
            subtitle="Cinematic fading cover photo, verified rating & cuisine tags, muted info pill, sticky horizontal categories, and minimal food card grid"
            badge="New Page"
          />

          <div className="max-w-md mx-auto rounded-3xl overflow-hidden border border-white/[0.12] shadow-2xl h-[760px] flex flex-col bg-black">
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <RestaurantProfile
                restaurant={RESTAURANTS[0]}
                menuItems={FOOD_ITEMS}
                cartQuantityMap={{ 'food-1': 1 }}
                onClickDetail={() => setShowNutritionModal(true)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. SPACING, RADII & DEPTH SPEC */}
      <section id="spacing" className="space-y-6 scroll-mt-24">
        <SectionHeader
          title="Spacing, Radii & Depth Foundations"
          subtitle="4pt/8pt rhythm, mathematical nested corner radii, and ambient shadow tokens"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 4/8pt Spacing Grid */}
          <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#121312]">4/8pt Spacing Grid</h3>
            <p className="text-xs text-[#5E605D]">
              All components, paddings, and margins adhere to multiples of 4 and 8.
            </p>

            <div className="space-y-2 pt-2">
              {[
                { name: 'Micro (p-1)', size: '4px', w: 'w-4' },
                { name: 'Compact (p-2)', size: '8px', w: 'w-8' },
                { name: 'Default (p-3)', size: '12px', w: 'w-12' },
                { name: 'Standard (p-4)', size: '16px', w: 'w-16' },
                { name: 'Generous (p-6)', size: '24px', w: 'w-24' },
                { name: 'Structural (p-8)', size: '32px', w: 'w-32' },
              ].map((sp) => (
                <div key={sp.name} className="flex items-center justify-between text-xs">
                  <span className="text-[#5E605D]">{sp.name}</span>
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 bg-[#0E6245] rounded-sm ${sp.w}`} />
                    <span className="font-mono text-[#8C8E8B] w-10 text-right">{sp.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Corner Radii */}
          <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#121312]">Corner Radii</h3>
            <p className="text-xs text-[#5E605D]">
              Refined geometric curves that balance modern softness with structural precision.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#121312]">Tags & Badges</div>
                  <div className="text-[11px] text-[#5E605D]">rounded-lg (8px)</div>
                </div>
                <div className="w-12 h-8 rounded-lg bg-[#EAF4EF] border border-[#0E6245]/30 flex items-center justify-center text-[10px] font-bold text-[#0E6245]">
                  8px
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#121312]">Cards & Modals</div>
                  <div className="text-[11px] text-[#5E605D]">rounded-2xl (16px)</div>
                </div>
                <div className="w-12 h-10 rounded-2xl bg-[#F5F5F0] border border-[#EBEAE5] flex items-center justify-center text-[10px] font-bold text-[#121312]">
                  16px
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#121312]">Buttons & Pills</div>
                  <div className="text-[11px] text-[#5E605D]">rounded-full (9999px)</div>
                </div>
                <div className="w-16 h-8 rounded-full bg-[#0E6245] text-white flex items-center justify-center text-[10px] font-bold">
                  Pill
                </div>
              </div>
            </div>
          </div>

          {/* Elevation & Shadows */}
          <div className="bg-white rounded-2xl border border-[#EBEAE5] p-5 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#121312]">Soft Natural Depth</h3>
            <p className="text-xs text-[#5E605D]">
              Subtle ambient shadows mimicking diffused morning light, completely avoiding harsh artificial dark drops.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-[#EBEAE5] shadow-xs text-xs text-[#5E605D] flex justify-between items-center">
                <span>Subtle Card (shadow-xs)</span>
                <span className="font-mono text-[10px] text-[#8C8E8B]">0 1px 2px</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EBEAE5] shadow-[0_4px_16px_-2px_rgba(0,0,0,0.05)] text-xs text-[#121312] font-semibold flex justify-between items-center">
                <span>Elevated (shadow-md)</span>
                <span className="font-mono text-[10px] text-[#8C8E8B]">0 4px 16px</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EBEAE5] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.08)] text-xs text-[#0E6245] font-bold flex justify-between items-center">
                <span>Floating Modal / Drawer</span>
                <span className="font-mono text-[10px] text-[#8C8E8B]">0 12px 32px</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MOTION & PHYSICS SPECIFICATION */}
      <section id="motion" className="space-y-6 scroll-mt-24">
        <SectionHeader
          title="Motion & Micro-Interaction Specifications"
          subtitle="Physical inertia, parabolic cart sweeps, botanical loaders, and 240ms view transitions"
          badge="Interactive Sandbox"
        />

        <MotionSpecViewer isDark={isDarkMode} />
      </section>
    </div>
  );
};
