import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils.ts';

interface Props {
  isSelected: boolean;
  onSelect: () => void;
}

export const SelectColumn = ({ isSelected, onSelect }: Props) => {
  return (
    <div
      className={cn(
        'transition-opacity duration-150',
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      )}
    >
      <Checkbox checked={isSelected} onCheckedChange={onSelect} />
    </div>
  );
};
