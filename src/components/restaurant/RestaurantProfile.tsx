import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Heart,
  Share2,
  ShieldCheck,
  Search,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Restaurant, FoodItem } from '../../types';
import { RESTAURANTS, FOOD_ITEMS } from '../../data/mockData';
import { FoodCard } from '../ui/FoodCard';

export interface RestaurantProfileProps {
  restaurant?: Restaurant;
  menuItems?: FoodItem[];
  cartQuantityMap?: Record<string, number>;
  onBack?: () => void;
  onIncrement?: (item: FoodItem) => void;
  onDecrement?: (item: FoodItem) => void;
  onClickDetail?: (item: FoodItem) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  favorites?: string[];
  onToggleDishFavorite?: (dishId: string) => void;
  onOpenCart?: () => void;
  className?: string;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Items' },
  { id: 'signatures', label: 'Signatures' },
  { id: 'bowls', label: 'Bowls' },
  { id: 'salads', label: 'Salads' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'smoothies', label: 'Smoothies' },
  { id: 'sides', label: 'Snacks & Sides' },
];

export const RestaurantProfile: React.FC<RestaurantProfileProps> = ({
  restaurant = RESTAURANTS[0],
  menuItems = FOOD_ITEMS,
  cartQuantityMap = {},
  onBack,
  onIncrement,
  onDecrement,
  onClickDetail,
  isFavorite = false,
  onToggleFavorite,
  favorites = [],
  onToggleDishFavorite,
  onOpenCart,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(isFavorite);

  // Filter items specifically for this restaurant
  const restaurantDishes = useMemo(() => {
    return menuItems.filter(
      (item) =>
        item.restaurantId === restaurant.id ||
        item.restaurantName.toLowerCase() === restaurant.name.toLowerCase()
    );
  }, [menuItems, restaurant]);

  // Apply category and search filter
  const filteredDishes = useMemo(() => {
    return restaurantDishes.filter((dish) => {
      const matchesCategory =
        activeCategory === 'all' ||
        dish.menuSection === activeCategory ||
        dish.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        dish.categoryIds?.includes(activeCategory.toLowerCase()) ||
        dish.name.toLowerCase().includes(activeCategory.toLowerCase());

      const matchesSearch =
        searchQuery.trim() === '' ||
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [restaurantDishes, activeCategory, searchQuery]);

  // Total cart items for this restaurant
  const cartTotalCount = useMemo(() => {
    return restaurantDishes.reduce(
      (sum, dish) => sum + (cartQuantityMap[dish.id] || 0),
      0
    );
  }, [restaurantDishes, cartQuantityMap]);

  const cartTotalPrice = useMemo(() => {
    return restaurantDishes.reduce(
      (sum, dish) => sum + dish.price * (cartQuantityMap[dish.id] || 0),
      0
    );
  }, [restaurantDishes, cartQuantityMap]);

  // Cuisine tags fallback
  const cuisineTags = restaurant.cuisineTags || [
    'High-Protein',
    'Organic',
    'Wild Catch',
    'Macro Certified',
  ];

  // Delivery info
  const deliveryDistance =
    restaurant.distanceMiles || `${restaurant.distanceKm.toFixed(1)} km`;
  const deliveryFeeText =
    restaurant.deliveryFee === 0
      ? 'Free Delivery'
      : `₹${restaurant.deliveryFee.toFixed(0)} delivery`;

  return (
    <div
      className={`
        relative w-full min-h-full flex flex-col bg-[#000000] text-[#F5F5F7]
        font-sans select-none overflow-x-hidden
        ${className}
      `}
    >
      {/* 1. HEADER: Cover Photo smoothly fading into pitch-black background */}
      <div className="relative w-full h-72 sm:h-84 shrink-0 overflow-hidden bg-stone-950">
        <img
          src={restaurant.coverImageUrl || restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover object-center scale-[1.02]"
          loading="eager"
        />

        {/* Cinematic Gradient: Deep blend into the pitch-black canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/65 to-black/30" />

        {/* Ambient Top Navigation Icons */}
        <header className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to explore"
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/12 text-[#F5F5F7] flex items-center justify-center hover:bg-black/75 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsLiked(!isLiked);
                onToggleFavorite?.();
              }}
              aria-label="Favorite restaurant"
              className={`
                w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/12
                flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-md
                ${isLiked ? 'text-[#FF375F]' : 'text-[#F5F5F7] hover:text-white'}
              `}
            >
              <Heart
                className={`w-4 h-4 ${isLiked ? 'fill-[#FF375F] stroke-[#FF375F]' : 'stroke-[2]'}`}
              />
            </button>

            <button
              type="button"
              aria-label="Share restaurant"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: restaurant.name,
                    text: `${restaurant.name} — High Protein Clean Dining on ProteinPath`,
                    url: window.location.href,
                  });
                }
              }}
              className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/12 text-[#F5F5F7] flex items-center justify-center hover:bg-black/75 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <Share2 className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </header>

        {/* Restaurant Identity overlaying bottom of cover image */}
        <div className="absolute bottom-5 left-5 right-5 z-20 space-y-2.5">
          {/* Rating & Nutritionist Certification */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/12 font-semibold text-[#F5F5F7]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{restaurant.rating.toFixed(1)}</span>
              <span className="text-[#86868B] font-normal">
                ({restaurant.reviewCount} reviews)
              </span>
            </div>

            {restaurant.verifiedNutritionist && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#30D158]/15 backdrop-blur-md border border-[#30D158]/30 text-[#30D158] text-[11px] font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>Macro Certified Kitchen</span>
              </div>
            )}
          </div>

          {/* Restaurant Title */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F5F7] leading-tight">
            {restaurant.name}
          </h1>

          {/* Cuisine Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {cuisineTags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-[#C7C7CC] bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. INFO PILL & RESTAURANT META: Delivery Time, Distance, and Macro Average */}
      <div className="px-5 pt-3 pb-4 space-y-3 bg-[#000000]">
        {/* Subtle, Muted Info Pill */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 text-xs text-[#A1A1A6] bg-[#121214] border border-white/[0.08] px-3.5 py-1.5 rounded-full font-medium">
            <div className="flex items-center gap-1 text-[#F5F5F7]">
              <Clock className="w-3.5 h-3.5 text-[#30D158]" />
              <span>{restaurant.deliveryTimeRange}</span>
            </div>

            <span className="text-white/20">•</span>

            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#86868B]" />
              <span>{deliveryDistance}</span>
            </div>

            <span className="text-white/20">•</span>

            <span className="text-[#30D158] font-medium">{deliveryFeeText}</span>
          </div>

          {restaurant.avgProteinPerMeal && (
            <div className="inline-flex items-center gap-1.5 text-xs text-[#A1A1A6] bg-[#121214] border border-white/[0.08] px-3 py-1.5 rounded-full font-medium">
              <Sparkles className="w-3 h-3 text-[#30D158]" />
              <span>Avg. {restaurant.avgProteinPerMeal}g protein / dish</span>
            </div>
          )}
        </div>

        {/* Address & Culinary Philosophy */}
        <p className="text-xs text-[#86868B] leading-relaxed max-w-xl">
          {restaurant.cuisine}. Sourced daily with zero refined sugars, pasture-fed proteins, and transparent macronutrient verification.
        </p>
      </div>

      {/* 3. NAVIGATION: Sticky, Horizontal Scroll Menu for Food Categories */}
      <div className="sticky top-0 z-30 bg-[#000000]/95 backdrop-blur-md border-y border-white/[0.08] px-5 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? 'bg-[#30D158]/15 text-[#30D158] border border-[#30D158]/35 shadow-[0_0_12px_rgba(48,209,88,0.15)]'
                      : 'bg-[#121214] text-[#86868B] border border-white/[0.08] hover:text-[#F5F5F7] hover:border-white/16'
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MENU GRID: Reusing minimal Food Card styling */}
      <main className="flex-1 px-5 py-5 space-y-4">
        {/* Section Title & Dish Count */}
        <div className="flex items-center justify-between text-xs text-[#86868B] font-medium px-0.5">
          <span className="capitalize">
            {activeCategory === 'all' ? 'Full Menu' : activeCategory}
          </span>
          <span>
            {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'}
          </span>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-[#121214] rounded-2xl border border-white/[0.08] p-6 space-y-2">
            <p className="text-sm font-semibold text-[#F5F5F7]">
              No dishes found in this category
            </p>
            <p className="text-xs text-[#86868B]">
              Try exploring our signatures or switch to all items.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="mt-2 text-xs font-semibold text-[#30D158] hover:underline cursor-pointer"
            >
              View all items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDishes.map((dish) => (
              <FoodCard
                key={dish.id}
                item={dish}
                quantity={cartQuantityMap[dish.id] || 0}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onClickDetail={onClickDetail}
                isFavorite={favorites.includes(dish.id)}
                onToggleFavorite={() => onToggleDishFavorite?.(dish.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Sticky Bottom Cart Bar (if items in bag) */}
      {cartTotalCount > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky bottom-4 mx-4 z-40"
        >
          <button
            type="button"
            onClick={onOpenCart}
            className="
              w-full h-13 rounded-2xl bg-[#30D158] text-[#000000] font-semibold text-sm
              shadow-[0_8px_30px_rgba(48,209,88,0.28)] flex items-center justify-between px-5
              hover:bg-[#28b84d] active:scale-[0.985] transition-all cursor-pointer
            "
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              <span className="font-bold">
                View Bag ({cartTotalCount} {cartTotalCount === 1 ? 'item' : 'items'})
              </span>
            </div>

            <span className="font-bold tabular-nums">
              ₹{cartTotalPrice.toFixed(0)}
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantProfile;
