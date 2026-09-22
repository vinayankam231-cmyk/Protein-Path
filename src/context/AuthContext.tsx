import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db, googleProvider, testFirestoreConnection } from '../lib/firebase';
import { LiveOrder } from '../types';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  dailyProteinGoalGrams: number;
  dailyCaloriesGoal: number;
  savedAddress: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isFirebaseConnected: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updateGoals: (protein: number, calories: number) => Promise<void>;
  updateAddress: (address: string) => Promise<void>;
  orders: LiveOrder[];
  saveOrderToFirestore: (order: LiveOrder) => Promise<void>;
  favorites: string[];
  toggleFavoriteInFirestore: (foodId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(true);
  const [orders, setOrders] = useState<LiveOrder[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['food-1', 'food-5']);

  // Initial connection test
  useEffect(() => {
    testFirestoreConnection().then((ok) => {
      setIsFirebaseConnected(ok);
    });
  }, []);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Sync or initialize user profile in Firestore
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (!docSnap.exists()) {
            const newProfile: UserProfile = {
              userId: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Athletic Member',
              photoURL: currentUser.photoURL || undefined,
              dailyProteinGoalGrams: 150,
              dailyCaloriesGoal: 2200,
              savedAddress: '482 Broome St, SoHo, New York, NY',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile);
          } else {
            setProfile(docSnap.data() as UserProfile);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time synchronization of User Orders from Firestore
  useEffect(() => {
    if (!user) {
      return;
    }
    const ordersColRef = collection(db, 'users', user.uid, 'orders');
    const unsub = onSnapshot(
      ordersColRef,
      (snapshot) => {
        const fetchedOrders: LiveOrder[] = [];
        snapshot.forEach((d) => {
          fetchedOrders.push(d.data() as LiveOrder);
        });
        if (fetchedOrders.length > 0) {
          // Sort newest first
          fetchedOrders.sort((a, b) => (b.orderTime > a.orderTime ? 1 : -1));
          setOrders(fetchedOrders);
        }
      },
      (error) => {
        console.warn('Orders snapshot listener:', error);
      }
    );

    return () => unsub();
  }, [user]);

  // Real-time synchronization of Favorites from Firestore
  useEffect(() => {
    if (!user) {
      return;
    }
    const favsColRef = collection(db, 'users', user.uid, 'favorites');
    const unsub = onSnapshot(
      favsColRef,
      (snapshot) => {
        const favIds: string[] = [];
        snapshot.forEach((d) => {
          favIds.push(d.id);
        });
        if (favIds.length > 0) {
          setFavorites(favIds);
        }
      },
      (error) => {
        console.warn('Favorites snapshot listener:', error);
      }
    );

    return () => unsub();
  }, [user]);

  // Google Sign-in
  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google Sign-in failed:', error);
      alert(`Google Sign-In: ${error.message || 'Please verify popup permissions.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Update nutrition goals
  const updateGoals = async (protein: number, calories: number) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(
        userDocRef,
        {
          dailyProteinGoalGrams: protein,
          dailyCaloriesGoal: calories,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      setProfile((prev) =>
        prev
          ? { ...prev, dailyProteinGoalGrams: protein, dailyCaloriesGoal: calories }
          : null
      );
    } catch (err) {
      console.error('Failed to update goals in Firestore:', err);
    }
  };

  // Update delivery address
  const updateAddress = async (savedAddress: string) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(
        userDocRef,
        {
          savedAddress,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      setProfile((prev) => (prev ? { ...prev, savedAddress } : null));
    } catch (err) {
      console.error('Failed to update address in Firestore:', err);
    }
  };

  // Save order to Firestore
  const saveOrderToFirestore = async (order: LiveOrder) => {
    if (!user) {
      // Local fallback
      setOrders((prev) => [order, ...prev]);
      return;
    }
    try {
      const orderDocRef = doc(db, 'users', user.uid, 'orders', order.id);
      await setDoc(orderDocRef, {
        ...order,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });
      setOrders((prev) => [order, ...prev.filter((o) => o.id !== order.id)]);
    } catch (err) {
      console.error('Failed to persist order to Firestore:', err);
      // Fallback locally
      setOrders((prev) => [order, ...prev]);
    }
  };

  // Toggle favorite dish in Firestore
  const toggleFavoriteInFirestore = async (foodId: string) => {
    const isFav = favorites.includes(foodId);
    // Optimistic update
    setFavorites((prev) =>
      isFav ? prev.filter((id) => id !== foodId) : [...prev, foodId]
    );

    if (!user) return;

    try {
      const favDocRef = doc(db, 'users', user.uid, 'favorites', foodId);
      if (isFav) {
        await deleteDoc(favDocRef);
      } else {
        await setDoc(favDocRef, {
          foodId,
          userId: user.uid,
          savedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('Failed to toggle favorite in Firestore:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isFirebaseConnected,
        signInWithGoogle,
        signOutUser,
        updateGoals,
        updateAddress,
        orders,
        saveOrderToFirestore,
        favorites,
        toggleFavoriteInFirestore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
