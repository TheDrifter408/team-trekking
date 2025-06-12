import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  refs: RefObject<HTMLElement | null>[],
  callback: () => void
) => {
  // It should NOT be React's Synthetic MouseEvent type as we are directly working with the browser node
  const handleClickOutside = (event: MouseEvent) => {
    // If click is inside any of the refs, do nothing
    let isInsideSomeRef = false;
    if (refs.length > 0) {
      isInsideSomeRef = refs.some((ref) => {
        return ref.current?.contains(event.target as Node);
      });
    }

    if (!isInsideSomeRef) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback]);
};
