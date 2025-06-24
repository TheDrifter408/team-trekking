import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserResponse } from '@/types/request-response/auth/ApiResponse.ts';

interface TeamTrackingState {
  user: UserResponse | null;
  saveUser: (UserResponse: UserResponse) => void;
  getUser: () => UserResponse | null;
  clearUser: () => void;
  updateUser: (user: UserResponse) => void;
}

export const useTMTStore = create<TeamTrackingState>()(
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
    }),
    {
      name: 'team-tracking-storage',
    }
  )
);
