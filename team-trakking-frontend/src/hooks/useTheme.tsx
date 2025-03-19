import { useEffect } from 'react';
import { useThemeStore } from '@/store/zustand/index';

export function useApplyTheme() {
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);
}
