import { useEffect } from 'react';
import { useStore } from '@/store/zustand/index';

export const useApplyTheme = () => {
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);
};
