import React from 'react';
import { cn } from '@/lib/utils/utils.ts';
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
    <div className="w-full flex md:w-full lg:w-2/3 items-center gap-2">
      <div className="w-1/2 flex items-center justify-between">
        <span className="text-base flex items-center gap-2 flex-nowrap text-nowrap">
          {icon}
          {label}
        </span>
      </div>
      <div className="w-1/2 relative flex">
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
              'ml-auto my-0 p-0 rounded-lg hover:bg-gray-200 transition-colors invisible',
              hover && onRemove ? 'visible' : 'invisible'
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
