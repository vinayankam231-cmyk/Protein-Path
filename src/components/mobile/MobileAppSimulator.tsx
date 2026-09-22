import React, { useState, useMemo } from 'react';
import {
  FOOD_ITEMS,
  RESTAURANTS,
  PROTEIN_SOURCES,
} from '../../data/mockData';
import { FoodItem, CartItem, NavigationTab, Restaurant, ProteinSourceId } from '../../types';
import { RestaurantCard } from '../ui/RestaurantCard';
import { FoodCard } from '../ui/FoodCard';
import { NavigationBar } from '../ui/NavigationBar';
import { NutritionDetailModal } from '../ui/NutritionDetailModal';
import { CartAndCheckout } from '../checkout/CartAndCheckout';
import { RestaurantProfile } from '../restaurant/RestaurantProfile';
import { UserProfileModal } from '../profile/UserProfileModal';
import { AthleteProfileScreen, DietaryFilterKey } from '../profile/AthleteProfileScreen';
import { CategorySlider } from '../home/CategorySlider';
import { QuickFiltersRow, QuickFilterState } from '../home/QuickFiltersRow';
import { ExploreMoreSection, ExploreCardItem } from '../home/ExploreMoreSection';
import { ExploreFeatureModal } from '../home/ExploreFeatureModal';
import { HomeFilterModal, FilterOptions } from '../home/HomeFilterModal';
import { ProteinSourcesSection } from '../home/ProteinSourcesSection';
import { useAuth } from '../../context/AuthContext';
import {
  MapPin,
  ChevronDown,
  Search,
  X,
  Wifi,
  Battery,
  Signal,
  Heart,
  ShoppingBag,
  ArrowRight,
  RotateCcw,
  Clock,
  Sparkles,
  Database,
  ShieldCheck,
  Globe,
} from 'lucide-react';

export interface MobileAppSimulatorProps {
  cartItems: CartItem[];
  onIncrement: (foodItem: FoodItem) => void;
  onDecrement: (foodItem: FoodItem) => void;
  onClearCart: () => void;
  isFramed?: boolean;
}

export const MobileAppSimulator: React.FC<MobileAppSimulatorProps> = ({
  cartItems,
  onIncrement,
  onDecrement,
  onClearCart,
  isFramed = true,
}) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProteinSource, setSelectedProteinSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectItem, setInspectItem] = useState<FoodItem | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(['food-1', 'food-5']);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [quickFilters, setQuickFilters] = useState<QuickFilterState>({
    filtersOpen: false,
    nearAndFast: false,
    noDeliveryFees: false,
  });
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [nutritionFilters, setNutritionFilters] = useState<FilterOptions>({
    minProtein: 0,
    maxCalories: 1000,
    sortBy: 'recommended',
  });
  const [selectedExploreCard, setSelectedExploreCard] = useState<ExploreCardItem | null>(null);

  // Global dietary preferences persisted and linked to Athlete Profile
  const [dietaryPreferences, setDietaryPreferences] = useState<DietaryFilterKey[]>([
    'high-protein',
  ]);

  const handleToggleDietaryPreference = (prefKey: DietaryFilterKey) => {
    setDietaryPreferences((prev) =>
      prev.includes(prefKey) ? prev.filter((p) => p !== prefKey) : [...prev, prefKey]
    );
  };

  const {
    user,
    profile,
    signInWithGoogle,
    signOutUser,
    orders: firestoreOrders,
    saveOrderToFirestore,
    favorites: firestoreFavorites,
    toggleFavoriteInFirestore,
    isFirebaseConnected,
  } = useAuth();

  const currentFavorites = firestoreFavorites.length > 0 ? firestoreFavorites : favorites;

  const toggleFavorite = (foodId: string) => {
    if (user) {
      toggleFavoriteInFirestore(foodId);
    } else {
      setFavorites((prev) =>
        prev.includes(foodId) ? prev.filter((id) => id !== foodId) : [...prev, foodId]
      );
    }
  };

  const cartQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((ci) => {
      map[ci.foodItem.id] = ci.quantity;
    });
    return map;
  }, [cartItems]);

  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartTotalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.foodItem.price * item.quantity,
        0
      ),
    [cartItems]
  );

  // Filtered food items based on category, quick filters, and search
  const filteredFoodItems = useMemo(() => {
    let result = FOOD_ITEMS.filter((item) => {
      // Category filtering
      if (selectedCategory !== 'all') {
        const cat = selectedCategory.toLowerCase();
        const matchesCategory =
          item.category === cat ||
          item.categoryIds?.includes(cat) ||
          (cat === 'high-protein' && (item.macros.protein >= 30 || item.categoryIds?.includes('high-protein'))) ||
          (cat === 'low-calorie' && (item.macros.calories <= 450 || item.categoryIds?.includes('low-calorie'))) ||
          (cat === 'weight-loss' && (item.categoryIds?.includes('weight-loss') || item.macros.calories <= 450)) ||
          (cat === 'muscle-gain' && (item.categoryIds?.includes('muscle-gain') || item.macros.protein >= 35)) ||
          (cat === 'balanced-meals' && (item.categoryIds?.includes('balanced-meals') || (item.macros.protein >= 25 && item.macros.carbs >= 25))) ||
          (cat === 'vegan' && (item.dietaryPreferences?.includes('vegan') || item.categoryIds?.includes('vegan'))) ||
          (cat === 'vegetarian' && (item.dietaryPreferences?.includes('vegetarian') || item.dietaryPreferences?.includes('vegan') || item.categoryIds?.includes('vegetarian'))) ||
          (cat === 'keto' && (item.dietaryPreferences?.includes('keto') || item.categoryIds?.includes('keto') || item.macros.carbs <= 15)) ||
          (cat === 'low-carb' && (item.dietaryPreferences?.includes('low-carb') || item.categoryIds?.includes('low-carb') || item.macros.carbs <= 25)) ||
          (cat === 'high-fiber' && (item.dietaryPreferences?.includes('high-fiber') || item.categoryIds?.includes('high-fiber') || (item.macros.fiber ?? 0) >= 8)) ||
          (cat === 'gluten-free' && (item.dietaryPreferences?.includes('gluten-free') || item.categoryIds?.includes('gluten-free'))) ||
          (cat === 'breakfast' && (item.category === 'breakfast' || item.categoryIds?.includes('breakfast') || item.menuSection === 'breakfast')) ||
          (cat === 'salads' && (item.category === 'salads' || item.categoryIds?.includes('salads') || item.name.toLowerCase().includes('salad'))) ||
          (cat === 'bowls' && (item.category === 'bowls' || item.categoryIds?.includes('bowls') || item.name.toLowerCase().includes('bowl'))) ||
          (cat === 'wraps' && (item.category === 'wraps' || item.categoryIds?.includes('wraps') || item.name.toLowerCase().includes('wrap') || item.name.toLowerCase().includes('roti'))) ||
          (cat === 'smoothies' && (item.category === 'smoothies' || item.categoryIds?.includes('smoothies') || item.name.toLowerCase().includes('smoothie') || item.name.toLowerCase().includes('shake'))) ||
          (cat === 'healthy-snacks' && (item.category === 'healthy-snacks' || item.categoryIds?.includes('healthy-snacks') || item.menuSection === 'sides')) ||
          (cat === 'protein-desserts' && (item.category === 'protein-desserts' || item.categoryIds?.includes('protein-desserts') || item.menuSection === 'desserts')) ||
          (cat === 'drinks' && (item.category === 'drinks' || item.categoryIds?.includes('drinks') || item.categoryIds?.includes('smoothies'))) ||
          (cat === 'indian-healthy' && (item.category === 'indian-healthy' || item.categoryIds?.includes('indian-healthy') || item.tags.some(t => t.toLowerCase().includes('indian') || t.toLowerCase().includes('tandoor'))));

        if (!matchesCategory) return false;
      }

      // Protein Source filtering (Wild Seafood, Free-Range Poultry, Artisanal Dairy, Pasture Eggs, Plant Power, Lean Red)
      if (selectedProteinSource !== 'all') {
        if (item.proteinSource !== selectedProteinSource) {
          return false;
        }
      }

      // Quick filter: Near & Fast (prepTime <= 22 mins)
      if (quickFilters.nearAndFast && item.prepTimeMinutes > 22) {
        return false;
      }

      // Quick filter: No delivery fees (restaurant deliveryFee === 0)
      if (quickFilters.noDeliveryFees) {
        const rest = RESTAURANTS.find((r) => r.id === item.restaurantId);
        if (rest && rest.deliveryFee > 0) {
          return false;
        }
      }

      // Nutrition filter: minProtein
      if (nutritionFilters.minProtein > 0 && item.macros.protein < nutritionFilters.minProtein) {
        return false;
      }

      // Nutrition filter: maxCalories
      if (nutritionFilters.maxCalories < 1000 && item.macros.calories > nutritionFilters.maxCalories) {
        return false;
      }

      // Athlete Profile Dietary Preferences Filtering
      if (dietaryPreferences.length > 0) {
        for (const pref of dietaryPreferences) {
          if (pref === 'vegan') {
            const isVegan =
              item.dietaryPreferences?.includes('vegan') ||
              item.categoryIds?.includes('vegan') ||
              item.proteinSource === 'plant-power';
            if (!isVegan) return false;
          } else if (pref === 'keto') {
            const isKeto =
              item.dietaryPreferences?.includes('keto') ||
              item.categoryIds?.includes('keto') ||
              item.macros.carbs <= 18;
            if (!isKeto) return false;
          } else if (pref === 'gluten-free') {
            const isGF =
              item.dietaryPreferences?.includes('gluten-free') ||
              item.categoryIds?.includes('gluten-free') ||
              !item.allergens?.includes('Wheat');
            if (!isGF) return false;
          } else if (pref === 'high-protein') {
            const isHP =
              item.macros.protein >= 30 ||
              item.categoryIds?.includes('high-protein') ||
              item.tags.some((t) => t.toLowerCase().includes('high protein'));
            if (!isHP) return false;
          }
        }
      }

      // Search filtering
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesRest = item.restaurantName.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTag = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesRest && !matchesDesc && !matchesTag) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (nutritionFilters.sortBy === 'protein-desc') {
      result = [...result].sort((a, b) => b.macros.protein - a.macros.protein);
    } else if (nutritionFilters.sortBy === 'calories-asc') {
      result = [...result].sort((a, b) => a.macros.calories - b.macros.calories);
    } else if (nutritionFilters.sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    return result;
  }, [selectedCategory, selectedProteinSource, searchQuery, quickFilters, nutritionFilters, dietaryPreferences]);

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
  };

  const containerContent = (
    <div className="flex flex-col h-full bg-[#FBFBF9] dark:bg-[#000000] text-[#121312] dark:text-[#F5F5F7] overflow-hidden relative">
      {/* Mobile OS Status Bar */}
      <div className="pt-2 px-6 pb-1 flex items-center justify-between text-xs font-semibold shrink-0 select-none text-[#121312] dark:text-[#F5F5F7]">
        <span>9:41</span>
        <div className="w-20 h-4 bg-[#121312] dark:bg-white/20 rounded-full mx-auto hidden sm:block opacity-90" />
        <div className="flex items-center gap-1.5 text-[#121312] dark:text-[#F5F5F7]">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* HOME TAB */}
        {(activeTab === 'home' || activeTab === 'discover') && (
          <div className="pb-6">
            {/* Top Simple Header */}
            <div className="px-4 pt-3 pb-2">
              <div className="flex items-center justify-between">
                <div
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center gap-1.5 cursor-pointer group"
                >
                  <MapPin className="w-4 h-4 text-[#30D158]" />
                  <span className="text-xs font-semibold text-[#121312] dark:text-[#F5F5F7] group-hover:text-[#30D158] transition-colors truncate max-w-[180px]">
                    {profile?.savedAddress ? profile.savedAddress.split(',')[0] : 'SoHo, New York'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C8E8B]" />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(true)}
                    className="relative w-8 h-8 rounded-full bg-[#121312] dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer border border-white/20"
                    title={user?.displayName || 'Athlete Profile'}
                  >
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span>{(user?.displayName || user?.email || 'AM')[0].toUpperCase()}</span>
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#30D158] border-2 border-black" />
                  </button>
                </div>
              </div>

              {/* Short Greeting */}
              <div className="mt-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#8C8E8B] dark:text-[#86868B] font-medium tracking-tight">
                    {user ? `Athlete ${user.displayName?.split(' ')[0] || ''}` : 'Good evening, Alex'}
                  </p>
                  {profile && (
                    <span className="text-[10px] font-mono text-[#30D158] bg-[#30D158]/10 px-2 py-0.5 rounded-full border border-[#30D158]/20">
                      Goal: {profile.dailyProteinGoalGrams}g Protein
                    </span>
                  )}
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-[#121312] dark:text-[#F5F5F7] tracking-tight mt-0.5">
                  Explore wholesome dining
                </h1>
              </div>

              {/* Clean Search Bar */}
              <div className="mt-3">
                <div className="relative flex items-center bg-white dark:bg-[#161618] border border-[#EBEAE5] dark:border-white/10 rounded-full h-11 px-3.5 shadow-2xs">
                  <Search className="w-4 h-4 text-[#8C8E8B] shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Dishes, restaurants or ingredients..."
                    className="w-full bg-transparent text-[#121312] dark:text-[#F5F5F7] text-sm placeholder:text-[#8C8E8B] outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-[#8C8E8B] hover:text-[#121312] dark:hover:text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* “Explore healthy food” Section with Visual Image Category Slider */}
            <div className="mt-5">
              <div className="px-4 mb-2 flex items-center justify-between">
                <h2 className="text-base font-bold text-[#121312] dark:text-[#F5F5F7] tracking-tight">
                  Explore healthy food
                </h2>
                {selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-[#8C8E8B] hover:text-[#30D158] transition-colors cursor-pointer"
                  >
                    Reset filter
                  </button>
                )}
              </div>

              {/* Smooth Horizontal Image-Based Category Slider */}
              <CategorySlider
                selectedCategory={selectedCategory}
                onSelectCategory={(catId) => setSelectedCategory(catId)}
              />
            </div>

            {/* Quick Filters Row (horizontally scrollable pill buttons) */}
            <div className="mt-3.5">
              <QuickFiltersRow
                filters={quickFilters}
                onToggleFilter={(key) =>
                  setQuickFilters((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                onOpenFilterModal={() => setFilterModalOpen(true)}
              />
            </div>

            {/* Explore More Horizontal Section */}
            <div className="mt-6">
              <ExploreMoreSection
                onSelectCard={(card) => setSelectedExploreCard(card)}
              />
            </div>

            {/* Protein & Food Sources Filter Section */}
            <div className="mt-6">
              <ProteinSourcesSection
                selectedSource={selectedProteinSource}
                onSelectSource={(sourceId) => setSelectedProteinSource(sourceId)}
              />
            </div>

            {/* “Recommended for you” Section with Large Beautiful Food Cards */}
            <div className="mt-7 px-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-base font-bold text-[#121312] dark:text-[#F5F5F7] tracking-tight">
                    Recommended for you
                  </h2>
                  <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                    {selectedProteinSource !== 'all' && (
                      <span className="text-[11px] font-medium text-[#30D158]">
                        Source: {PROTEIN_SOURCES.find((s) => s.id === selectedProteinSource)?.label || selectedProteinSource}
                      </span>
                    )}
                    {dietaryPreferences.map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => handleToggleDietaryPreference(pref)}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-[#30D158] bg-[#30D158]/10 hover:bg-[#30D158]/20 px-2 py-0.5 rounded-full border border-[#30D158]/25 transition-colors cursor-pointer"
                        title="Dietary preference active from Athlete Profile. Tap to toggle."
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                        <span className="capitalize">{pref.replace('-', ' ')}</span>
                        <X className="w-2.5 h-2.5 text-[#30D158]/70 hover:text-[#30D158]" />
                      </button>
                    ))}
                  </div>
                </div>
                {(selectedCategory !== 'all' || selectedProteinSource !== 'all' || dietaryPreferences.length > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedProteinSource('all');
                      setDietaryPreferences([]);
                    }}
                    className="text-xs text-[#8C8E8B] hover:text-[#121312] dark:hover:text-white underline cursor-pointer"
                  >
                    Reset all
                  </button>
                )}
              </div>

              {filteredFoodItems.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-[#161618] rounded-2xl border border-[#EBEAE5] dark:border-white/8 p-6">
                  <p className="text-sm font-semibold text-[#121312] dark:text-[#F5F5F7]">
                    No dishes found
                  </p>
                  <p className="text-xs text-[#8C8E8B] mt-1">
                    Try adjusting your source or category selection.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedProteinSource('all');
                      setSearchQuery('');
                    }}
                    className="mt-3 text-xs font-semibold text-[#0E6245] dark:text-[#30D158] hover:underline cursor-pointer"
                  >
                    Reset all
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredFoodItems.map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      quantity={cartQuantityMap[item.id] || 0}
                      onIncrement={onIncrement}
                      onDecrement={onDecrement}
                      onClickDetail={(selected) => setInspectItem(selected)}
                      isFavorite={favorites.includes(item.id)}
                      onToggleFavorite={(favItem) => toggleFavorite(favItem.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Restaurant Section: Curated Kitchens */}
            <div className="mt-8 px-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-[#121312] dark:text-[#F5F5F7] tracking-tight">
                  Curated Kitchens
                </h2>
                <span className="text-xs text-[#8C8E8B]">Top rated nearby</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {RESTAURANTS.slice(0, 2).map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onClick={() => {
                      setSelectedRestaurant(restaurant);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEARCH TAB */}
        {activeTab === 'search' && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold text-[#121312] dark:text-[#F5F5F7] tracking-tight">
              Search Food & Kitchens
            </h2>

            {/* Search Input */}
            <div className="relative flex items-center w-full bg-white dark:bg-[#161618] border border-[#EBEAE5] dark:border-white/10 rounded-full h-11 px-3.5 shadow-2xs">
              <Search className="w-4 h-4 text-[#8C8E8B] shrink-0 mr-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search high-protein dishes, restaurants..."
                className="w-full bg-transparent text-[#121312] dark:text-[#F5F5F7] text-sm placeholder:text-[#8C8E8B] outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#8C8E8B] hover:text-[#121312] dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Suggestions */}
            <div>
              <span className="text-xs font-semibold text-[#8C8E8B] dark:text-[#86868B] block mb-2">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Grilled Chicken Bowl', 'Chicken Tikka', 'Tandoori Chicken', 'Egg & Avocado', 'Paneer Power Bowl', 'Caesar Salad', 'Khichdi', 'Protein Shake', 'Protein Brownie'].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSearchQuery(term)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-[#161618] text-[#5E605D] dark:text-[#86868B] border border-[#EBEAE5] dark:border-white/8 hover:border-[#D5D3CB] transition-all cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Results */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#8C8E8B] dark:text-[#86868B] block mb-3">
                {filteredFoodItems.length} {filteredFoodItems.length === 1 ? 'Dish' : 'Dishes'} Available
              </span>
              <div className="grid grid-cols-1 gap-3">
                {filteredFoodItems.map((item) => (
                  <FoodCard
                    key={`search-${item.id}`}
                    item={item}
                    variant="horizontal"
                    quantity={cartQuantityMap[item.id] || 0}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onClickDetail={(selected) => setInspectItem(selected)}
                    isFavorite={favorites.includes(item.id)}
                    onToggleFavorite={(favItem) => toggleFavorite(favItem.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h1 className="text-lg font-bold text-[#121312] dark:text-[#F5F5F7] tracking-tight">
                  Orders
                </h1>
                <p className="text-xs text-[#8C8E8B] dark:text-[#86868B] mt-0.5">
                  Your past macro-optimized meal orders
                </p>
              </div>
              {totalCartCount > 0 && (
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#30D158]/15 text-[#30D158] border border-[#30D158]/30 hover:bg-[#30D158]/25 transition-colors cursor-pointer"
                >
                  View Active Bag ({totalCartCount})
                </button>
              )}
            </div>

            <div className="space-y-3">
              {firestoreOrders && firestoreOrders.length > 0 && (
                <div className="space-y-3">
                  {firestoreOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white dark:bg-[#161618] p-4 rounded-2xl border border-[#EBEAE5] dark:border-white/8 shadow-2xs"
                    >
                      <div className="flex items-center justify-between pb-2.5 border-b border-[#F5F5F0] dark:border-white/6 text-xs">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#121312] dark:text-[#F5F5F7]">
                              {ord.restaurantName}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#30D158]/15 text-[#30D158]">
                              {ord.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-[#8C8E8B] text-[11px] mt-0.5">
                            Order {ord.id} · {ord.orderTime}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#30D158]">
                          ₹{ord.totalAmount.toFixed(0)}
                        </span>
                      </div>

                      <div className="py-2.5 text-xs text-[#5E605D] dark:text-[#86868B] space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span>
                              {it.quantity}x {it.foodItem.name}
                            </span>
                            <span className="font-mono text-[11px] text-[#30D158]">
                              {it.foodItem.macros.protein * it.quantity}g P
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-between items-center border-t border-white/[0.06]">
                        <span className="text-[11px] text-[#8C8E8B] truncate max-w-[170px]">
                          {ord.deliveryAddress}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            ord.items.forEach((it) => onIncrement(it.foodItem));
                            setIsCartOpen(true);
                          }}
                          className="text-xs font-semibold text-[#0E6245] dark:text-[#30D158] hover:underline cursor-pointer"
                        >
                          Reorder Meal
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-white dark:bg-[#161618] p-4 rounded-2xl border border-[#EBEAE5] dark:border-white/8 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#F5F5F0] dark:border-white/6 text-xs">
                  <div>
                    <span className="font-semibold text-[#121312] dark:text-[#F5F5F7]">
                      Atelier Macro
                    </span>
                    <div className="text-[#8C8E8B] text-[11px] mt-0.5">
                      Yesterday · Delivered
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#0E6245] dark:text-[#30D158]">
                    ₹310
                  </span>
                </div>
                <div className="py-2.5 text-xs text-[#5E605D] dark:text-[#86868B]">
                  1x Tandoori Chicken Breast Salad (420 kcal · 45g protein)
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[11px] text-[#8C8E8B]">Delivered to Indiranagar</span>
                  <button
                    type="button"
                    onClick={() => onIncrement(FOOD_ITEMS[1])}
                    className="text-xs font-semibold text-[#0E6245] dark:text-[#30D158] hover:underline cursor-pointer"
                  >
                    Reorder Meal
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-[#161618] p-4 rounded-2xl border border-[#EBEAE5] dark:border-white/8 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#F5F5F0] dark:border-white/6 text-xs">
                  <div>
                    <span className="font-semibold text-[#121312] dark:text-[#F5F5F7]">
                      The Iron Hearth
                    </span>
                    <div className="text-[#8C8E8B] text-[11px] mt-0.5">
                      Oct 14 · Delivered
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#0E6245] dark:text-[#30D158]">
                    ₹339
                  </span>
                </div>
                <div className="py-2.5 text-xs text-[#5E605D] dark:text-[#86868B]">
                  1x Air-Fried Apollo Fish (380 kcal · 30g protein)
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[11px] text-[#8C8E8B]">Delivered to Jubilee Hills</span>
                  <button
                    type="button"
                    onClick={() => onIncrement(FOOD_ITEMS[0])}
                    className="text-xs font-semibold text-[#0E6245] dark:text-[#30D158] hover:underline cursor-pointer"
                  >
                    Reorder Meal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAVOURITES TAB */}
        {activeTab === 'favorites' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#121312] dark:text-[#F5F5F7] tracking-tight">
                Favourites
              </h2>
              <span className="text-[11px] font-mono text-[#30D158] flex items-center gap-1">
                <Database className="w-3 h-3" />
                <span>Cloud Synced</span>
              </span>
            </div>

            {currentFavorites.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#161618] rounded-2xl border border-[#EBEAE5] dark:border-white/8 p-6">
                <Heart className="w-8 h-8 text-[#8C8E8B] mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold text-[#121312] dark:text-[#F5F5F7]">
                  No favorites yet
                </p>
                <p className="text-xs text-[#8C8E8B] mt-1">
                  Tap the heart on any food card to save your favorite dishes.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className="mt-3 text-xs font-semibold text-[#0E6245] dark:text-[#30D158] hover:underline cursor-pointer"
                >
                  Explore dishes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {FOOD_ITEMS.filter((item) => currentFavorites.includes(item.id)).map((item) => (
                  <FoodCard
                    key={`fav-${item.id}`}
                    item={item}
                    variant="horizontal"
                    quantity={cartQuantityMap[item.id] || 0}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onClickDetail={(selected) => setInspectItem(selected)}
                    isFavorite={true}
                    onToggleFavorite={(favItem) => toggleFavorite(favItem.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <AthleteProfileScreen
            activePreferences={dietaryPreferences}
            onTogglePreference={handleToggleDietaryPreference}
            onOpenOrders={() => setActiveTab('orders')}
            onOpenMacroGoals={() => setIsProfileModalOpen(true)}
          />
        )}
      </div>

      {/* Floating Bottom Quick-Cart Summary (when items in cart) */}
      {totalCartCount > 0 && (
        <div className="px-4 pb-2 z-20">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#121312] dark:bg-[#1E1E20] text-white p-3.5 rounded-2xl flex items-center justify-between shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-black transition-all cursor-pointer border border-white/10"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#0E6245] dark:bg-[#30D158] text-white dark:text-black flex items-center justify-center text-xs font-bold tabular-nums">
                {totalCartCount}
              </div>
              <span className="text-xs font-semibold">
                View Bag · ₹{cartTotalPrice.toFixed(0)}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-white/90">
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Bottom Navigation: Home | Search | Orders | Favourites | Profile */}
      <NavigationBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={totalCartCount}
      />

      {/* Nutrition Detail Modal (opened on clicking food card) */}
      <NutritionDetailModal
        item={inspectItem}
        quantity={inspectItem ? cartQuantityMap[inspectItem.id] || 0 : 0}
        onClose={() => setInspectItem(null)}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />

      {/* Full-Screen Restaurant Profile View */}
      {selectedRestaurant && (
        <div className="absolute inset-0 z-45 bg-[#000000] flex flex-col overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right duration-200">
          <RestaurantProfile
            restaurant={selectedRestaurant}
            menuItems={FOOD_ITEMS}
            cartQuantityMap={cartQuantityMap}
            onBack={() => setSelectedRestaurant(null)}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onClickDetail={(item) => setInspectItem(item)}
            favorites={currentFavorites}
            onToggleDishFavorite={toggleFavorite}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>
      )}

      {/* Full-Screen Cart & Checkout View */}
      {isCartOpen && (
        <div className="absolute inset-0 z-50 bg-[#000000] flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CartAndCheckout
            cartItems={cartItems}
            onBack={() => setIsCartOpen(false)}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onPlaceOrder={(order) => {
              if (order) {
                saveOrderToFirestore(order);
              }
              setTimeout(() => {
                onClearCart();
              }, 1200);
            }}
          />
        </div>
      )}

      {/* Full-Screen Athlete Profile & Goals Modal */}
      {isProfileModalOpen && (
        <div className="absolute inset-0 z-50 bg-[#000000] flex flex-col overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-bottom duration-200">
          <UserProfileModal
            onClose={() => setIsProfileModalOpen(false)}
          />
        </div>
      )}

      {/* Nutrition & Sort Filters Sheet */}
      <HomeFilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={nutritionFilters}
        onChangeFilters={(newFilters) => setNutritionFilters(newFilters)}
        onReset={() => {
          setNutritionFilters({
            minProtein: 0,
            maxCalories: 1000,
            sortBy: 'recommended',
          });
          setQuickFilters({
            filtersOpen: false,
            nearAndFast: false,
            noDeliveryFees: false,
          });
        }}
      />

      {/* Curated Service Detail Modal */}
      <ExploreFeatureModal
        card={selectedExploreCard}
        isOpen={!!selectedExploreCard}
        onClose={() => setSelectedExploreCard(null)}
      />
    </div>
  );

  // If framed presentation requested
  if (isFramed) {
    return (
      <div className="relative mx-auto w-full max-w-[400px] h-[844px] bg-[#121312] rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 pointer-events-none flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800 mr-2" />
          <div className="w-2 h-2 rounded-full bg-[#0E6245]/70" />
        </div>

        {/* Screen container */}
        <div className="w-full h-full rounded-[40px] overflow-hidden bg-[#FBFBF9] dark:bg-[#000000] relative">
          {containerContent}
        </div>
      </div>
    );
  }

  // Fullscreen container
  return (
    <div className="w-full max-w-md mx-auto h-[844px] bg-[#FBFBF9] dark:bg-[#000000] rounded-2xl shadow-lg border border-[#EBEAE5] dark:border-white/10 overflow-hidden">
      {containerContent}
    </div>
  );
};
