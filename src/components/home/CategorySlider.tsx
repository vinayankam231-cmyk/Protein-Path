import React from 'react';
import { motion } from 'motion/react';

export interface CategoryOption {
  id: string;
  name: string;
  imageUrl: string;
  altText: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: 'all',
    name: 'All',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
    altText: 'All curated nutritious dishes',
  },
  {
    id: 'high-protein',
    name: 'High Protein',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80',
    altText: 'High protein lean meats and fish',
  },
  {
    id: 'low-calorie',
    name: 'Low Calorie',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80',
    altText: 'Low calorie nutrient dense meals',
  },
  {
    id: 'weight-loss',
    name: 'Weight Loss',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=300&q=80',
    altText: 'Lean balanced meals for deficit diets',
  },
  {
    id: 'muscle-gain',
    name: 'Muscle Gain',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80',
    altText: 'Calorie and protein rich hyper-growth plates',
  },
  {
    id: 'balanced-meals',
    name: 'Balanced Meals',
    imageUrl: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=300&q=80',
    altText: 'Harmonious protein carbs and healthy fats',
  },
  {
    id: 'vegan',
    name: 'Vegan',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80',
    altText: '100% plant-based clean protein',
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=300&q=80',
    altText: 'Paneer, legumes, eggs and dairy sources',
  },
  {
    id: 'keto',
    name: 'Keto',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80',
    altText: 'Ultra low carb healthy fat fuel',
  },
  {
    id: 'low-carb',
    name: 'Low Carb',
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=300&q=80',
    altText: 'Restricted net carbohydrates',
  },
  {
    id: 'high-fiber',
    name: 'High Fiber',
    imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=300&q=80',
    altText: 'Ancient millets, greens and lentils',
  },
  {
    id: 'gluten-free',
    name: 'Gluten Free',
    imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=300&q=80',
    altText: 'Certified 100% gluten-free preparations',
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80',
    altText: 'Morning protein bowls and scrambles',
  },
  {
    id: 'salads',
    name: 'Salads',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80',
    altText: 'Crisp organic macro-balanced salads',
  },
  {
    id: 'bowls',
    name: 'Bowls',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
    altText: 'Power grain and protein bowls',
  },
  {
    id: 'wraps',
    name: 'Wraps',
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=300&q=80',
    altText: 'Whole wheat and gluten-free protein wraps',
  },
  {
    id: 'smoothies',
    name: 'Smoothies',
    imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=300&q=80',
    altText: 'Cold-pressed protein shakes and smoothies',
  },
  {
    id: 'healthy-snacks',
    name: 'Healthy Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80',
    altText: 'High-protein grab and go bites',
  },
  {
    id: 'protein-desserts',
    name: 'Protein Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80',
    altText: 'Guilt-free high protein puddings and sweets',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80',
    altText: 'Electrolytes, aminos and cold brews',
  },
  {
    id: 'indian-healthy',
    name: 'Indian Healthy',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80',
    altText: 'Tikkas, khichdi, dal and grilled tandoor',
  },
];

export interface CategorySliderProps {
  categories?: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  className?: string;
}

export const CategorySlider: React.FC<CategorySliderProps> = ({
  categories = CATEGORY_OPTIONS,
  selectedCategory,
  onSelectCategory,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-5 overflow-x-auto no-scrollbar px-4 py-2 scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center shrink-0 group cursor-pointer focus:outline-none transition-transform duration-200 active:scale-95"
            >
              {/* Circular Food Image Container */}
              <div
                className={`relative w-16 h-16 rounded-full overflow-hidden transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-[#30D158] ring-offset-2 ring-offset-[#000000] scale-105 shadow-[0_0_14px_rgba(48,209,88,0.25)] brightness-105'
                    : 'ring-1 ring-white/10 group-hover:ring-white/25 opacity-70 group-hover:opacity-90 grayscale-[12%] group-hover:grayscale-0'
                }`}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.altText}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Subtle dark gradient overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-200 ${
                    isSelected
                      ? 'bg-black/10'
                      : 'bg-black/30 group-hover:bg-black/15'
                  }`}
                />
              </div>

              {/* Category Label */}
              <span
                className={`mt-2 text-[11px] tracking-tight transition-colors duration-200 whitespace-nowrap ${
                  isSelected
                    ? 'text-[#F5F5F7] font-semibold'
                    : 'text-[#86868B] group-hover:text-[#D1D1D6] font-normal'
                }`}
              >
                {cat.name}
              </span>

              {/* Crisp #30D158 Emerald Underline (2px thick) */}
              <div className="h-[2px] mt-1.5 flex items-center justify-center">
                {isSelected ? (
                  <motion.div
                    layoutId="category-active-indicator"
                    className="w-5 h-[2px] bg-[#30D158] rounded-full shadow-[0_0_8px_rgba(48,209,88,0.6)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                ) : (
                  <div className="w-5 h-[2px] bg-transparent" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
