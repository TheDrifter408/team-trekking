import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { Icon } from '@/assets/icon-path';
import { cn } from '@/lib/utils.ts';

interface Props {
  isSelected: boolean;
  onSelect: () => void;
}

export const SelectColumn = ({ isSelected, onSelect }: Props) => {
  return (
    <div
      className={cn(
        'transition-opacity duration-150 flex gap-[4px]',
        isSelected ? 'opacity-100' : 'opacity-100 group-hover:opacity-100'
      )}
    >
      <Icon name={'drag'} className="text-content-tertiary" />
      <Checkbox checked={isSelected} onCheckedChange={onSelect} />
    </div>
  );
};
