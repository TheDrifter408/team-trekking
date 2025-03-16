import { create } from 'zustand';

type ThemeType = 'light' | 'dark' | 'forest' | 'sunset';

interface ThemeState {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  workspace?: {
    id: string;
    name: string;
    description: string;
    spaces: [
      id: string,
      name: string,
      folders: [id: string, name: string, list: [id: string, name: string]],
      list: [id: string, name: string],
    ];
  };
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: (localStorage.getItem('theme') as ThemeType) || 'light',
  setTheme: (theme: ThemeType) => {
    localStorage.setItem('theme', theme);
    set({ currentTheme: theme });
  },
}));
