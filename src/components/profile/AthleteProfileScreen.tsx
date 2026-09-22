import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User as UserIcon,
  ShieldCheck,
  ChevronRight,
  MapPin,
  CreditCard,
  History,
  Settings,
  Sparkles,
  Check,
  LogOut,
  Bell,
  HelpCircle,
  Award,
  Lock,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Database,
  X,
} from 'lucide-react';

export type DietaryFilterKey = 'vegan' | 'keto' | 'gluten-free' | 'high-protein';

export interface AthleteProfileScreenProps {
  activePreferences: DietaryFilterKey[];
  onTogglePreference: (key: DietaryFilterKey) => void;
  onOpenOrders?: () => void;
  onOpenMacroGoals?: () => void;
}

export const AthleteProfileScreen: React.FC<AthleteProfileScreenProps> = ({
  activePreferences,
  onTogglePreference,
  onOpenOrders,
  onOpenMacroGoals,
}) => {
  const { user, profile, signInWithGoogle, signOutUser, isFirebaseConnected } = useAuth();

  // Active sub-modals for concierge account links
  const [activeDialog, setActiveDialog] = useState<
    'saved_addresses' | 'payment_methods' | 'settings' | 'macro_modal' | null
  >(null);

  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  // Nutrition Preferences options definition
  const DIETARY_OPTIONS: {
    key: DietaryFilterKey;
    label: string;
    description: string;
    accent: string;
  }[] = [
    {
      key: 'high-protein',
      label: 'High Protein',
      description: '≥ 30g protein density per single portion',
      accent: '#30D158',
    },
    {
      key: 'gluten-free',
      label: 'Gluten-Free',
      description: '100% certified wheat & gluten free',
      accent: '#30D158',
    },
    {
      key: 'vegan',
      label: 'Vegan',
      description: 'Pure bioavailable plant-powered nutrition',
      accent: '#30D158',
    },
    {
      key: 'keto',
      label: 'Keto',
      description: 'Ultra-low net carbs with healthy fats',
      accent: '#30D158',
    },
  ];

  // Concierge Account Links definition
  const ACCOUNT_LINKS = [
    {
      id: 'saved_addresses' as const,
      label: 'Saved Addresses',
      detail: profile?.savedAddress ? profile.savedAddress.split(',')[0] : 'SoHo, New York',
      icon: MapPin,
      onClick: () => setActiveDialog('saved_addresses'),
    },
    {
      id: 'payment_methods' as const,
      label: 'Payment Methods',
      detail: 'Apple Pay · Default',
      icon: CreditCard,
      onClick: () => setActiveDialog('payment_methods'),
    },
    {
      id: 'order_history' as const,
      label: 'Order History',
      detail: 'Past deliveries & macros',
      icon: History,
      onClick: () => {
        if (onOpenOrders) {
          onOpenOrders();
        } else {
          setActiveDialog('saved_addresses');
        }
      },
    },
    {
      id: 'settings' as const,
      label: 'Settings',
      detail: 'Notifications & security',
      icon: Settings,
      onClick: () => setActiveDialog('settings'),
    },
  ];

  // User details
  const displayName = user?.displayName || 'Athlete Vinay';
  const displayEmail = user?.email || 'vinayankam9@gmail.com';
  const targetProtein = profile?.dailyProteinGoalGrams || 150;
  const targetCalories = profile?.dailyCaloriesGoal || 2000;

  return (
    <div className="w-full bg-[#000000] text-[#F5F5F7] min-h-full pb-16 px-4 pt-4 select-none">
      {/* 1. HEADER SECTION */}
      <section className="flex flex-col items-center text-center pt-2 pb-5">
        {/* Avatar with subtle ring */}
        <div className="relative mb-3.5 group">
          <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-b from-white/20 via-white/5 to-[#30D158]/30">
            <div className="w-full h-full rounded-full bg-[#161617] overflow-hidden flex items-center justify-center border border-black">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-[#161617] flex items-center justify-center">
                  <span className="text-xl font-bold text-[#F5F5F7] tracking-tight">
                    {displayName.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Active status pulse */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#30D158] border-2 border-[#000000] shadow-[0_0_8px_rgba(48,209,88,0.5)]" />
        </div>

        {/* User Name & Badges */}
        <div className="flex items-center justify-center gap-1.5 mb-1.5">
          <h1 className="text-lg font-semibold text-[#F5F5F7] tracking-tight">
            {displayName}
          </h1>
          <ShieldCheck className="w-4 h-4 text-[#30D158]" />
        </div>

        {/* ProteinPath Member Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161617] border border-white/[0.08] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
          <span className="text-[11px] font-medium tracking-wide text-[#A1A1A6]">
            ProteinPath Member
          </span>
        </div>

        {/* 2. DAILY TARGET MACRO PILL */}
        {/* Non-intrusive Titanium Bento pill showing daily target without charts or circular gauges */}
        <div className="mt-4 w-full max-w-xs">
          <button
            type="button"
            onClick={onOpenMacroGoals}
            className="w-full bg-[#161617] hover:bg-[#1C1C1E] transition-colors border border-white/[0.08] rounded-full py-2.5 px-4 flex items-center justify-between group cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#86868B]">
                Target
              </span>
              <span className="text-xs font-semibold text-[#F5F5F7] tracking-tight">
                <span className="text-[#30D158]">{targetProtein}g</span> Protein
                <span className="text-white/20 mx-1.5">/</span>
                <span>{targetCalories} kcal</span>
              </span>
            </div>
            <span className="text-[10px] font-medium text-[#86868B] group-hover:text-[#30D158] transition-colors">
              Edit
            </span>
          </button>
        </div>
      </section>

      {/* 3. DIETARY PREFERENCES TOGGLE SECTION */}
      <section className="mt-4">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[#86868B]">
            NUTRITION PREFERENCES
          </h2>
          {activePreferences.length > 0 && (
            <span className="text-[10px] text-[#30D158] font-mono">
              {activePreferences.length} active
            </span>
          )}
        </div>

        {/* Persistent Titanium Bento Grid / List for preferences */}
        <div className="bg-[#161617] rounded-2xl border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06]">
          {DIETARY_OPTIONS.map((item) => {
            const isSelected = activePreferences.includes(item.key);

            return (
              <div
                key={item.key}
                onClick={() => onTogglePreference(item.key)}
                className="p-3.5 flex items-center justify-between hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors cursor-pointer group"
              >
                <div className="pr-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold tracking-tight transition-colors ${
                        isSelected ? 'text-[#F5F5F7]' : 'text-[#D1D1D6]'
                      }`}
                    >
                      {item.label}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] font-bold text-[#30D158] bg-[#30D158]/10 px-1.5 py-0.2 rounded border border-[#30D158]/20">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#86868B] mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>

                {/* Minimal iOS-style toggle pill */}
                <div
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 flex items-center shrink-0 ${
                    isSelected ? 'bg-[#30D158]' : 'bg-[#2C2C2E]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                      isSelected ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  >
                    {isSelected && (
                      <Check className="w-3 h-3 text-[#121312] stroke-[3]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-[#86868B] mt-2 px-1 leading-relaxed">
          Toggling these options adjusts your Home feed, menu filters, and recommended protein pairings in real-time.
        </p>
      </section>

      {/* 4. ACCOUNT LINKS (CONCIERGE SETTINGS) */}
      <section className="mt-6">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[#86868B] mb-2.5 px-1">
          ACCOUNT & CONCIERGE
        </h2>

        <div className="bg-[#161617] rounded-2xl border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06]">
          {ACCOUNT_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <button
                key={link.id}
                type="button"
                onClick={link.onClick}
                className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors cursor-pointer text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#A1A1A6] group-hover:text-[#F5F5F7] group-hover:border-white/10 transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-[#F5F5F7] block tracking-tight">
                      {link.label}
                    </span>
                    <span className="text-[11px] text-[#86868B] truncate block">
                      {link.detail}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pl-2 text-[#86868B] group-hover:text-[#F5F5F7] transition-colors shrink-0">
                  <ChevronRight className="w-4 h-4 stroke-[1.8]" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Authentication / Sync Status Section */}
      <section className="mt-6">
        <div className="bg-[#161617] rounded-2xl border border-white/[0.08] p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
            <div>
              <span className="text-xs font-medium text-[#F5F5F7] block">
                Cloud Sync Engine
              </span>
              <span className="text-[10px] text-[#86868B] block">
                {isFirebaseConnected ? 'Firestore Active · Real-time' : 'Local Sandbox Mode'}
              </span>
            </div>
          </div>

          {user ? (
            <button
              type="button"
              onClick={signOutUser}
              className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-red-500/20 text-[#86868B] hover:text-red-400 text-xs font-medium transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <button
              type="button"
              onClick={signInWithGoogle}
              className="px-3 py-1.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Connect Google
            </button>
          )}
        </div>
      </section>

      {/* APP VERSION / FOOTNOTE */}
      <div className="mt-6 text-center">
        <span className="text-[10px] tracking-widest uppercase font-mono text-[#52525B]">
          PROTEINPATH Concierge v2.4 · Apple Dark Luxury
        </span>
      </div>

      {/* SUB-MODAL: SAVED ADDRESSES */}
      {activeDialog === 'saved_addresses' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-[#161617] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl p-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#30D158]" />
                <h3 className="text-sm font-bold text-[#F5F5F7]">Saved Addresses</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDialog(null)}
                className="p-1 rounded-full text-[#86868B] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="p-3 rounded-xl bg-black/40 border border-[#30D158]/40 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#F5F5F7]">Primary Residence</span>
                    <span className="text-[9px] bg-[#30D158]/20 text-[#30D158] px-1.5 py-0.5 rounded font-mono">
                      DEFAULT
                    </span>
                  </div>
                  <p className="text-xs text-[#86868B] mt-1">
                    {profile?.savedAddress || '482 Broome St, SoHo, New York, NY 10013'}
                  </p>
                </div>
                <Check className="w-4 h-4 text-[#30D158] mt-0.5 shrink-0" />
              </div>

              <div className="p-3 rounded-xl bg-black/20 border border-white/[0.06] flex items-start justify-between opacity-70">
                <div>
                  <span className="text-xs font-semibold text-[#F5F5F7]">Equinox Training Club</span>
                  <p className="text-xs text-[#86868B] mt-1">
                    568 Broadway, New York, NY 10012
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveDialog(null)}
              className="mt-4 w-full h-9 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* SUB-MODAL: PAYMENT METHODS */}
      {activeDialog === 'payment_methods' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-[#161617] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl p-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#30D158]" />
                <h3 className="text-sm font-bold text-[#F5F5F7]">Payment Methods</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDialog(null)}
                className="p-1 rounded-full text-[#86868B] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="p-3 rounded-xl bg-black/40 border border-[#30D158]/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                    Pay
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#F5F5F7] block">Apple Pay</span>
                    <span className="text-[10px] text-[#86868B]">Biometric One-Tap Verified</span>
                  </div>
                </div>
                <Check className="w-4 h-4 text-[#30D158]" />
              </div>

              <div className="p-3 rounded-xl bg-black/20 border border-white/[0.06] flex items-center justify-between opacity-70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold text-[#86868B]">
                    VISA
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#F5F5F7] block">Titanium Card ···· 8820</span>
                    <span className="text-[10px] text-[#86868B]">Expires 08/29</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveDialog(null)}
              className="mt-4 w-full h-9 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* SUB-MODAL: SETTINGS */}
      {activeDialog === 'settings' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-[#161617] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl p-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#30D158]" />
                <h3 className="text-sm font-bold text-[#F5F5F7]">Settings & Privacy</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDialog(null)}
                className="p-1 rounded-full text-[#86868B] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-black/30">
                <div>
                  <span className="font-medium text-[#F5F5F7] block">Macro Completion Alerts</span>
                  <span className="text-[10px] text-[#86868B]">Notify when reaching daily protein target</span>
                </div>
                <div className="w-8 h-5 rounded-full bg-[#30D158] p-0.5 flex items-center justify-end">
                  <div className="w-4 h-4 rounded-full bg-white" />
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-black/30">
                <div>
                  <span className="font-medium text-[#F5F5F7] block">Live Courier Tracking</span>
                  <span className="text-[10px] text-[#86868B]">GPS updates on food preparation</span>
                </div>
                <div className="w-8 h-5 rounded-full bg-[#30D158] p-0.5 flex items-center justify-end">
                  <div className="w-4 h-4 rounded-full bg-white" />
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-black/30">
                <div>
                  <span className="font-medium text-[#F5F5F7] block">Precision Bio-sync</span>
                  <span className="text-[10px] text-[#86868B]">Apple Health / Whoop link</span>
                </div>
                <span className="text-[10px] font-mono text-[#30D158]">CONNECTED</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveDialog(null)}
              className="mt-4 w-full h-9 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
