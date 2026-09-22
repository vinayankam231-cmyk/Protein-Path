import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { ExploreCardItem } from './ExploreMoreSection';

export interface ExploreFeatureModalProps {
  card: ExploreCardItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAction?: (actionName: string) => void;
}

export const ExploreFeatureModal: React.FC<ExploreFeatureModalProps> = ({
  card,
  isOpen,
  onClose,
  onAction,
}) => {
  if (!card) return null;
  const Icon = card.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="
              relative w-full max-w-sm sm:max-w-md bg-[#121214] border border-white/10
              rounded-t-[28px] sm:rounded-[24px] p-6 text-left shadow-2xl z-10
              overflow-hidden
            "
          >
            {/* Top Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${card.iconBg} flex items-center justify-center border border-white/10`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5F5F7]">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#86868B]">{card.tagline}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#86868B] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="py-5 space-y-4">
              <p className="text-sm text-[#D1D1D6] leading-relaxed">
                {card.description}
              </p>

              <div className="bg-[#161617] rounded-xl border border-white/5 p-3.5 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-[#F5F5F7]">
                  <Check className="w-3.5 h-3.5 text-[#30D158]" />
                  <span>Personalized to your target daily macros</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#F5F5F7]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#30D158]" />
                  <span>Third-party lab-verified nutritional accuracy</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#F5F5F7]">
                  <Check className="w-3.5 h-3.5 text-[#30D158]" />
                  <span>Zero minimum order commitments — pause anytime</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  onAction?.(card.id);
                  onClose();
                }}
                className="w-full h-11 rounded-full bg-[#30D158] hover:bg-[#28B84D] text-black font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(48,209,88,0.25)]"
              >
                <span>Activate {card.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full h-9 rounded-full bg-transparent hover:bg-white/5 text-[#86868B] hover:text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
