import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dna } from 'lucide-react';

export interface FlyingParticleData {
  id: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  imageUrl?: string;
  proteinGrams?: number;
}

export interface FlyingCartParticleProps {
  particle: FlyingParticleData | null;
  onComplete: () => void;
}

export const FlyingCartParticle: React.FC<FlyingCartParticleProps> = ({
  particle,
  onComplete,
}) => {
  return (
    <AnimatePresence>
      {particle && (
        <motion.div
          key={particle.id}
          initial={{
            position: 'fixed',
            left: particle.startX - 20,
            top: particle.startY - 20,
            scale: 1,
            opacity: 1,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
          animate={{
            left: particle.targetX - 16,
            top: particle.targetY - 16,
            scale: 0.35,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: 0.48,
            ease: [0.16, 1, 0.3, 1], // Luxury deceleration arc
          }}
          onAnimationComplete={onComplete}
          className="w-10 h-10 rounded-full bg-[#0E6245] text-white shadow-[0_8px_24px_rgba(14,98,69,0.45)] border-2 border-white flex items-center justify-center overflow-hidden"
        >
          {particle.imageUrl ? (
            <img
              src={particle.imageUrl}
              alt="meal"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center gap-0.5 text-[10px] font-bold">
              <Dna className="w-3.5 h-3.5" />
              <span>+{particle.proteinGrams || ''}g</span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
