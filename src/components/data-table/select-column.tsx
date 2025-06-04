import { memo } from 'react';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { Icon } from '@/assets/icon-path';
import { cn } from '@/lib/utils.ts';

interface Props {
  isSelected: boolean;
  onSelect: () => void;
  isHovered: boolean;
}

export const SelectColumn = memo(
  ({ isSelected, onSelect, isHovered }: Props) => {
    return (
      <div
        className={cn(
          'flex items-center justify-between !w-[40px] gap-2 h-full',
          'transition-opacity duration-150'
        )}
      >
        {(isHovered || isSelected) && (
          <>
            <Icon
              name={'drag'}
              className="text-content-tertiary cursor-grab hover:cursor-grabbing "
            />
            <Checkbox checked={isSelected} onCheckedChange={onSelect} />
          </>
        )}
      </div>
    );
  }
);
