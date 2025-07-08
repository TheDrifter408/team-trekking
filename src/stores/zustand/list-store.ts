import { create } from 'zustand';
import { ListTasksResponse } from '@/types/request-response/list/ApiResponse.ts';

interface ListStore {
  list: ListTasksResponse | null;
  setList: (list: ListTasksResponse) => void;
  onClear: () => void;
}

export const useListStore = create<ListStore>()((set) => ({
  list: null,
  setList: (list: ListTasksResponse) => set({ list: list }),
  onClear: () => set({ list: null }),
}));
