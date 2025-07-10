import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserResponse } from '@/types/request-response/auth/ApiResponse.ts';

interface AuthState {
  user: UserResponse | null;
  saveUser: (UserResponse: UserResponse) => void;
  getUser: () => UserResponse | null;
  clearUser: () => void;
  updateUser: (user: UserResponse) => void;
  isFirstTimeLogin: boolean;
  setIsFirstTimeLogin: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      saveUser: (user: UserResponse) => set({ user }),
      getUser: () => get().user,
      clearUser: () => set({ user: null }),
      updateUser: (user: UserResponse) => {
        const previous = get().user;
        set({
          user: {
            ...previous,
            ...user,
          },
        });
      },
      isFirstTimeLogin: true, // assume it's the first login by default
      setIsFirstTimeLogin: (value) => set({ isFirstTimeLogin: value }),
    }),
    {
      name: 'auth-storage', // key in localStorage
    }
  )
);
