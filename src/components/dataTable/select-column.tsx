import { memo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/assets/icon-path';
import { cn } from '@/lib/utils.ts';

interface Props {
  isSelected: boolean;
  onSelect: () => void;
}

export const SelectColumn = memo(({ isSelected, onSelect }: Props) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between !w-[40px] gap-2 h-full',
        'transition-opacity duration-150',
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      )}
    >
      <Icon
        name={'drag'}
        className="text-content-tertiary cursor-grab hover:cursor-grabbing "
      />
      <Checkbox checked={isSelected} onCheckedChange={onSelect} />
    </div>
  );
});
