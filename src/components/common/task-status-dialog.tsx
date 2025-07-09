import {
  useState,
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { Search, Settings, Check, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Input } from '@/components/shadcn-ui/input';
import { LABEL } from '@/lib/constants';
import { cn, filterByItemNames } from '@/lib/utils/utils.ts';
import {
  StatusGroup,
  StatusItem,
} from '@/types/request-response/list/ApiResponse';
import { Button } from '../shadcn-ui/button';
import { useGetListTagsQuery } from '@/service/rtkQueries/listQuery';
import { useDebounce } from '@/lib/hooks/use-debounce';

interface ProgressIconProps {
  progress?: number;
  size?: number;
  color?: string;
  isCompleted?: boolean;
}

type ColorKey =
  | 'text-blue-600'
  | 'text-green-600'
  | 'text-orange-600'
  | 'text-red-600'
  | 'text-gray-400'
  | 'text-yellow-600';

const ProgressIcon: FC<ProgressIconProps> = ({
  progress = 0,
  size = 20,
  color = 'text-blue-600',
  isCompleted = false,
}) => {
  const outerRadius = (size - 3) / 2;
  const innerRadius = outerRadius - 3;
  const innerCircumference = 2 * Math.PI * innerRadius;
  const innerStrokeDasharray = innerCircumference;
  const innerStrokeDashoffset =
    innerCircumference - (progress / 100) * innerCircumference;

  const colorMap: Record<ColorKey, string> = {
    'text-blue-600': '#3b82f6',
    'text-green-600': '#10b981',
    'text-orange-600': '#f97316',
    'text-red-600': '#ef4444',
    'text-gray-400': '#9ca3af',
    'text-yellow-600': '#eab308',
  };

  const strokeColor = colorMap[color as ColorKey] || '#3b82f6';

  if (isCompleted) {
    return (
      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
        <Check size={10} className="text-white" />
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={outerRadius}
          stroke={strokeColor}
          strokeWidth="2"
          fill="transparent"
        />
        {progress > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={innerRadius}
            stroke={strokeColor}
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={innerStrokeDasharray}
            strokeDashoffset={innerStrokeDashoffset}
            strokeLinecap="round"
            strokeOpacity="0.4"
            className="transition-all duration-300 ease-in-out"
          />
        )}
      </svg>
    </div>
  );
};

interface TaskStatusUIProps {
  listId?: number;
  status: StatusItem | null;
  setStatus: (status: StatusItem) => void;
}

const TaskStatusDialog: FC<TaskStatusUIProps> = ({
  listId,
  status,
  setStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusGroups, setStatusGroups] = useState<StatusGroup[]>([]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  const debouncedQuery = useDebounce(searchQuery, 500);

  const filtered = filterByItemNames(statusGroups, debouncedQuery);

  const onStatusChange = (groupId: number, statusId: number) => {
    let group: StatusGroup | undefined;
    if (list) {
      group = list.groups.find((group) => group.id === groupId);
      if (group) {
        const found = group.items.find((s) => s.id === statusId);
        if (found) {
          setStatus(found);
        }
      }
    }
  };

  const { data: list } = useGetListTagsQuery(listId!, {
    skip: !listId,
  });

  useEffect(() => {
    if (list) {
      setStatusGroups(list.groups);
    }
  }, [list]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'rounded text-white px-2 h-6 text-sm tracking-wide font-bold',
            'focus:outline-none ring-0 focus:ring-0 focus-within:outline-none focus-within:ring-0'
          )}
          style={{
            backgroundColor:
              status && status.color !== null ? `${status.color}` : '#3a79e6',
          }}
        >
          {status && status.name.toUpperCase()}
          <span className="ml-2 pl-2 border-l border-white/40 flex items-center">
            <ChevronRight className="w-4 h-4" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start">
        <div className="p-2">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder={LABEL.SEARCH_STATUSES}
              value={searchQuery}
              onChange={onSearchChange}
              className="pl-9"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        <DropdownMenuSeparator />
        {filtered.map((group) => (
          <div key={group.id}>
            <DropdownMenuLabel className="flex items-center justify-between">
              <span className="text-muted-foreground">{group.name}</span>
              <Settings size={14} className="text-muted-foreground" />
            </DropdownMenuLabel>
            {group.items.map((item: StatusItem) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => onStatusChange(group.id, item.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <ProgressIcon
                    progress={item.order}
                    size={16}
                    color={item.color}
                    isCompleted={false}
                  />
                  <span
                    className={cn(
                      'text-sm',
                      status?.id === item.id && 'font-bold'
                    )}
                  >
                    {item.name}
                  </span>
                </div>
                {status && status.id === item.id && (
                  <Check size={14} className="text-primary" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskStatusDialog;
