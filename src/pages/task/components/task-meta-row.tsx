import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn-ui/button';
import { IconX } from '@tabler/icons-react';

interface TaskMetaRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  hover?: boolean;
  onHoverChange?: (hover: boolean) => void;
  onRemove?: () => void; // Add a callback for remove action
}

export const TaskMetaRow = ({
  icon,
  label,
  children,
  hover,
  onHoverChange,
  onRemove,
}: TaskMetaRowProps) => {
  const onHandleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };
  return (
    <div className="flex md:w-full lg:w-4/5 items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="text-base flex items-center gap-2 flex-nowrap text-nowrap">{icon}{label}</span>
      </div>
      <div className="relative flex w-4/5">
        <div
          className={cn(
            'flex min-w-full h-8 items-center flex-nowrap gap-1 px-1 py-[2px] rounded-lg transition-colors',
            hover ? 'bg-gray-100' : ''
          )}
          onMouseEnter={() => onHoverChange?.(true)}
          onMouseLeave={() => onHoverChange?.(false)}
        >
          {children}

          {/* Cross icon that appears on hover */}
          <Button
              size={'icon_sm'}
              variant={'ghost'}
              onClick={onHandleRemove}
              className={cn(
                "ml-auto my-0 p-0 rounded-lg hover:bg-gray-200 transition-colors invisible",
                hover ? 'visible' : 'invisible'
              )}
              aria-label="Remove"
            >
              <IconX className="text-gray-500 hover:text-red-500" />
            </Button>
        </div>
      </div>
    </div>
  );
};
