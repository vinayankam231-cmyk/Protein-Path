import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  ShoppingBag,
  ArrowRight,
  RotateCcw,
  Check,
  Dna,
  Play,
  Sliders,
  Layers,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { Button, PrimaryButton, SecondaryButton } from '../ui/Button';
import { BotanicalSpinner, WarmPorcelainShimmer, FoodCardSkeleton } from '../ui/LoadingIndicators';
import { MOTION_TOKENS } from '../motion/MotionTokens';
import { FlyingCartParticle, FlyingParticleData } from '../motion/FlyingCartParticle';

export interface MotionSpecViewerProps {
  isDark?: boolean;
}

export const MotionSpecViewer: React.FC<MotionSpecViewerProps> = ({ isDark = false }) => {
  // Test states for sandboxes
  const [tapCount, setTapCount] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(3);
  const [cartRecoil, setCartRecoil] = useState<number>(0);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [activeScreenTab, setActiveScreenTab] = useState<'discover' | 'nutrition' | 'order'>('discover');
  const [particle, setParticle] = useState<FlyingParticleData | null>(null);

  const cartTargetRef = useRef<HTMLDivElement>(null);

  const triggerFlyToCart = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cartRect = cartTargetRef.current?.getBoundingClientRect();

    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    const targetX = cartRect ? cartRect.left + cartRect.width / 2 : window.innerWidth / 2;
    const targetY = cartRect ? cartRect.top + cartRect.height / 2 : 200;

    setParticle({
      id: `particle-${Date.now()}`,
      startX,
      startY,
      targetX,
      targetY,
      proteinGrams: 48,
    });
  };

  const handleParticleDone = () => {
    setParticle(null);
    setCartCount((c) => c + 1);
    setCartRecoil((r) => r + 1);
  };

  const simulateLoadingButton = () => {
    setIsButtonLoading(true);
    setTimeout(() => {
      setIsButtonLoading(false);
    }, 1800);
  };

  return (
    <div className="space-y-12">
      {/* Global Particle Portal for Sandbox */}
      <FlyingCartParticle particle={particle} onComplete={handleParticleDone} />

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-[#EBEAE5] p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 bg-[#EAF4EF] text-[#0E6245] px-3 py-1 rounded-full text-xs font-bold border border-[#D5E8DE] mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>MICRO-INTERACTIONS & MOTION SPECIFICATION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121312] tracking-tight">
          Calibrated Biomimetic Dynamics
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#5E605D] max-w-3xl leading-relaxed">
          ProteinPath movements are engineered like precision athletic chronometers. Every animation
          is grounded in physical inertia, subtle tactile damping, and zero computational overhead.
          We strictly prohibit exaggerated cartoon springs, bouncy jelly effects, or slow cosmetic pauses.
        </p>

        {/* 4 Motion Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#EBEAE5]">
          <div className="p-3 bg-[#FBFBF9] rounded-xl border border-[#EBEAE5]">
            <span className="text-xs font-bold text-[#121312] block">1. Quiet Tactile Snapping</span>
            <span className="text-[11px] text-[#5E605D] mt-0.5 block">
              0.965x scale depression with stiffness 500 damping 30. Zero mushiness.
            </span>
          </div>
          <div className="p-3 bg-[#FBFBF9] rounded-xl border border-[#EBEAE5]">
            <span className="text-xs font-bold text-[#121312] block">2. Parabolic Trajectories</span>
            <span className="text-[11px] text-[#5E605D] mt-0.5 block">
              Cart additions sweep on cubic-bezier(0.16, 1, 0.3, 1) with scale-down landing.
            </span>
          </div>
          <div className="p-3 bg-[#FBFBF9] rounded-xl border border-[#EBEAE5]">
            <span className="text-xs font-bold text-[#121312] block">3. Warm Porcelain Shimmer</span>
            <span className="text-[11px] text-[#5E605D] mt-0.5 block">
              1.6s diffuse sweep replicating soft natural daylight on ceramic glazes.
            </span>
          </div>
          <div className="p-3 bg-[#FBFBF9] rounded-xl border border-[#EBEAE5]">
            <span className="text-xs font-bold text-[#121312] block">4. 240ms Screen Cadence</span>
            <span className="text-[11px] text-[#5E605D] mt-0.5 block">
              Fast, subtle 8px vertical fades preserving spatial continuity.
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Sandbox 1: Button Tap Dynamics */}
      <div className="bg-white rounded-3xl border border-[#EBEAE5] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBEAE5] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#121312]">1. Button Tap Feedback & State Fades</h3>
            <p className="text-xs text-[#5E605D] mt-0.5">
              Experience the 0.965x compression ratio and color blend under simulated user taps.
            </p>
          </div>
          <span className="text-xs font-mono text-[#0E6245] bg-[#EAF4EF] px-2.5 py-1 rounded-full font-semibold">
            stiffness: 500 • damping: 30
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#8C8E8B] uppercase tracking-wider block mb-2">
                Primary Button Tap
              </span>
              <PrimaryButton
                size="lg"
                fullWidth
                onClick={() => setTapCount((c) => c + 1)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Tap to Feel Resistance ({tapCount})
              </PrimaryButton>
            </div>

            <div>
              <span className="text-xs font-bold text-[#8C8E8B] uppercase tracking-wider block mb-2">
                Secondary Button Tap
              </span>
              <SecondaryButton
                size="md"
                fullWidth
                onClick={() => setTapCount((c) => c + 1)}
              >
                Secondary Subtle Compression
              </SecondaryButton>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#8C8E8B] uppercase tracking-wider block mb-2">
                Async Loading Transition
              </span>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isButtonLoading}
                onClick={simulateLoadingButton}
              >
                {isButtonLoading ? 'Authenticating Batch...' : 'Simulate 1.8s Order Dispatch'}
              </Button>
            </div>

            <p className="text-xs text-[#5E605D] bg-[#FBFBF9] p-3 rounded-xl border border-[#EBEAE5] leading-relaxed">
              <strong>Tactile Rule:</strong> The button compresses smoothly without distorting the internal icon or typography.
              When released, it restores with critical damping in &lt;140ms.
            </p>
          </div>

          <div className="p-5 bg-[#FBFBF9] rounded-2xl border border-[#EBEAE5] space-y-3 font-mono text-xs text-[#5E605D]">
            <div className="text-[#121312] font-bold font-sans text-sm">Motion Token Payload</div>
            <div><span className="text-[#0E6245]">whileHover:</span> scale: 1.01</div>
            <div><span className="text-[#0E6245]">whileTap:</span> scale: 0.965</div>
            <div><span className="text-[#0E6245]">transition:</span> spring</div>
            <div><span className="text-[#0E6245]">mass:</span> 0.8 (lightweight feel)</div>
            <div><span className="text-[#0E6245]">damping:</span> 30 (prevents overshoot)</div>
          </div>
        </div>
      </div>

      {/* Interactive Sandbox 2: Add-to-Cart Flight Arc & Recoil */}
      <div className="bg-white rounded-3xl border border-[#EBEAE5] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBEAE5] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#121312]">2. Parabolic Add-to-Cart & Destination Recoil</h3>
            <p className="text-xs text-[#5E605D] mt-0.5">
              Click the meal button below to launch a particle along a curved trajectory into the cart badge.
            </p>
          </div>
          {/* Target Cart Badge */}
          <div
            ref={cartTargetRef}
            className="flex items-center gap-2 p-2 bg-[#F5F5F0] rounded-2xl border border-[#EBEAE5] self-start sm:self-auto"
          >
            <span className="text-xs font-bold text-[#5E605D] px-1">Target Cart:</span>
            <motion.div
              key={cartRecoil}
              initial={{ scale: 1 }}
              animate={cartRecoil > 0 ? { scale: [1, 1.25, 0.92, 1] } : {}}
              transition={MOTION_TOKENS.spring.cartRecoil}
              className="relative p-2.5 bg-[#0E6245] text-white rounded-xl shadow-xs flex items-center justify-center"
            >
              <ShoppingBag className="w-4 h-4" />
              <motion.span
                key={`badge-${cartCount}`}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-[#121312] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white tabular-nums"
              >
                {cartCount}
              </motion.span>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#FBFBF9] rounded-2xl border border-[#EBEAE5] flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#121312]">Air-Fried Apollo Fish</div>
              <div className="text-[11px] text-[#0E6245] font-semibold mt-0.5">30g Protein • ₹339</div>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={triggerFlyToCart}
              className="px-3.5 py-1.5 rounded-full bg-[#0E6245] text-white text-xs font-bold shadow-xs hover:bg-[#077A55] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Dna className="w-3.5 h-3.5" />
              <span>Add + Fly</span>
            </motion.button>
          </div>

          <div className="p-4 bg-[#FBFBF9] rounded-2xl border border-[#EBEAE5] flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#121312]">Tandoori Chicken Salad</div>
              <div className="text-[11px] text-[#0E6245] font-semibold mt-0.5">45g Protein • ₹310</div>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={triggerFlyToCart}
              className="px-3.5 py-1.5 rounded-full bg-[#0E6245] text-white text-xs font-bold shadow-xs hover:bg-[#077A55] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Dna className="w-3.5 h-3.5" />
              <span>Add + Fly</span>
            </motion.button>
          </div>

          <div className="p-4 bg-[#FBFBF9] rounded-2xl border border-[#EBEAE5] flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#121312]">Grilled Paneer & Greens</div>
              <div className="text-[11px] text-[#0E6245] font-semibold mt-0.5">22g Protein • ₹249</div>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={triggerFlyToCart}
              className="px-3.5 py-1.5 rounded-full bg-[#0E6245] text-white text-xs font-bold shadow-xs hover:bg-[#077A55] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Dna className="w-3.5 h-3.5" />
              <span>Add + Fly</span>
            </motion.button>
          </div>
        </div>

        <div className="bg-[#EAF4EF] p-4 rounded-2xl border border-[#D5E8DE] text-xs text-[#0E6245] flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Trajectory Physics:</strong> The flying micro-thumbnail dynamically computes the bounding client coordinates of the triggering element and targets the destination cart icon using a 480ms luxury deceleration curve (<code className="font-mono">cubic-bezier(0.16, 1, 0.3, 1)</code>). When the particle arrives, the cart icon executes a 2-stage elastic bounce recoil (<code className="font-mono">scale: 1 → 1.25 → 0.92 → 1</code>).
          </p>
        </div>
      </div>

      {/* Interactive Sandbox 3: Loading Indicators & Warm Porcelain Shimmer */}
      <div className="bg-white rounded-3xl border border-[#EBEAE5] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-[#EBEAE5] pb-4">
          <h3 className="text-lg font-bold text-[#121312]">3. Loading Indicators: Botanical Spinners & Shimmer</h3>
          <p className="text-xs text-[#5E605D] mt-0.5">
            Compare our custom botanical double-ring spinners and warm porcelain shimmer skeletons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Spinners */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#8C8E8B] uppercase tracking-wider block">
              Botanical Double-Ring Micro-Spinners
            </span>
            <div className="p-6 bg-[#FBFBF9] rounded-2xl border border-[#EBEAE5] flex items-center justify-around">
              <div className="text-center space-y-2">
                <BotanicalSpinner size="sm" />
                <div className="text-[10px] text-[#8C8E8B] font-mono">16px (sm)</div>
              </div>
              <div className="text-center space-y-2">
                <BotanicalSpinner size="md" />
                <div className="text-[10px] text-[#8C8E8B] font-mono">24px (md)</div>
              </div>
              <div className="text-center space-y-2">
                <BotanicalSpinner size="lg" />
                <div className="text-[10px] text-[#8C8E8B] font-mono">40px (lg)</div>
              </div>
            </div>
            <p className="text-xs text-[#5E605D]">
              Unlike default system spinners that pulse or freeze, the Botanical Spinner features a 900ms steady-cadence arc with an inner delicate emerald guide ring.
            </p>
          </div>

          {/* Shimmer Skeleton */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#8C8E8B] uppercase tracking-wider block">
              Warm Porcelain Shimmer Skeleton
            </span>
            <div className="max-w-sm">
              <FoodCardSkeleton />
            </div>
            <p className="text-xs text-[#5E605D]">
              Warm porcelain tones (<code className="font-mono">#F5F5F0</code> to <code className="font-mono">#FFFFFF</code>) replace harsh gray flashing rectangles, maintaining culinary appetite and elegance during loading pauses.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Sandbox 4: Smooth Screen Transitions */}
      <div className="bg-white rounded-3xl border border-[#EBEAE5] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBEAE5] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#121312]">4. Screen Transition Choreography</h3>
            <p className="text-xs text-[#5E605D] mt-0.5">
              Switch views below to preview the calibrated 240ms vertical fade transition.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 bg-[#F5F5F0] p-1 rounded-xl border border-[#EBEAE5]">
            {(['discover', 'nutrition', 'order'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveScreenTab(tab)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer
                  ${
                    activeScreenTab === tab
                      ? 'bg-[#0E6245] text-white shadow-xs'
                      : 'text-[#5E605D] hover:text-[#121312]'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Screen transition canvas */}
        <div className="min-h-[160px] bg-[#FBFBF9] rounded-2xl border border-[#EBEAE5] p-6 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeScreenTab === 'discover' && (
              <motion.div
                key="screen-discover"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2"
              >
                <div className="text-sm font-bold text-[#121312]">Discover Screen View</div>
                <p className="text-xs text-[#5E605D] max-w-lg">
                  Curated organic pasture feeds, high-protein bowls, and certified kitchen laboratories.
                </p>
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF4EF] text-[#0E6245] mt-2">
                  Transition: 240ms duration • 8px y-shift
                </div>
              </motion.div>
            )}

            {activeScreenTab === 'nutrition' && (
              <motion.div
                key="screen-nutrition"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2"
              >
                <div className="text-sm font-bold text-[#0E6245]">Nutrition & Macro Protocol</div>
                <p className="text-xs text-[#5E605D] max-w-lg">
                  Real-time amino acid scoring, leucine threshold monitoring, and daily recovery balance.
                </p>
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#121312] text-white mt-2">
                  Directional continuity preserved
                </div>
              </motion.div>
            )}

            {activeScreenTab === 'order' && (
              <motion.div
                key="screen-order"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2"
              >
                <div className="text-sm font-bold text-[#121312]">Cold-Chain Express Delivery</div>
                <p className="text-xs text-[#5E605D] max-w-lg">
                  Dispatched via temperature-monitored courier directly from SoHo micro-kitchens.
                </p>
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 mt-2">
                  ETA: 18-28 minutes
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Motion Tokens Summary Reference Table */}
      <div className="bg-white rounded-3xl border border-[#EBEAE5] p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#121312]">Motion Tokens Reference Index</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#5E605D]">
            <thead>
              <tr className="border-b border-[#EBEAE5] text-[#121312] uppercase font-bold text-[10px] tracking-wider">
                <th className="py-2.5">Interaction Type</th>
                <th className="py-2.5">Physics / Easing</th>
                <th className="py-2.5">Duration / Spring Spec</th>
                <th className="py-2.5">Hardware Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEAE5] font-mono">
              <tr>
                <td className="py-2.5 font-bold font-sans text-[#121312]">Button Tap Depression</td>
                <td className="py-2.5 text-[#0E6245]">scale: 0.965</td>
                <td className="py-2.5">stiffness: 500, damping: 30</td>
                <td className="py-2.5 text-[#8C8E8B]">transform (scale3d)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-sans text-[#121312]">Flying Cart Particle</td>
                <td className="py-2.5 text-[#0E6245]">cubic-bezier(0.16, 1, 0.3, 1)</td>
                <td className="py-2.5">480ms</td>
                <td className="py-2.5 text-[#8C8E8B]">translate3d, opacity</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-sans text-[#121312]">Cart Icon Badge Recoil</td>
                <td className="py-2.5 text-[#0E6245]">scale: [1, 1.25, 0.92, 1]</td>
                <td className="py-2.5">stiffness: 420, damping: 18</td>
                <td className="py-2.5 text-[#8C8E8B]">transform (scale)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-sans text-[#121312]">Warm Porcelain Shimmer</td>
                <td className="py-2.5 text-[#0E6245]">cubic-bezier(0.25, 0.1, 0.25, 1)</td>
                <td className="py-2.5">1600ms infinite loop</td>
                <td className="py-2.5 text-[#8C8E8B]">translate3d (x-axis)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-sans text-[#121312]">Sheet / Drawer Slide</td>
                <td className="py-2.5 text-[#0E6245]">x: 100% → 0%</td>
                <td className="py-2.5">stiffness: 350, damping: 34</td>
                <td className="py-2.5 text-[#8C8E8B]">translate3d (x-axis)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-sans text-[#121312]">Screen Fade Transition</td>
                <td className="py-2.5 text-[#0E6245]">opacity: 0→1, y: 8→0</td>
                <td className="py-2.5">240ms duration</td>
                <td className="py-2.5 text-[#8C8E8B]">opacity, transform (y)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
