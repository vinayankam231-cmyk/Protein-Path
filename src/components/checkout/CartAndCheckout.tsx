import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, MapPin, Clock, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FoodItem, CartItem, LiveOrder } from '../../types';

export interface CartAndCheckoutProps {
  cartItems?: CartItem[];
  onBack?: () => void;
  onIncrement?: (item: FoodItem) => void;
  onDecrement?: (item: FoodItem) => void;
  onPlaceOrder?: (order?: LiveOrder) => void;
  className?: string;
  deliveryAddress?: string;
  estimatedTime?: string;
}

// Default fallback mock item if cart is empty for preview
const DEFAULT_PREVIEW_ITEM: FoodItem = {
  id: 'food-2',
  name: 'Tandoori Chicken Breast Salad',
  restaurantId: 'rest-1',
  restaurantName: 'Atelier Macro',
  price: 310,
  originalPrice: 350,
  imageUrl:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  category: 'poultry',
  macros: {
    protein: 45,
    calories: 420,
    carbs: 14,
    fat: 10,
    fiber: 6,
  },
  description:
    'Sous-vide then clay-oven charred pasture chicken breast, mixed crisp organic greens, pickled shallots, roasted makhana, and cold-pressed citrus oil.',
  prepTimeMinutes: 18,
  tags: ['Tandoor Charred', 'Zero Added Sugar', 'Ultra Lean'],
};

export const CartAndCheckout: React.FC<CartAndCheckoutProps> = ({
  cartItems = [],
  onBack,
  onIncrement,
  onDecrement,
  onPlaceOrder,
  className = '',
  deliveryAddress = '100 Feet Rd, Indiranagar, Bengaluru',
  estimatedTime = '25–35 mins',
}) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // If user provided an empty cart, display the default showcase item so the component renders beautifully
  const displayItems: CartItem[] =
    cartItems.length > 0 ? cartItems : [{ foodItem: DEFAULT_PREVIEW_ITEM, quantity: 1 }];

  // Calculations: Free delivery above ₹500, else ₹40
  const subtotal = displayItems.reduce(
    (sum, item) => sum + item.foodItem.price * item.quantity,
    0
  );
  const deliveryFee = subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const totalProtein = displayItems.reduce(
    (sum, item) => sum + item.foodItem.macros.protein * item.quantity,
    0
  );
  const totalCalories = displayItems.reduce(
    (sum, item) => sum + item.foodItem.macros.calories * item.quantity,
    0
  );

  const [placedOrder, setPlacedOrder] = useState<LiveOrder | null>(null);

  const handleOrder = () => {
    setIsOrdering(true);
    const newOrder: LiveOrder = {
      id: `PP-${Math.floor(10000 + Math.random() * 90000)}`,
      restaurantId: displayItems[0]?.foodItem.restaurantId || 'rest-1',
      restaurantName: displayItems[0]?.foodItem.restaurantName || 'Atelier Macro',
      items: displayItems,
      status: 'placed',
      estimatedArrival: '1:06 PM',
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryAddress,
      courierName: 'Marcus Vance',
      courierVehicle: 'Super73 Custom E-Bike',
      courierRating: 4.98,
      courierDeliveries: 1420,
      totalAmount: total,
      macroTotals: {
        calories: totalCalories,
        protein: totalProtein,
        carbs: Math.round(totalCalories * 0.08),
        fat: Math.round(totalCalories * 0.04),
      },
    };

    setTimeout(() => {
      setIsOrdering(false);
      setOrderComplete(true);
      setPlacedOrder(newOrder);
      if (onPlaceOrder) {
        onPlaceOrder(newOrder);
      }
    }, 1200);
  };

  const handleReset = () => {
    setOrderComplete(false);
    if (onBack) {
      onBack();
    }
  };

  return (
    <div
      className={`
        relative w-full h-full flex flex-col bg-[#000000] text-[#F5F5F7]
        font-sans select-none overflow-hidden
        ${className}
      `}
    >
      {/* 1. Header: Minimal "Your Bag" with simple back arrow icon */}
      <header className="shrink-0 z-20 px-5 pt-4 pb-3 flex items-center justify-between border-b border-white/[0.12] bg-[#000000]/95 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="w-9 h-9 -ml-1.5 rounded-full flex items-center justify-center text-[#F5F5F7] hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[1.8]" />
          </button>
          <h1 className="text-lg font-semibold tracking-tight text-[#F5F5F7]">
            Your Bag
          </h1>
        </div>

        <div className="text-xs text-[#86868B] font-medium tracking-tight">
          {displayItems.reduce((acc, curr) => acc + curr.quantity, 0)} {displayItems.reduce((acc, curr) => acc + curr.quantity, 0) === 1 ? 'item' : 'items'}
        </div>
      </header>

      {/* Main Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 no-scrollbar">
        {/* Order Completion Screen */}
        <AnimatePresence mode="wait">
          {orderComplete ? (
            <motion.div
              key="order-success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#30D158]/15 border border-[#30D158]/30 flex items-center justify-center text-[#30D158] shadow-[0_0_30px_rgba(48,209,88,0.2)]">
                <CheckCircle2 className="w-8 h-8 stroke-[2]" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#F5F5F7] tracking-tight">
                  Order Confirmed
                </h2>
                <p className="text-xs text-[#86868B] mt-1 max-w-xs mx-auto">
                  Your kitchen has begun prepping your high-protein meal. Arriving at {deliveryAddress} in {estimatedTime}.
                </p>
              </div>

              <div className="w-full max-w-xs p-4 rounded-2xl bg-[#121214] border border-white/[0.12] text-left text-xs space-y-2 mt-4">
                <div className="flex justify-between text-[#86868B]">
                  <span>Estimated Delivery</span>
                  <span className="text-[#F5F5F7] font-medium">{estimatedTime}</span>
                </div>
                <div className="flex justify-between text-[#86868B]">
                  <span>Total Paid</span>
                  <span className="text-[#30D158] font-semibold">₹{total.toFixed(0)}</span>
                </div>
              </div>

              <div className="w-full max-w-xs pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full h-11 rounded-full bg-[#30D158] hover:bg-[#28b84d] text-[#000000] text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(48,209,88,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Done • Back to Explore</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cart-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* 2. Item List: Clean quantity toggle (+/-), price, compact macro summary */}
              <section aria-label="Selected food items" className="space-y-3.5">
                <div className="flex items-center justify-between text-xs text-[#86868B] font-medium px-0.5">
                  <span>Selected Dishes</span>
                  <span>Macro Balanced</span>
                </div>

                <div className="space-y-3">
                  {displayItems.map((item) => {
                    const { foodItem, quantity } = item;
                    const itemTotal = (foodItem.price * quantity).toFixed(0);
                    const macroSummary = `${foodItem.macros.calories} kcal · ${foodItem.macros.protein}g protein`;

                    return (
                      <div
                        key={foodItem.id}
                        className="p-3.5 rounded-2xl bg-[#121214] border border-white/[0.12] flex items-center gap-3.5 transition-all duration-200"
                      >
                        {/* Compact thumbnail image */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-900 border border-white/[0.08] shrink-0">
                          <img
                            src={foodItem.imageUrl}
                            alt={foodItem.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Title & Compact Macro Summary */}
                        <div className="flex-1 min-w-0 pr-1">
                          <h2 className="text-sm font-semibold text-[#F5F5F7] truncate leading-tight">
                            {foodItem.name}
                          </h2>

                          {/* Compact Macro Summary */}
                          <p className="text-xs text-[#86868B] mt-1 font-medium tracking-tight">
                            {macroSummary}
                          </p>

                          {/* Price */}
                          <span className="text-xs font-semibold text-[#F5F5F7] mt-1.5 inline-block tabular-nums">
                            ₹{itemTotal}
                          </span>
                        </div>

                        {/* Clean Quantity Toggle (+ / -) */}
                        <div className="flex items-center gap-1.5 bg-[#1C1C1E] border border-white/[0.12] rounded-full px-2 py-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => onDecrement?.(foodItem)}
                            aria-label={`Decrease ${foodItem.name}`}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.08] active:scale-90 transition-all cursor-pointer"
                          >
                            <Minus className="w-3 h-3 stroke-[2]" />
                          </button>

                          <span className="w-4 text-center text-xs font-semibold text-[#F5F5F7] tabular-nums">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => onIncrement?.(foodItem)}
                            aria-label={`Increase ${foodItem.name}`}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.08] active:scale-90 transition-all cursor-pointer"
                          >
                            <Plus className="w-3 h-3 stroke-[2]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 3. Delivery Details: Sophisticated card showing address and estimated time */}
              <section aria-label="Delivery details">
                <div className="p-4 rounded-2xl bg-[#121214] border border-white/[0.12] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F5F7]">
                      <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[#F5F5F7]">
                        <MapPin className="w-3.5 h-3.5 text-[#30D158]" />
                      </div>
                      <span>Delivery Details</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-[#86868B]">
                      <Clock className="w-3 h-3 text-[#30D158]" />
                      <span className="text-[#F5F5F7] font-medium">Home • {estimatedTime}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] flex items-baseline justify-between text-xs">
                    <div className="min-w-0 pr-3">
                      <p className="text-xs text-[#F5F5F7] font-medium truncate">
                        {deliveryAddress}
                      </p>
                      <p className="text-[11px] text-[#86868B] mt-0.5">
                        Direct handoff · Temperature-controlled courier
                      </p>
                    </div>

                    <span className="text-[11px] text-[#86868B] shrink-0 font-medium hover:text-[#F5F5F7] cursor-pointer">
                      Edit
                    </span>
                  </div>
                </div>
              </section>

              {/* 4. Summary Section: Subtotal, Delivery Fee, Total (elegant, right-aligned) */}
              <section
                aria-label="Order summary"
                className="p-4 rounded-2xl bg-[#121214] border border-white/[0.12] space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs text-[#86868B]">
                  <span>Subtotal</span>
                  <span className="text-[#F5F5F7] font-medium tabular-nums">
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#86868B]">
                  <span>Delivery Fee</span>
                  <span className="text-[#F5F5F7] font-medium tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-[#30D158]">Free (Orders above ₹500)</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/[0.12] flex items-center justify-between text-sm font-semibold">
                  <span className="text-[#F5F5F7]">Total</span>
                  <span className="text-[#F5F5F7] text-base tabular-nums">
                    ₹{total.toFixed(0)}
                  </span>
                </div>
              </section>

              {/* Discreet Quality Guarantee */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#86868B] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#30D158]" />
                <span>Verified macronutrient certification on delivery</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Action: Sticky, full-width "Place Order" primary button using #30D158 */}
      {!orderComplete && (
        <div className="shrink-0 p-4 border-t border-white/[0.12] bg-[#000000]/95 backdrop-blur-md z-30">
          <button
            type="button"
            disabled={isOrdering || displayItems.length === 0}
            onClick={handleOrder}
            className={`
              w-full h-13 rounded-2xl flex items-center justify-between px-5 font-semibold text-sm
              bg-[#30D158] text-[#000000] shadow-[0_4px_24px_rgba(48,209,88,0.25)]
              hover:bg-[#28b84d] active:scale-[0.985] transition-all duration-200 cursor-pointer
              disabled:opacity-50 disabled:pointer-events-none
            `}
          >
            <span className="tracking-tight text-base font-bold">
              {isOrdering ? 'Securing Order...' : 'Place Order'}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tabular-nums">
                ₹{total.toFixed(0)}
              </span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartAndCheckout;
