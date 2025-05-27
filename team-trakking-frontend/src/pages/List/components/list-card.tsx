import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input';
import { Icon } from '@/assets/icon-path';

interface ListCardProps {
  filterValue: string;
  onFilterChange: (value: string) => void;
}

export const ListCard = ({ filterValue, onFilterChange }: ListCardProps) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-base">Tasks</span>
          <span className="text-muted-foreground text-sm">20</span>
          <Button size={'icon_sm'} variant={'ghost'} className={''}>
            <Icon name={'add02'} />
          </Button>
        </div>
        <div className="mb-4">
          <Input
            placeholder="Filter Names..."
            value={filterValue}
            onChange={(event) => onFilterChange(event.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
