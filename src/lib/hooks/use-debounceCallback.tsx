import { useRef } from 'react';

interface DebouncedCallback<T extends (...args: any[]) => void> {
  (...args: Parameters<T>): void;
}
export const useDebounceCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): DebouncedCallback<T> => {
  const timer = useRef<number | null>(null);
  return (...args: Parameters<T>): void => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => {
      callback(...args);
      timer.current = null;
    }, delay);
  };
};
