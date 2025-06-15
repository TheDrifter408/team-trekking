import { PointerSensor } from '@dnd-kit/core';
import { PointerEvent } from 'react';

export class StrictPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown' as const,
      handler: ({ nativeEvent: event }: PointerEvent): boolean => {
        const target = event.target as HTMLElement;
        const isExcluded = target.closest('button, input, textarea [data-draggable]') !== null;
        return !isExcluded;
      },
    },
  ];
}
