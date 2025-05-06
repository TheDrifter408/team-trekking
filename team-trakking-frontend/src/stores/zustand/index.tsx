import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateUserResponse } from '@/types/props/ApiResponse';

interface TeamTrackingState {
  user: CreateUserResponse | null;
  saveUser: (CreateUserResponse: CreateUserResponse) => void;
  getUser: () => CreateUserResponse | null;
  clearUser: () => void;
  updateUser: (user: CreateUserResponse) => void;
}

export const useTMTStore = create<TeamTrackingState>()(
  persist(
    (set, get) => ({
      user: null,
      saveUser: (user: CreateUserResponse) => set({ user }),
      getUser: () => get().user,
      clearUser: () => set({ user: null }),
      updateUser: (user: CreateUserResponse) => {
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
