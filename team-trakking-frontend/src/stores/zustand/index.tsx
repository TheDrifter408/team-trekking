import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TeamTrackingState {
  currentPage: string;
  user: any | null;
  setCurrentPage: (currentPage: string) => void;
  saveUser: (user: any) => void;
  getUser: () => any | null;
  clearUser: () => void;
  updateUser: (user: any) => void;
}

export const useTMTStore = create<TeamTrackingState>()(
  persist(
    (set, get) => ({
      currentPage: '',
      user: null,
      setCurrentPage: (page: string) => set({ currentPage: page }),
      saveUser: (user: any) => set({ user }),
      getUser: () => get().user,
      clearUser: () => set({ user: null }),
      updateUser: (user: any) => {
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
