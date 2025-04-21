import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TeamTrackingState {
  currentPage: string;
  setCurrentPage: (currentPage: string) => void;
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
