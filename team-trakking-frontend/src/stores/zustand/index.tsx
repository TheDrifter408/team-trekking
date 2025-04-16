import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TeamTrackingState {
  currentPage: string;
}

export const useTMTStore = create<TeamTrackingState>()(
  persist(
    (set) => ({
      currentPage: '',

      setCurrentPage: (page: string) => set({ currentPage: page }),
    }),
    {
      name: 'team-tracking-storage',
    }
  )
);
