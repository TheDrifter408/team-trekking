import { useRef } from 'react';

export function useDragScroll(isDragging: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const frame = useRef<number | null>(null);
  const lastWalk = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (isDragging) return; // Prevent dragging if isDragging is true
    isDown.current = true;
    ref.current?.classList.add('user-select-none', 'cursor-grabbing');
    startX.current = e.pageX - (ref.current?.offsetLeft || 0);
    scrollLeft.current = ref.current?.scrollLeft || 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) return; // Prevent dragging if isDragging is true
    if (!isDown.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = x - startX.current;

    lastWalk.current = scrollLeft.current - walk;

    if (!frame.current) {
      frame.current = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.scrollLeft = lastWalk.current;
        }
        frame.current = null;
      });
    }
  };

  const onMouseUp = () => {
    if (isDragging) return; // Prevent dragging if isDragging is true
    isDown.current = false;
    ref.current?.classList.remove('user-select-none', 'cursor-grabbing');
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  };

  const onMouseLeave = () => {
    if (isDragging) return; // Prevent dragging if isDragging is true
    isDown.current = false;
    ref.current?.classList.remove('user-select-none', 'cursor-grabbing');
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  };

  return {
    ref,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };
}
