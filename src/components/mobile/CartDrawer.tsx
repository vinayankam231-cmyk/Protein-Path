import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, FoodItem } from '../../types';
import { CartAndCheckout } from '../checkout/CartAndCheckout';
import { MOTION_TOKENS } from '../motion/MotionTokens';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onIncrement: (foodItem: FoodItem) => void;
  onDecrement: (foodItem: FoodItem) => void;
  onClear: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onIncrement,
  onDecrement,
  onClear,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={MOTION_TOKENS.spring.drawer}
            className="relative w-full max-w-md bg-[#000000] h-full flex flex-col shadow-2xl border-l border-white/[0.12] z-10 overflow-hidden"
          >
            <CartAndCheckout
              cartItems={cartItems}
              onBack={onClose}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onPlaceOrder={() => {
                setTimeout(() => {
                  onClear();
                }, 1500);
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
