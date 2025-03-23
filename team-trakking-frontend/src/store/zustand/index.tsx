import { create } from 'zustand';

type ThemeType = 'light' | 'dark' | 'forest' | 'sunset';

interface TeamTrakkingState {
  currentTheme: ThemeType;
  currentWorkspace: string;
  setTheme: (theme: ThemeType) => void;
  setWorkspaceName: (name: string) => void;
}

export const useStore = create<TeamTrakkingState>((set) => ({
  currentTheme: (localStorage.getItem('theme') as ThemeType) || 'light',
  currentWorkspace: localStorage.getItem('workspaceName') || '', // Initialize workspace name from localStorage
  setTheme: (theme: ThemeType) => {
    localStorage.setItem('theme', theme);
    set({ currentTheme: theme });
  },
  setWorkspaceName: (name: string) => {
    localStorage.setItem('workspaceName', name); // Set workspace name in localStorage
    set({ currentWorkspace: name });
  },
}));
