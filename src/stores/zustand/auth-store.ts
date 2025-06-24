import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isFirstTimeLogin: boolean;
  setIsFirstTimeLogin: (value: boolean) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isFirstTimeLogin: true, // assume it's the first login by default
      setIsFirstTimeLogin: (value) => set({ isFirstTimeLogin: value }),
      resetAuth: () => set({ isFirstTimeLogin: true }),
    }),
    {
      name: 'auth-storage', // key in localStorage
    }
  )
);
