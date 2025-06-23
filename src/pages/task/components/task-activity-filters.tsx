import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';
import { Check, ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils/utils.ts';
import { TaskActivityFiltersProps } from '@/types/props/Common';
import { LABEL } from '@/lib/constants';

export const TaskActivityFilters = ({
  filters,
  toggleFilter,
  onUnSelectAll,
}: TaskActivityFiltersProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-[30px]">
          <ListFilter />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-4 w-56">
        <DropdownMenuLabel className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{LABEL.ACTIVITIES}</span>
            <Button
              variant={'ghost'}
              className="p-0 text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
              onClick={onUnSelectAll}
            >
              {LABEL.UNSELECT_ALL}
            </Button>
          </div>
        </DropdownMenuLabel>
        {filters.map((filter) => (
          <DropdownMenuItem
            key={filter.id}
            className="px-2 py-1.5 cursor-pointer flex items-center justify-between"
            onClick={(e) => {
              e.preventDefault();
              toggleFilter(filter.id);
            }}
          >
            <div className="flex items-center gap-1">
              <filter.icon />
              <span>{filter.label}</span>
            </div>
            <div
              className={cn(
                'h-4 w-4 rounded flex items-center justify-center',
                filter.checked ? 'visible' : 'invisible'
              )}
            >
              <Check />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
