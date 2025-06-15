import React, { useState, useCallback } from 'react';
import { Search, Settings, Check } from 'lucide-react';
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

interface ProgressIconProps {
  progress?: number;
  size?: number;
  color?: string;
  isCompleted?: boolean;
}

interface StatusItem {
  id: string;
  label: string;
  color: string;
  progress: number;
  isCompleted?: boolean;
}

type ColorKey =
  | 'text-blue-600'
  | 'text-green-600'
  | 'text-orange-600'
  | 'text-red-600'
  | 'text-gray-400'
  | 'text-yellow-600';

const ProgressIcon: React.FC<ProgressIconProps> = ({
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
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
        <Check size={12} className="text-white" />
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
  children: React.ReactNode;
}

const TaskStatusDialog: React.FC<TaskStatusUIProps> = ({ children }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('COMPLETED');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const statusItems: StatusItem[] = [
    { id: 'BACKLOG', label: 'BACKLOG', color: 'text-gray-400', progress: 0 },
    {
      id: 'SPRINT_BACKLOG',
      label: 'SPRINT BACKLOG',
      color: 'text-yellow-600',
      progress: 0,
    },
  ];

  const activeItems: StatusItem[] = [
    {
      id: 'STARTING',
      label: LABEL.STARTING,
      color: 'text-orange-600',
      progress: 25,
    },
    {
      id: 'IN_PROGRESS',
      label: LABEL.IN_PROGRESS,
      color: 'text-blue-600',
      progress: 65,
    },
    {
      id: 'COMPLETED',
      label: LABEL.COMPLETED,
      color: 'text-green-600',
      progress: 100,
      isCompleted: true,
    },
    {
      id: 'IN_REVIEW',
      label: LABEL.IN_REVIEW,
      color: 'text-orange-600',
      progress: 85,
    },
    {
      id: LABEL.REJECTED,
      label: 'REJECTED',
      color: 'text-red-600',
      progress: 100,
    },
    {
      id: LABEL.BLOCKED,
      label: 'BLOCKED',
      color: 'text-orange-600',
      progress: 30,
    },
  ];

  const closedItems: StatusItem[] = [
    {
      id: 'CLOSED',
      label: 'CLOSED',
      color: 'text-green-600',
      progress: 100,
      isCompleted: true,
    },
  ];

  const onHandleStatusChange = (statusId: string): void => {
    setSelectedStatus(statusId);
  };

  const onHandleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setSearchQuery(e.target.value);
    },
    []
  );

  const onHandleSearchClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  const filteredItems = (items: StatusItem[]) => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
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
              onChange={onHandleSearchChange}
              onClick={onHandleSearchClick}
              className="pl-9"
            />
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Not Started Section */}
        {filteredItems(statusItems).length > 0 && (
          <>
            <DropdownMenuLabel className="flex items-center justify-between">
              <span className="text-muted-foreground">Not started</span>
              <Settings size={14} className="text-muted-foreground" />
            </DropdownMenuLabel>
            {filteredItems(statusItems).map((item: StatusItem) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => onHandleStatusChange(item.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <ProgressIcon
                    progress={item.progress}
                    size={16}
                    color={item.color}
                    isCompleted={item.isCompleted}
                  />
                  <span className="text-sm">{item.label}</span>
                </div>
                {selectedStatus === item.id && (
                  <Check size={14} className="text-primary" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        )}

        {/* Active Section */}
        {filteredItems(activeItems).length > 0 && (
          <>
            <DropdownMenuLabel className="text-muted-foreground">
              Active
            </DropdownMenuLabel>
            {filteredItems(activeItems).map((item: StatusItem) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => onHandleStatusChange(item.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <ProgressIcon
                    progress={item.progress}
                    size={16}
                    color={item.color}
                    isCompleted={item.isCompleted}
                  />
                  <span className="text-sm">{item.label}</span>
                </div>
                {selectedStatus === item.id && (
                  <Check size={14} className="text-primary" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        )}

        {/* Closed Section */}
        {filteredItems(closedItems).length > 0 && (
          <>
            <DropdownMenuLabel className="text-muted-foreground">
              Closed
            </DropdownMenuLabel>
            {filteredItems(closedItems).map((item: StatusItem) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => onHandleStatusChange(item.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <ProgressIcon
                    progress={item.progress}
                    size={16}
                    color={item.color}
                    isCompleted={item.isCompleted}
                  />
                  <span className="text-sm">{item.label}</span>
                </div>
                {selectedStatus === item.id && (
                  <Check size={14} className="text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}

        {/* No results */}
        {searchQuery &&
          filteredItems([...statusItems, ...activeItems, ...closedItems])
            .length === 0 && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              {LABEL.NO_STATUS_FOUND_MATCHING} "{searchQuery}"
            </div>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskStatusDialog;
