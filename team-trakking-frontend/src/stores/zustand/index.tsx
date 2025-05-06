import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateUserResponse } from '@/types/props/ApiResponse';

interface TeamTrackingState {
  currentPage: string;
  user: CreateUserResponse | null;
  setCurrentPage: (currentPage: string) => void;
  saveUser: (CreateUserResponse: CreateUserResponse) => void;
  getUser: () => CreateUserResponse | null;
  clearUser: () => void;
  updateUser: (user: CreateUserResponse) => void;
}

export const useTMTStore = create<TeamTrackingState>()(
  persist(
    (set, get) => ({
      currentPage: '',
      user: null,
      setCurrentPage: (page: string) => set({ currentPage: page }),
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
