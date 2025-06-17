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
    <div className="flex w-full items-center gap-2">
      <div className="w-1/5 flex items-center gap-2">
        {icon}
        <span className="text-base">{label}</span>
      </div>
      <div className="relative flex w-4/5">
        <div
          className={cn(
            'flex w-full h-8 items-center gap-1 px-1 py-[2px] rounded-lg transition-colors',
            hover ? 'bg-gray-100' : ''
          )}
          onMouseEnter={() => onHoverChange?.(true)}
          onMouseLeave={() => onHoverChange?.(false)}
        >
          {children}

          {/* Cross icon that appears on hover */}
          {hover && (
            <Button
              size={'icon_sm'}
              variant={'ghost'}
              onClick={onHandleRemove}
              className="ml-auto my-0 p-0 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Remove"
            >
              <IconX className="text-gray-500 hover:text-red-500" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
