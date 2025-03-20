import { useEffect } from 'react';
import { useStore } from '@/store/zustand/index';

export function useApplyTheme() {
  const { currentTheme } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);
}
