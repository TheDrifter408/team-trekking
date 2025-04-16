import React from 'react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Item {
  id: number;
  name: string;
  [key: string]: any;
}

interface WorkspaceOverviewCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
  countLabel: string;
  items: Item[];
  itemLabelKey: string;
  color: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
}

export const WorkspaceOverviewCard = ({
  icon,
  title,
  description,
  count,
  countLabel,
  items,
  itemLabelKey,
  color,
  viewAllLabel = 'View all',
  onViewAll,
}: WorkspaceOverviewCardProps) => {
  // Flatten lists data if it's nested (when lists data is passed as arrays of lists)
  const flattenedItems = React.useMemo(() => {
    if (title === 'Task Lists' && Array.isArray(items[0])) {
      return items.flat().slice(0, 5);
    }
    return items.slice(0, 5);
  }, [items, title]);

  return (
    <div className="rounded-lg shadow border border-accent">
      <div className="p-4 border-b border-gray-100 lg:min-h-[80px] md:min-h-[120px]">
        <div className="flex items-center mb-1">
          {React.cloneElement(icon as React.ReactElement, {
            className: `mr-2 h-5 w-5 text-${color}-800`,
          })}
          <h3 className="text-base text-text-default font-medium">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl text-text-default font-medium">
            {count}
          </span>
          <span className="text-text-light text-sm">{countLabel}</span>
        </div>
        <Separator />
        <Label className="py-4 pb-4 block">Recent</Label>
        <Separator />
        <div className="space-y-1 pt-3">
          <TooltipProvider>
            {flattenedItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-1 text-sm"
              >
                <span className="truncate pr-2">
                  {item[itemLabelKey] || item.name}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs font-medium py-0.5 px-1.5 bg-accent rounded-full">
                      {title === 'Spaces'
                        ? item.folderCount + item.listCount
                        : title === 'Folders'
                          ? item.listCount
                          : title === 'Task Lists'
                            ? item.taskNumber
                            : ''}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {title === 'Spaces'
                      ? `${item.folderCount} folders + ${item.listCount} lists`
                      : title === 'Folders'
                        ? `${item.listCount} lists`
                        : title === 'Task Lists'
                          ? `${item.taskNumber} tasks`
                          : ''}
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </TooltipProvider>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-blue-600 hover:text-blue-800 mt-3 font-medium"
          >
            {viewAllLabel}
          </button>
        )}
      </div>
    </div>
  );
};
