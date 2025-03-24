import { ArrowUpRight } from 'lucide-react';
import React from 'react';

interface Item {
  id: number;
  name: string;
  [key: string]: any;
}

interface WorkspaceOverviewCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  count: number;
  countLabel: string;
  items: Item[];
  itemLabelKey: string;
  itemValueKey: string;
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
  itemValueKey,
  color,
  viewAllLabel = 'View all',
  onViewAll,
}: WorkspaceOverviewCardProps) => {
  // Create a copy of the icon with the desired className
  const iconWithClass = React.cloneElement(icon, {
    className: `mr-2 h-5 w-5 text-${color}-500`,
  });

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center mb-1">
          {iconWithClass}
          <h3 className="text-lg text-text-primary font-medium">{title}</h3>
        </div>
        <p className="text-sm text-text-light">{description}</p>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl text-text-secondary font-medium">
            {count}
          </span>
          <span className="text-text-light text-sm">{countLabel}</span>
        </div>
        <div className="space-y-3 mt-4">
          {items.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-1 border-b border-gray-100"
            >
              <span className="text-sm text-text-light">
                {item[itemLabelKey]}
              </span>
              <span className="text-xs text-text-muted">
                {item[itemValueKey]}
              </span>
            </div>
          ))}
          {items.length > 5 && (
            <div
              className="text-sm text-blue-500 flex items-center mt-2 cursor-pointer"
              onClick={onViewAll}
            >
              <span>{viewAllLabel}</span>
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
