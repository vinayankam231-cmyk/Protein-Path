import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User as UserIcon,
  ShieldCheck,
  LogOut,
  Sparkles,
  MapPin,
  Target,
  Flame,
  CheckCircle2,
  X,
  Database,
  Lock,
} from 'lucide-react';

export interface UserProfileModalProps {
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ onClose }) => {
  const {
    user,
    profile,
    signInWithGoogle,
    signOutUser,
    updateGoals,
    updateAddress,
    isFirebaseConnected,
    isLoading,
  } = useAuth();

  const [proteinGoal, setProteinGoal] = useState<number>(
    profile?.dailyProteinGoalGrams || 150
  );
  const [calorieGoal, setCalorieGoal] = useState<number>(
    profile?.dailyCaloriesGoal || 2200
  );
  const [address, setAddress] = useState<string>(
    profile?.savedAddress || '482 Broome St, SoHo, New York, NY'
  );
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSavePreferences = async () => {
    await updateGoals(proteinGoal, calorieGoal);
    await updateAddress(address);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="w-full flex flex-col bg-[#000000] text-[#F5F5F7] min-h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.08] bg-[#000000]/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#30D158]/15 border border-[#30D158]/30 flex items-center justify-center text-[#30D158]">
            <UserIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#F5F5F7]">
              Athlete Account & Goals
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-[#86868B]">
              <Database className="w-3 h-3 text-[#30D158]" />
              <span>
                {isFirebaseConnected
                  ? 'Firestore Database Connected'
                  : 'Firestore Initializing'}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#86868B] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-6 flex-1 overflow-y-auto no-scrollbar">
        {/* Authentication Card */}
        {user ? (
          <div className="p-4 rounded-2xl bg-[#121214] border border-white/[0.1] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-12 h-12 rounded-full border border-white/20 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#30D158]/20 border border-[#30D158]/40 flex items-center justify-center text-[#30D158] font-bold text-base">
                    {(user.displayName || user.email || 'A')[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#F5F5F7]">
                      {user.displayName || 'Member'}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#30D158]" />
                  </div>
                  <span className="text-xs text-[#86868B] block truncate max-w-[180px]">
                    {user.email}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={signOutUser}
                className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-red-500/20 text-[#86868B] hover:text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#86868B]">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#30D158]" />
                Authenticated via Google Sign-In
              </span>
              <span className="text-[#30D158] font-mono">UID: {user.uid.slice(0, 6)}...</span>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-[#121214] border border-[#30D158]/30 shadow-[0_4px_24px_rgba(48,209,88,0.1)] space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#30D158]/15 border border-[#30D158]/30 flex items-center justify-center text-[#30D158] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F5F5F7]">
                  Sign In to ProteinPath
                </h3>
                <p className="text-xs text-[#86868B] mt-0.5">
                  Synchronize your macro goals, delivery addresses, and live order history securely with Firebase.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={signInWithGoogle}
              disabled={isLoading}
              className="w-full h-11 rounded-full bg-white text-black hover:bg-white/90 font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-lg cursor-pointer"
            >
              {/* Google G Logo SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{isLoading ? 'Connecting...' : 'Continue with Google'}</span>
            </button>
          </div>
        )}

        {/* Nutrition Target Preferences (Firestore Persisted) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#30D158]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5F5F7]">
                Personalized Macro Targets
              </h3>
            </div>
            <span className="text-[10px] text-[#86868B] font-mono">
              Cloud Synced
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#121214] border border-white/[0.08] space-y-4">
            {/* Daily Protein */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#86868B]">Daily Protein Target</span>
                <span className="font-bold text-[#30D158]">{proteinGoal}g / day</span>
              </div>
              <input
                type="range"
                min={80}
                max={260}
                step={5}
                value={proteinGoal}
                onChange={(e) => setProteinGoal(Number(e.target.value))}
                className="w-full accent-[#30D158] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#86868B]">
                <span>80g (Maintenance)</span>
                <span>260g (Hypertrophy)</span>
              </div>
            </div>

            {/* Daily Calories */}
            <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
              <div className="flex justify-between text-xs">
                <span className="text-[#86868B]">Daily Calorie Budget</span>
                <span className="font-bold text-[#F5F5F7]">{calorieGoal} kcal</span>
              </div>
              <input
                type="range"
                min={1600}
                max={3600}
                step={50}
                value={calorieGoal}
                onChange={(e) => setCalorieGoal(Number(e.target.value))}
                className="w-full accent-[#30D158] cursor-pointer"
              />
            </div>

            {/* Default Delivery Address */}
            <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-xs text-[#86868B]">
                <MapPin className="w-3.5 h-3.5 text-[#30D158]" />
                <span>Primary Delivery Address</span>
              </div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#161618] border border-white/[0.08] focus:border-[#30D158]/50 rounded-xl px-3 py-2 text-xs text-[#F5F5F7] outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSavePreferences}
              className="w-full h-10 rounded-xl bg-[#30D158] hover:bg-[#28b84d] text-black text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(48,209,88,0.2)]"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved to Firestore!</span>
                </>
              ) : (
                <span>Save Targets to Profile</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
