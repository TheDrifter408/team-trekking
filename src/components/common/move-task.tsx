import React, { FC, ReactNode, useState } from 'react';
import { Search, Plus, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/shadcn-ui/input';
import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/shadcn-ui/dropdown-menu';
import { navigationData } from '@/mock/moveTask';

// Type definitions
interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  onClick?: () => void;
}

interface SpaceItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  avatar?: string;
  backgroundColor?: string;
  isExpanded?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
}

interface MoveTaskData {
  personalList: MenuItem;
  recents: MenuItem[];
  spaces: SpaceItem[];
}

interface NavigationDropdownProps {
  data?: MoveTaskData;
  onAddSpace?: () => void;
  onSearch?: (query: string) => void;
  child: ReactNode;
}

const MoveTask: FC<NavigationDropdownProps> = ({
  data = navigationData,
  onAddSpace,
  onSearch,
  child,
}) => {
  const [expandedSpaces, setExpandedSpaces] = useState<Record<string, boolean>>(
    () => {
      const initialState: Record<string, boolean> = {};
      data.spaces.forEach((space) => {
        if (space.isExpanded !== undefined) {
          initialState[space.id] = space.isExpanded;
        }
      });
      return initialState;
    }
  );

  const [searchQuery, setSearchQuery] = useState<string>('');

  const onToggleSpace = (spaceId: string, event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    setExpandedSpaces((prev) => ({
      ...prev,
      [spaceId]: !prev[spaceId],
    }));
  };

  const onHandleSearch = (value: string): void => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const onHandleAddSpace = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    onAddSpace?.();
  };

  const renderMenuItem = (item: MenuItem): JSX.Element => {
    const IconComponent = item.icon;

    return (
      <DropdownMenuItem
        key={item.id}
        className={`flex items-center justify-between p-1 cursor-pointer ${
          item.isActive ? 'bg-blue-50 text-blue-700' : ''
        }`}
        onClick={item.onClick}
      >
        <div className="flex items-center gap-3">
          <IconComponent className="h-4 w-4" />
          <span className={item.isActive ? 'font-medium' : ''}>
            {item.label}
          </span>
        </div>
        {item.isActive && <Check className="h-4 w-4" />}
      </DropdownMenuItem>
    );
  };

  const renderSpaceItem = (space: SpaceItem): JSX.Element => {
    const IconComponent = space.icon;
    const isExpanded = expandedSpaces[space.id] || false;
    const hasChildren = space.children && space.children.length > 0;

    return (
      <div key={space.id} className="space-y-1">
        <DropdownMenuItem
          className={`flex items-center justify-between p-3 cursor-pointer ${
            space.isExpanded ? 'bg-blue-50' : ''
          }`}
          onClick={
            hasChildren ? (e) => onToggleSpace(space.id, e) : space.onClick
          }
        >
          <div className="flex items-center gap-3">
            {space.avatar ? (
              <div
                className={`w-5 h-5 ${space.backgroundColor} rounded-md flex items-center justify-center text-white text-xs font-bold`}
              >
                {space.avatar}
              </div>
            ) : IconComponent ? (
              <IconComponent
                className={`h-4 w-4 ${space.isExpanded ? 'text-blue-600' : ''}`}
              />
            ) : null}
            <span
              className={`font-medium ${space.isExpanded ? 'text-blue-700' : ''}`}
            >
              {space.label}
            </span>
          </div>
          {hasChildren &&
            (isExpanded ? (
              <ChevronDown className="h-4 w-4 text-blue-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-blue-600" />
            ))}
        </DropdownMenuItem>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="ml-6 space-y-1">
            {space.children!.map((child) => renderMenuItem(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Demo Header */}
      {/* Navigation Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{child}</DropdownMenuTrigger>

        <DropdownMenuContent className="w-80 p-0" align="start">
          {/* Header with tabs */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onHandleSearch(e.target.value)}
                className="pl-10 bg-white border-2 border-blue-200 focus:border-blue-400 text-sm"
              />
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <div className="p-2 space-y-1">
              {/* Personal List */}
              <DropdownMenuItem
                className="flex items-center gap-3 p-3 cursor-pointer"
                onClick={data.personalList.onClick}
              >
                <data.personalList.icon className="h-4 w-4" />
                <span className="font-medium">{data.personalList.label}</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Recents Section */}
              <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2">
                Recents
              </DropdownMenuLabel>

              {data.recents.map((item) => renderMenuItem(item))}

              <DropdownMenuSeparator />

              {/* Spaces Section */}
              <div className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide p-0">
                    Spaces
                  </DropdownMenuLabel>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 bg-gray-100 hover:bg-gray-100"
                    onClick={onHandleAddSpace}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Render all spaces */}
              {data.spaces.map((space) => renderSpaceItem(space))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MoveTask;
