export interface MacroNutrients {
  calories: number; // kcal
  protein: number;  // grams
  carbs: number;    // grams
  fat: number;      // grams
  fiber: number;    // grams
}

export interface FoodItem {
  id: string;
  name: string;
  restaurantId: string;
  restaurantName: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  macros: MacroNutrients;
  tags: string[]; // e.g. "Lean Bulk", "High Fiber", "Keto Friendly"
  category: string;
  categoryIds?: string[]; // IDs of categories this dish matches: 'high-protein', 'low-cal', 'salads', 'bowls', etc.
  dietaryPreferences?: ('vegan' | 'vegetarian' | 'keto' | 'gluten-free' | 'low-carb' | 'high-fiber')[];
  proteinSource?: ProteinSourceId | string;
  chefNote?: string;
  prepTimeMinutes: number;
  isPopular?: boolean;
  micronutrients?: string[];
  ingredients?: string[];
  allergens?: string[];
  menuSection?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTimeRange: string; // e.g. "20-30 min"
  distanceKm: number;
  deliveryFee: number;
  imageUrl: string;
  avgProteinPerMeal: number; // e.g. 44
  verifiedNutritionist: boolean;
  featuredDish: string;
  cuisineTags?: string[];
  coverImageUrl?: string;
  address?: string;
  distanceMiles?: string;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export type NavigationTab =
  | 'home'
  | 'search'
  | 'orders'
  | 'favorites'
  | 'profile'
  | 'discover'
  | 'macros'
  | 'saved'
  | 'cart';

export interface CategoryItem {
  id: string;
  label: string;
  iconName: string;
  targetProtein: string;
}

export interface FilterOption {
  id: string;
  label: string;
  active: boolean;
  type: 'protein' | 'calories' | 'fiber' | 'dietary';
}

export type OrderDeliveryStatus =
  | 'placed'
  | 'preparing'
  | 'on_the_way'
  | 'near_destination'
  | 'delivered';

export interface LiveOrder {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  status: OrderDeliveryStatus;
  estimatedArrival: string;
  orderTime: string;
  deliveryAddress: string;
  courierName: string;
  courierVehicle: string;
  courierRating: number;
  courierDeliveries: number;
  totalAmount: number;
  macroTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export type ProteinSourceId =
  | 'all'
  | 'wild-seafood'
  | 'poultry'
  | 'artisanal-dairy'
  | 'pasture-eggs'
  | 'plant-power'
  | 'lean-red';

export interface ProteinSourceOption {
  id: ProteinSourceId;
  label: string;
  sublabel: string;
  proteinDensityTag: string;
  iconName: string;
  imageUrl?: string;
}
