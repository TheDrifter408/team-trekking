import { PointerSensor } from '@dnd-kit/core';
import { PointerEvent } from 'react';

export class StrictPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown' as const,
      handler: ({ nativeEvent: event }: PointerEvent): boolean => {
        // Only activate drag if the target is within a draggable area
        const isDraggable =
          (event.target as HTMLElement)?.dataset?.draggable !== undefined;

        // Allow native scroll by not capturing events unnecessarily
        if (!isDraggable) {
          return false;
        }
        return true;
      },
    },
  ];
}
