import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = (
  refs: RefObject<HTMLElement | null>[],
  callback: () => void
) => {
  const callbackRef = useRef(callback);

  // Always keep latest callback reference
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isInsideSomeRef = refs.some((ref) =>
        ref.current?.contains(event.target as Node)
      );

      if (!isInsideSomeRef) {
        callbackRef.current(); // always up-to-date
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs]);
};
