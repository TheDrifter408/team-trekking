import { create } from 'zustand';

interface ApiErrorState {
  visible: boolean;
  message: string;
  showError: (message: string) => void;
  hideError: () => void;
}

export const useApiErrorStore = create<ApiErrorState>((set) => ({
  visible: false,
  message: '',
  showError: (message: string) => set({ visible: true, message }),
  hideError: () => set({ visible: false, message: '' }),
}));
