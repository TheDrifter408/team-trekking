import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Check, ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

interface Props {
  filters: any[];
  toggleFilter: (filter: any) => void;
}

export const TaskActivityFilters = ({ filters, toggleFilter }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-[30px]">
          <ListFilter />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="px-2 py-1.5">
          Filter Activity
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filters.map((filter) => (
          <DropdownMenuItem
            key={filter.id}
            className="px-2 py-1.5 cursor-pointer flex items-center justify-between"
            onClick={() => toggleFilter(filter.id)}
          >
            <span>{filter.label}</span>
            <div
              className={cn(
                'h-4 w-4 border rounded flex items-center justify-center',
                filter.checked ? 'bg-primary border-primary' : 'border-input'
              )}
            >
              {filter.checked && (
                <Check className="h-3 w-3 text-primary-foreground" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-2 py-1.5 justify-center">
          <Button variant="outline" size="sm" className="w-full text-xs">
            Apply Filters
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
