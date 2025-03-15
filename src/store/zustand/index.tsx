import { create } from 'zustand';

type ThemeType = 'light' | 'dark' | 'forest' | 'sunset';

interface ThemeState {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: (localStorage.getItem('theme') as ThemeType) || 'light',
  setTheme: (theme: ThemeType) => {
    localStorage.setItem('theme', theme);
    set({ currentTheme: theme });
  },
}));
